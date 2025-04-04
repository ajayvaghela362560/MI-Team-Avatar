import { ChevronLeft } from "lucide-react";
import CaptureImageFrame from "../assets/svg/captureImageFrame";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
interface PropsTypes {
    retake: () => void;
    onBack: () => void;
    capturedImage: string;
}

const DownloadImageScreen = ({ retake, capturedImage, onBack }: PropsTypes) => {

    const { current: currentScreenHeight } = useRef<number>(window?.innerHeight);
    const imageRef = useRef<HTMLDivElement>(null);
    const [showButton, setShowButton] = useState(false);

    const handleAnimationComplete = () => {
        setShowButton(true);
    };

    const savePhoto = async () => {
        try {
            if (!imageRef.current) return;

            const canvas = await html2canvas(imageRef.current, { backgroundColor: null, scale: 2 });
            const finalImage = canvas.toDataURL("image/jpeg");

            // Convert dataURL to Blob
            const blob = await (await fetch(finalImage)).blob();

            if (blob) {
                saveAs(blob, 'mi-paltan-pix.jpg');
            }

        } catch (error) {
            console.error("Error capturing photo:", error);
        }
    };

    return (<>
        <div className="splash-screen-background-image">
            <div className="demo" />
            <div className="blur-bg flex flex-col items-center justify-between h-full">
                <div className="px-7 pt-7 flex justify-start items-center w-full">
                    <button className={`animate__animated ${showButton ? "animate__fadeIn opacity-1" : "opacity-0"} retake-btn`} onClick={retake}>
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
                    <div className="h-0 overflow-hidden">
                        <CaptureImageFrame ref={imageRef} base64Image={capturedImage} />
                    </div>

                </div>
                <div className={`animate__animated ${showButton ? "animate__fadeIn opacity-1" : "opacity-0"} flex flex-col gap-2.5 min-w-[calc(100vw-115px)] mb-7`}>
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
            </div>
        </div>
    </>);
};

export default DownloadImageScreen;