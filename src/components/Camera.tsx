/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from 'react';
import { saveAs } from 'file-saver';
import type { CameraProps } from '../types';
import ReadyToTakeSelfieScreen from './ReadyToTakeSelfieScreen';
import html2canvas from 'html2canvas';
import DownloadImageScreen from './DownloadImageScreen';

export function Camera({ selectedAvatars, onCapture, onBack }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const cameraFrameRef = useRef<HTMLDivElement>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [leftImageLoaded, setLeftImageLoaded] = useState(false);
  const [rightImageLoaded, setRightImageLoaded] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isReadyScreenVisible, setIsReadyScreenVisible] = useState(true);

  // Extract left and right avatars
  const leftAvatar = selectedAvatars.find((avatar) => avatar.left_image);
  const rightAvatar = selectedAvatars.find((avatar) => avatar.right_image);

  const checkPermission = async () => {
    try {
      const permission = await navigator.permissions.query({ name: 'camera' });

      console.log('Initial Permission:', permission.state);

      if (permission.state === 'granted') {
        startCamera();
      }

      permission.onchange = () => {
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
      await navigator.mediaDevices.getUserMedia({ video: true });
      startCamera();
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  };

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'user' },
      audio: false,
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    setIsReadyScreenVisible(false);
  };

  useEffect(() => {
    if (!capturedImage) {
      checkPermission();
    }

    return () => {
      const stream = videoRef?.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [capturedImage]);

  useEffect(() => {
    if (
      (!leftAvatar && !rightAvatar) ||
      (leftAvatar && leftImageLoaded) ||
      (rightAvatar && rightImageLoaded)
    ) {
      setIsImageLoading(false);
    }
  }, [leftImageLoaded, rightImageLoaded, leftAvatar, rightAvatar]);

  // const capturePhoto = () => {
  //   if (!videoRef.current || !canvasRef.current) return;
  //   setIsLoading(true);

  //   const video = videoRef.current;
  //   const canvas = canvasRef.current;
  //   const context = canvas.getContext("2d");
  //   if (!context) return;

  //   // Set canvas dimensions to match video
  //   canvas.width = video.videoWidth;
  //   canvas.height = video.videoHeight;

  //   // Draw video frame (mirrored)
  //   context.save();
  //   context.scale(-1, 1);
  //   context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
  //   context.restore();

  //   // // Helper function to load an image
  //   // const loadImage = (src: string | null): Promise<HTMLImageElement | null> => {
  //   //   return new Promise((resolve) => {
  //   //     if (!src) return resolve(null);
  //   //     const img = new Image();
  //   //     img.crossOrigin = "anonymous";
  //   //     img.onload = () => resolve(img);
  //   //     img.src = src;
  //   //   });
  //   // };

  //   // const processAvatars = async () => {
  //   //   try {
  //   //     const [leftImage, rightImage] = await Promise.all([
  //   //       loadImage(leftAvatar?.left_image ?? null),
  //   //       loadImage(rightAvatar?.right_image ?? null),
  //   //     ]);

  //   //     const avatarHeight = canvas.height * 0.8;
  //   //     const avatarWidth = avatarHeight * 1;

  //   //     if (leftImage) {
  //   //       context.save();
  //   //       // context.translate((avatarHeight - 120), -120);
  //   //       // context.rotate(90 * Math.PI / 180);
  //   //       context.drawImage(leftImage, 0, 0, avatarWidth, avatarHeight);
  //   //       context.restore();
  //   //     }

  //   //     if (rightImage) {
  //   //       context.save();
  //   //       // context.translate((avatarHeight - 120), 120);
  //   //       // context.rotate(90 * Math.PI / 180);
  //   //       // context.drawImage(rightImage, (canvas.height - avatarWidth), 0, avatarWidth, avatarHeight);
  //   //       context.drawImage(rightImage, 0, 0, avatarWidth, avatarHeight);
  //   //       context.restore();
  //   //     }

  //   //     // Save the final image
  //   //     const finalImage = canvas.toDataURL("image/jpeg");
  //   //     setCapturedImage(finalImage);
  //   //     onCapture(finalImage);
  //   //   } catch (error) {
  //   //     console.error("Error processing avatars:", error);
  //   //   } finally {
  //   //     setIsLoading(false);
  //   //   }
  //   // };

  //   // processAvatars();


  //   // Helper function to load an image
  //   const loadImage = (src: string | null): Promise<HTMLImageElement | null> => {
  //     return new Promise((resolve) => {
  //       if (!src) return resolve(null);
  //       const img = new Image();
  //       img.crossOrigin = "anonymous";
  //       img.onload = () => resolve(img);
  //       img.src = src;
  //     });
  //   };
  //   const processAvatars = async () => {
  //     try {
  //       const [leftImage, rightImage] = await Promise.all([
  //         loadImage(leftAvatar?.left_image ?? null),
  //         loadImage(rightAvatar?.right_image ?? null),
  //       ]);

  //       const avatarHeight = canvas.height * 0.7;
  //       const avatarWidth = avatarHeight * 1;

  //       if (leftImage) {
  //         context.save();
  //         // Positioning at bottom-left corner
  //         context.drawImage(leftImage, 0, canvas.height - avatarHeight, avatarWidth, avatarHeight);
  //         context.restore();
  //       }

  //       if (rightImage) {
  //         context.save();
  //         // Positioning at bottom-right corner
  //         context.drawImage(rightImage, canvas.width - avatarWidth, canvas.height - avatarHeight, avatarWidth, avatarHeight);
  //         context.restore();
  //       }

  //       // Save the final image
  //       const finalImage = canvas.toDataURL("image/jpeg");
  //       setCapturedImage(finalImage);
  //       onCapture(finalImage);
  //     } catch (error) {
  //       console.error("Error processing avatars:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   processAvatars();

  // };

  const capturePhoto = async () => {
    setIsLoading(true);
    try {
      if (!cameraFrameRef.current) {
        throw new Error("Camera frame reference is not available.");
      }

      // Generate an image from the div with a transparent background
      const canvas = await html2canvas(cameraFrameRef.current, {
        backgroundColor: null, // Transparent background
        scale: 2, // Higher resolution
      });

      // Save the final image
      const finalImage = canvas.toDataURL("image/jpeg");
      setCapturedImage(finalImage);
      onCapture(finalImage);
    } catch (error) {
      console.error("Error capturing photo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const savePhoto = async () => {
    if (!imageRef.current || !canvasRef.current) return;

    // Generate an image from the div with transparent background
    const canvas = await html2canvas(imageRef.current, {
      backgroundColor: null, // Transparent background
      scale: 2, // Higher resolution
    });
    const dataUrl = canvas.toDataURL("image/png");

    // Convert dataURL to Blob
    const blob = await (await fetch(dataUrl)).blob();

    if (blob) {
      saveAs(blob, 'selfie-with-avatars.jpg');
    }
  };

  const retake = () => {
    setCapturedImage(null);
  };

  return (
    <div className="min-h-screen max-h-[100dvh] bg-black flex flex-col">
      {isReadyScreenVisible ? (
        <ReadyToTakeSelfieScreen
          requestCameraPermission={requestCameraPermission}
        />
      ) : (<>
        <div className={`flex-1 relative ${capturedImage ? "" : "overflow-hidden"}`}>
          {!capturedImage ? (<>
            <div
              className="flex items-center justify-center min-h-screen"
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

            <div style={{ display: isImageLoading ? "none" : "unset" }}>
              <div ref={cameraFrameRef} >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    minHeight: "100vh",
                    transform: "scaleX(-1)",
                  }}
                />

                {leftAvatar && (
                  <img
                    src={leftAvatar.left_image}
                    onLoad={() => setLeftImageLoaded(true)}
                    style={{
                      position: "absolute",
                      bottom: "0px",
                      // left: "-135px",
                      left: "-70px",
                    }}
                  />
                )}

                {rightAvatar && (
                  <img
                    src={rightAvatar.right_image}
                    onLoad={() => setRightImageLoaded(true)}
                    style={{
                      position: "absolute",
                      bottom: "0px",
                      // right: "-135px",
                      right: "-70px",
                    }}
                  />
                )}
              </div>
              <button
                onClick={capturePhoto}
                disabled={isLoading}
                className={`absolute bottom-8 rotate-90 left-1/2 -translate-x-1/2 bg-white rounded-full p-1 transition-all transform hover:scale-105 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="80"
                  height="80"
                  viewBox="0 0 82 82"
                  fill="none"
                >
                  <circle
                    cx="41"
                    cy="41"
                    r="37.5"
                    fill="#DFDFDF"
                    stroke="white"
                    strokeWidth={7}
                  />
                </svg>
              </button>
            </div>

          </>) : (<>
            <DownloadImageScreen
              retake={retake}
              capturedImage={capturedImage}
              savePhoto={savePhoto}
              onBack={onBack}
            />
          </>)}
        </div>
        <canvas ref={canvasRef} className="hidden" />
      </>)}
    </div>
  );
}