/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from 'react';
import type { CameraProps } from '../types';
import ReadyToTakeSelfieScreen from './ReadyToTakeSelfieScreen';
// import html2canvas from 'html2canvas';
import DownloadImageScreen from './DownloadImageScreen';
import CameraIcon from '../assets/svg/image_capture_icon.svg';


export function Camera({ selectedAvatars, onCapture, onBack }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const leftImageRef = useRef<HTMLImageElement>(null);
  const rightImageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [leftImageLoaded, setLeftImageLoaded] = useState(false);
  const [rightImageLoaded, setRightImageLoaded] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isReadyScreenVisible, setIsReadyScreenVisible] = useState(true);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isCameraVideoShow, setIsCameraVideoShow] = useState(false);

  // Extract left and right avatars
  const leftAvatar = selectedAvatars.find((avatar) => avatar.left_image);
  const rightAvatar = selectedAvatars.find((avatar) => avatar.right_image);

  const checkPermission = async () => {
    try {
      const permission = await navigator.permissions.query({ name: 'camera' });

      console.log('Initial Permission:', permission.state);

      if (permission.state === 'granted') {
        startCamera();
      } else {
        requestCameraPermission();
      }

      permission.onchange = async () => {
        console.log('Permission Changed:', permission.state);
        if (permission.state === 'granted') {
          startCamera();
        }
      };
    } catch (error) {
      console.error('Error checking permission:', error);
    }
  };

  const requestCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' },
        audio: false
      });
      startCamera();
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  };

  const startCamera = async () => {

    setIsReadyScreenVisible(false);

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' },
      audio: false,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      setIsCameraVideoShow(true);
    }
  };

  useEffect(() => {
    if (!capturedImage && isAnimationComplete) {
      checkPermission();
    }
  }, [capturedImage, isAnimationComplete]);

  useEffect(() => {
    if (
      (!leftAvatar && !rightAvatar) ||
      (leftAvatar && leftImageLoaded) ||
      (rightAvatar && rightImageLoaded)
    ) {
      if (isCameraVideoShow) {
        setIsImageLoading(false);
      }
    }
  }, [leftImageLoaded, rightImageLoaded, leftAvatar, rightAvatar, isCameraVideoShow]);

  const capturePhoto = async () => {
    try {
      if (!videoRef.current || !canvasRef.current) return;
      setIsLoading(true);
      videoRef.current.pause();

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (!context) return;

      // Get video dimensions
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Get the visible area of the video
      const containerRect = video.getBoundingClientRect();
      const containerAspectRatio = containerRect.width / containerRect.height;
      const videoAspectRatio = videoWidth / videoHeight;

      let cropWidth, cropHeight, cropX, cropY;

      if (videoAspectRatio > containerAspectRatio) {
        // Video is wider than the container → crop the sides
        cropHeight = videoHeight;
        cropWidth = cropHeight * containerAspectRatio;
        cropX = (videoWidth - cropWidth) / 2;
        cropY = 0;
      } else {
        // Video is taller than the container → crop the top and bottom
        cropWidth = videoWidth;
        cropHeight = cropWidth / containerAspectRatio;
        cropX = 0;
        cropY = (videoHeight - cropHeight) / 2;
      }

      // Set canvas dimensions to match the visible video area
      canvas.width = containerRect.width;
      canvas.height = containerRect.height;

      // Mirror the video before drawing it on the canvas
      context.save();
      context.scale(-1, 1); // Flip horizontally
      context.drawImage(
        video,
        cropX, cropY, cropWidth, cropHeight, // Crop the source
        -canvas.width, 0, canvas.width, canvas.height // Mirror on canvas
      );
      context.restore(); // Restore default transformation

      // Helper function to load an image
      const loadImage = (src: string | null): Promise<HTMLImageElement | null> => {
        return new Promise((resolve) => {
          if (!src) return resolve(null);
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => resolve(img);
          img.src = src;
        });
      };

      const [leftImage, rightImage] = await Promise.all([
        loadImage(leftAvatar?.left_image ?? null),
        loadImage(rightAvatar?.right_image ?? null),
      ]);

      // Draw left avatar accurately
      if (leftImage && leftImageRef.current) {
        // Get dimensions of left image
        const leftImageReference = leftImageRef.current;
        const leftImageWidth = leftImageReference.clientWidth;
        const leftImageHeight = leftImageReference.clientHeight;

        // Calculate positions of bottom-left
        const cutoutY = canvas.height - leftImageHeight; // Bottom position
        const leftX = 0; // Small margin from left

        // Draw cutouts at the bottom left 
        context.drawImage(leftImage, leftX, cutoutY, leftImageWidth, leftImageHeight);
      }

      // Draw right avatar accurately
      if (rightImage && rightImageRef.current) {
        // Get dimensions of right image
        const rightImageReference = rightImageRef.current;
        const rightImageWidth = rightImageReference.clientWidth;
        const rightImageHeight = rightImageReference.clientHeight;

        // Calculate positions of bottom-right
        const cutoutY = canvas.height - rightImageHeight; // Bottom position
        const rightX = canvas.width - rightImageWidth - 0; // Small margin from right

        // Draw cutouts at the bottom right
        context.drawImage(rightImage, rightX, cutoutY, rightImageWidth, rightImageHeight);
      }

      // Save final image
      const finalImage = canvas.toDataURL("image/jpeg");
      setCapturedImage(finalImage);
      onCapture(finalImage);
      stopCamera();
    } catch (error) {
      console.error("Error processing avatars:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const retake = () => {
    setCapturedImage(null);
  };

  // Function to stop the camera
  const stopCamera = () => {
    const stream = videoRef?.current?.srcObject as MediaStream;
    if (stream) {
      stream?.getTracks().forEach(track => track.stop());
      setIsCameraVideoShow(false);
    }
  };

  // Handle Ready to take selfie animation complete
  const handleAnimationComplete = () => {
    setIsAnimationComplete(true);
  };

  return (<>
    <div className="h-full w-full bg-black flex flex-col">
      {isReadyScreenVisible ? (
        <ReadyToTakeSelfieScreen onAnimationComplete={handleAnimationComplete} />
      ) : (<>
        {!capturedImage ? (<>
          <div className={`selfie-background flex-1 relative ${capturedImage ? "" : "overflow-hidden"}`} >
            <div
              className="flex items-center justify-center h-full"
              style={{ display: isImageLoading ? "flex" : "none" }}
            >
              <div
                className="flex flex-col items-center gap-1.5"
                role="status"
              >
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="text-white">Loading...</span>
              </div>
            </div>

            <div className='h-full flex flex-col justify-center items-center'>
              <div className='relative' style={{ display: isImageLoading ? "none" : "unset" }}>
                <video
                  className='camara-video-frame'
                  ref={videoRef}
                  autoPlay
                  playsInline
                />

                {leftAvatar && (
                  <img
                    ref={leftImageRef}
                    src={leftAvatar.left_image}
                    onLoad={() => setLeftImageLoaded(true)}
                    style={{
                      position: "absolute",
                      bottom: "5px",
                      left: "5px",
                    }}
                    className='player-imgs'
                  />
                )}

                {rightAvatar && (
                  <img
                    ref={rightImageRef}
                    src={rightAvatar.right_image}
                    onLoad={() => setRightImageLoaded(true)}
                    style={{
                      position: "absolute",
                      bottom: "5px",
                      right: "5px",
                    }}
                    className='player-imgs'
                  />
                )}
              </div>
            </div>

            <button
              onClick={capturePhoto}
              disabled={isLoading}
              className={`absolute bottom-4 left-1/2 -translate-x-1/2 bg-transparent transition-all transform hover:scale-105 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className='h-20 w-20'>
                <img
                  src={CameraIcon}
                  alt="camera-button"
                  className='h-full w-full object-contain'
                  loading="lazy"
                />
              </div>
            </button>

          </div>
        </>) : (<>
          <DownloadImageScreen
            retake={retake}
            capturedImage={capturedImage}
            onBack={onBack}
          />
        </>)}
      </>)}
    </div>
    <canvas ref={canvasRef} className="hidden" />
  </>);
}