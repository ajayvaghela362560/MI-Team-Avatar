import { ChevronLeft } from "lucide-react";
import CaptureImageFrame from "../assets/svg/captureImageFrame";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { saveAs } from "file-saver";
import Capture_Frame_Background_Image from "../assets/final_image_frame.png";

interface PropsTypes {
    retake: () => void;
    onBack: () => void;
    capturedImage: string;
}

const DownloadImageScreen = ({ retake, capturedImage, onBack }: PropsTypes) => {

    const { current: currentScreenHeight } = useRef<number>(window?.innerHeight);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [showButton, setShowButton] = useState(false);
    const [isProcessingImage, setIsProcessingImage] = useState(false);

    const handleAnimationComplete = () => {
        setShowButton(true);
    };

    const savePhoto = async () => {
        try {
            setIsProcessingImage(true);

            // Draw the final image using canvas
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Load background image
            const bgImg = new Image();
            bgImg.src = Capture_Frame_Background_Image;
            await new Promise((resolve) => (bgImg.onload = resolve));

            // Set canvas size to match background image
            const canvasWidth = bgImg.naturalWidth;
            const canvasHeight = bgImg.naturalHeight;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            // Draw background
            ctx.drawImage(bgImg, 0, 0, canvasWidth, canvasHeight);

            // Load User Selfie Image
            const selfieImg = new Image();
            selfieImg.src = capturedImage; // Make sure userSelfie is a valid base64 or URL
            await new Promise((resolve) => (selfieImg.onload = resolve));

            // Get aspect ratio
            const selfieAspect = selfieImg.naturalHeight / selfieImg.naturalWidth;

            // Target width (e.g., 70% of canvas width)
            const targetWidth = canvas.width * 0.64;
            const targetHeight = targetWidth * selfieAspect;

            // Center position
            const offsetY = -100; // Negative moves up, positive moves down
            const selfieImgX = (canvas.width - targetWidth) / 2;
            const selfieImgY = (canvas.height - targetHeight) / 2 + offsetY;

            // Border settings
            const borderSize = 100; // You can tweak this
            ctx.fillStyle = "white";
            ctx.fillRect(
                selfieImgX - borderSize,
                selfieImgY - borderSize,
                targetWidth + borderSize * 2,
                targetHeight + borderSize * 2
            );

            // Draw selfie on top of border
            ctx.drawImage(selfieImg, selfieImgX, selfieImgY, targetWidth, targetHeight);

            // Convert and Save
            const finalImage = canvas.toDataURL("image/jpeg");
            const blob = await (await fetch(finalImage)).blob();

            if (blob) {
                saveAs(blob, 'mi-paltan-pix.jpg');
            }

        } catch (error) {
            console.error("Error capturing photo:", error);
        } finally {
            setIsProcessingImage(false);
        }
    };

    return (<>
        <div className="splash-screen-background-image">
            <div className="demo" />
            <div className="blur-bg flex flex-col items-center justify-between h-full">
                <div className="px-7 pt-7 flex justify-start items-center w-full">
                    <button disabled={isProcessingImage} className={`animate__animated ${showButton ? "animate__fadeIn opacity-1" : "opacity-0"} retake-btn`} onClick={retake}>
                        <ChevronLeft className="w-7 h-7" />
                        {`Retake`}
                    </button>
                </div>
                <div className="flex items-center justify-center h-full w-[calc(100svw-115px)]">
                    <motion.div
                        initial={{ y: currentScreenHeight, scale: 1, rotate: 0 }}
                        animate={{
                            y: [currentScreenHeight, 0, 0, 0, 0],
                            scale: [1, 1, 1.2, 1.2, 1],
                            rotate: [0, 0, 0, -8, -8],

                        }}
                        transition={{
                            duration: 3,
                            times: [0, 0.3, 0.5, 0.7, 1],
                            ease: ["easeOut", "easeInOut", "easeInOut", "easeInOut"],
                        }}
                        onAnimationComplete={handleAnimationComplete}
                    >
                        <CaptureImageFrame base64Image={capturedImage} />
                    </motion.div>
                </div>
                <div className={`animate__animated ${showButton ? "animate__fadeIn opacity-1" : "opacity-0"} flex flex-col gap-2.5 min-w-[calc(100vw-115px)] mb-7`}>
                    <button
                        className="flex items-center justify-center py-4 px-6 leading-[100%] tracking-[0%] text-center text-[#001848] font-bold text-[16px] uppercase transition-all transform bg-gradient-to-r from-[#D8B551] to-[#F0DB9E] disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={savePhoto}
                        disabled={isProcessingImage}
                    >
                        {`Download`}
                    </button>
                    <button
                        className="start-btn-gradient-border text-[16px] font-bold leading-none tracking-normal text-center uppercase text-white py-4 px-7 transition-colors transform w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={onBack}
                        disabled={isProcessingImage}
                    >
                        {`Start Again`}
                    </button>
                </div>
            </div>
            <canvas className="hidden" ref={canvasRef} />
        </div>
    </>);
};

export default DownloadImageScreen;