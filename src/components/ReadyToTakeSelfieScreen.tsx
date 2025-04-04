import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Ready_To_Take_Selfie_Image from "../assets/svg/ready_to_take_selfie_image.png";

interface ReadyToTakeSelfieScreenProps {
    onAnimationComplete: () => void;
}

const ReadyToTakeSelfieScreen = ({ onAnimationComplete }: ReadyToTakeSelfieScreenProps) => {
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
        if (animationComplete) {
            const timer = setTimeout(() => {
                onAnimationComplete();
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [animationComplete, onAnimationComplete]);

    return (
        <div className="flex flex-col justify-center items-center bg-gradient-to-b from-[#006CB7] to-[#013B7A] h-full w-full">
            <div className="absolute top-1/1 left-1/1 transform -translate-x-1/1 -translate-y-1/1">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1 }}
                    onAnimationComplete={() => setAnimationComplete(true)}
                    className="max-w-[calc(100svw-120px)]"
                >
                    <img
                        className="h-full w-full object-contain"
                        alt="ready-to-take-selfie-image"
                        src={Ready_To_Take_Selfie_Image}
                        loading="lazy"
                    />
                </motion.div>
            </div>
        </div>
    );
}

export default ReadyToTakeSelfieScreen;
