import { ChevronLeft } from "lucide-react";
import CaptureImageFrame from "../assets/svg/captureImageFrame";
import { forwardRef, useRef, useState } from "react";
import { motion } from "framer-motion";

interface PropsTypes {
    retake: () => void;
    savePhoto: () => void;
    onBack: () => void;
    capturedImage: string;
}

const DownloadImageScreen = forwardRef<HTMLDivElement, PropsTypes>(({ retake, capturedImage, onBack, savePhoto }, ref) => {

    const { current: currentScreenHeight } = useRef<number>(window?.innerHeight);
    const [showButton, setShowButton] = useState(false);

    const handleAnimationComplete = () => {
        setShowButton(true);
    };

    return (<>
        <div className="min-h-screen splash-screen-background-image">
            <div className="demo" />
            <div className="blur-bg flex flex-col items-center justify-between min-h-screen">
                <div className="px-7 pt-7 flex justify-start items-center w-full">
                    {showButton ? (
                        <button className="animate__animated animate__fadeIn retake-btn" onClick={retake}>
                            <ChevronLeft className="w-7 h-7" />
                            {`Retake`}
                        </button>
                    ) : (
                        <button className="retake-btn opacity-0">
                            <ChevronLeft className="w-7 h-7" />
                            {`Retake`}
                        </button>
                    )}
                </div>
                <div className="flex items-center justify-center h-full w-[calc(100vw-115px)]">
                    <motion.div
                        initial={{ y: currentScreenHeight, scale: 1, rotate: 0 }} // Start below screen (1000px)
                        animate={{
                            y: [currentScreenHeight, 0, 0, 0, 0], // Move up to actual position
                            scale: [1, 1, 1.2, 1.2, 1], // Scale up then back to normal
                            rotate: [0, 0, 0, -8, -8], // Slight rotation
                        }}
                        transition={{
                            duration: 3,
                            times: [0, 0.3, 0.5, 0.7, 1],
                            ease: ["easeOut", "easeInOut", "easeInOut", "easeInOut"],
                        }}
                        onAnimationComplete={handleAnimationComplete}
                    >
                        <CaptureImageFrame ref={ref} base64Image={capturedImage} />
                    </motion.div>
                </div>
                {showButton ? (
                    <div className="animate__animated animate__fadeInUpBig flex flex-col gap-2.5 min-w-[calc(100vw-115px)] mb-7">
                        <button
                            className="flex items-center justify-center py-4 px-6 leading-[100%] tracking-[0%] text-center text-[#001848] font-bold text-[16px] uppercase transition-all transform bg-gradient-to-r from-[#D8B551] to-[#F0DB9E]"
                            onClick={savePhoto}
                        >
                            {`Download`}
                        </button>
                        <button
                            className="gradient-border text-[16px] font-bold leading-none tracking-normal text-center uppercase text-white py-3 transition-colors transform w-full"
                            onClick={onBack}
                        >
                            {`Start Again`}
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2.5 min-w-[calc(100vw-115px)] mb-7 opacity-0">
                        <button className="flex items-center justify-center py-4 px-6 leading-[100%] tracking-[0%] text-center text-[#001848] font-bold text-[16px] uppercase transition-all transform bg-gradient-to-r from-[#D8B551] to-[#F0DB9E]">
                            {`Download`}
                        </button>
                        <button className="gradient-border text-[16px] font-bold leading-none tracking-normal text-center uppercase text-white py-3 transition-colors transform w-full">
                            {`Start Again`}
                        </button>
                    </div>
                )}
            </div>
        </div>
    </>);
});

export default DownloadImageScreen;