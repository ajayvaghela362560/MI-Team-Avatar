import React, { useRef, useEffect } from 'react';
import { Camera as CameraIcon, ArrowLeft, Download } from 'lucide-react';
import { saveAs } from 'file-saver';
import type { CameraProps } from '../types';

export function Camera({ selectedAvatars, onCapture, onBack }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImage, setCapturedImage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // Extract left and right avatars
  const leftAvatar = selectedAvatars.find((avatar) => avatar.left_image);
  const rightAvatar = selectedAvatars.find((avatar) => avatar.right_image);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    };

    if (!capturedImage) {
      startCamera();
    }

    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [capturedImage]);

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsLoading(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame (mirrored)
    context.save();
    context.scale(-1, 1);
    context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
    context.restore();

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

    const processAvatars = async () => {
      try {
        const [leftImage, rightImage] = await Promise.all([
          loadImage(leftAvatar?.left_image_last_frame ?? null),
          loadImage(rightAvatar?.right_image_last_frame ?? null),
        ]);
    
        const avatarHeight = canvas.height * 0.6;
        const avatarWidth = avatarHeight * 0.8;
    
        console.log("Left Image:", leftImage);
        console.log("Right Image:", rightImage);
    
        if (leftImage) {
          context.save();
          context.translate(avatarHeight, 0);
          context.rotate(90 * Math.PI / 180);
          context.drawImage(leftImage, 0, 0, avatarWidth, avatarHeight);
          context.restore();
        }
    
        if (rightImage) {
          context.save();
          // Move to the bottom-left corner
          context.translate(avatarWidth, canvas.height);
          // Rotate -90 degrees
          context.rotate(-90 * Math.PI / 180);
          // Draw the image at (0, -avatarHeight) so it aligns correctly
          context.drawImage(rightImage, 0, -avatarHeight, avatarWidth, avatarHeight);
          context.restore();
        } 
    
        // Save the final image
        const finalImage = canvas.toDataURL("image/jpeg");
        setCapturedImage(finalImage);
        onCapture(finalImage);
      } catch (error) {
        console.error("Error processing avatars:", error);
      } finally {
        setIsLoading(false);
      }
    };

    processAvatars();
  };

  const savePhoto = () => {
    if (!canvasRef.current) return;

    canvasRef.current.toBlob(blob => {
      if (blob) {
        saveAs(blob, 'selfie-with-avatars.jpg');
      }
    }, 'image/jpeg', 0.95);
  };

  const retake = () => {
    setCapturedImage(null);
  };

  return (
    <div className="min-h-screen max-h-[80dvh] bg-black flex flex-col">
      <div className="p-4 flex justify-between items-center">
        <button
          onClick={onBack}
          className="text-white flex items-center gap-2 hover:text-gray-300 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
          Back
        </button>
        {capturedImage && (
          <button
            onClick={savePhoto}
            className="bg-white text-gray-900 px-4 py-2 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Download className="w-5 h-5" />
            {`Save Photo`}
          </button>
        )}
      </div>

      <div className="flex-1 relative overflow-hidden">
        {!capturedImage ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover min-h-[93vh]"
            />

            {/* Avatar previews */}
            {leftAvatar && (
              <div
                className="animate-image"
                style={{
                  position: "absolute",
                  top: "-120px",
                  left: "-170px",
                  background: `url(${leftAvatar.left_image}) left center`,
                  transform: `rotate(90deg)`
                }}
              />
            )}

            {rightAvatar && (
              <div
                className="animate-image"
                style={{
                  position: "absolute",
                  bottom: "-170px",
                  left: "-170px",
                  background: `url(${rightAvatar.right_image}) left center`,
                  transform: `rotate(90deg)`
                }}
              />
            )}

            <button
              onClick={capturePhoto}
              disabled={isLoading}
              className={`absolute bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-full p-6 shadow-lg transition-all transform hover:scale-105 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}`}
            >
              <CameraIcon className="w-8 h-8" />
            </button>
          </>
        ) : (
          <>
            <img
              src={capturedImage}
              alt="Captured selfie"
              className="w-full h-full object-cover min-h-[91vh]"
            />
            <button
              onClick={retake}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-colors transform hover:scale-105"
            >
              Retake Photo
            </button>
          </>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}