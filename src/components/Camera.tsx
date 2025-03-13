/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect } from 'react';
import { Camera as CameraIcon, ArrowLeft, Download } from 'lucide-react';
import { saveAs } from 'file-saver';
import type { CameraProps } from '../types';

export function Camera({ selectedAvatars, onCapture, onBack }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedImage, setCapturedImage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

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
    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame (mirrored)
    context.save();
    context.scale(-1, 1);
    context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height);
    context.restore();

    // Load and draw avatar images
    const loadImages = selectedAvatars.map((avatar) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.src = avatar.image;
      });
    });

    Promise.all(loadImages).then((images) => {
      images.forEach((img: any, index) => {
        const size = canvas.height * 0.2; // Slightly smaller avatars
        const spacing = size * 0.2;
        
        // Position avatars at bottom corners
        const y = canvas.height - size - spacing;
        const x = index === 0 
          ? spacing // Left corner
          : canvas.width - size - spacing; // Right corner
        
        // Draw circular avatar
        context.save();
        context.beginPath();
        context.arc(x + size/2, y + size/2, size/2, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();
        
        context.drawImage(img, x, y, size, size);
        
        // Draw avatar border
        context.strokeStyle = 'white';
        context.lineWidth = 4;
        context.stroke();
        
        context.restore();
      });

      setCapturedImage(canvas.toDataURL('image/jpeg'));
      setIsLoading(false);
    });
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
    <div className="min-h-screen bg-black flex flex-col">
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
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Download className="w-5 h-5" />
            Save Photo
          </button>
        )}
      </div>

      <div className="flex-1 relative">
        {!capturedImage ? (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            {/* Avatar previews */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between p-4 pointer-events-none">
              {selectedAvatars.map((avatar, index) => (
                <div
                  key={avatar.id}
                  className={`w-20 h-20 rounded-full overflow-hidden border-2 border-white shadow-lg ${
                    index === 0 ? 'ml-4' : 'mr-4'
                  }`}
                >
                  <img
                    src={avatar.image}
                    alt={avatar.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={capturePhoto}
              disabled={isLoading}
              className={`absolute bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-full p-6 shadow-lg transition-all transform hover:scale-105 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'
              }`}
            >
              <CameraIcon className="w-8 h-8" />
            </button>
          </>
        ) : (
          <>
            <img
              src={capturedImage}
              alt="Captured selfie"
              className="w-full h-full object-contain"
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