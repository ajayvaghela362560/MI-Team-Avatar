import "animate.css";
import Ready_To_Take_Selfie_Image from "../assets/ready_to_take_selfie_image.png";

interface ReadyToTakeSelfieScreenProps {
    requestCameraPermission: () => void;
}

const ReadyToTakeSelfieScreen = ({ requestCameraPermission }: ReadyToTakeSelfieScreenProps) => {

    return (<>
        <div className="flex flex-col justify-center items-center bg-gradient-to-b from-[#006CB7] to-[#013B7A] h-screen w-screen">
            <div className="h-28">
                <img
                    className="animate__animated animate__fadeInUp h-full w-full object-contain"
                    alt="ready-to-take-selfie-image"
                    src={Ready_To_Take_Selfie_Image}
                    onAnimationEnd={() => {
                        setTimeout(() => {
                            requestCameraPermission();
                        }, 1000);
                    }}
                />
            </div>
        </div>
    </>);
}

export default ReadyToTakeSelfieScreen;