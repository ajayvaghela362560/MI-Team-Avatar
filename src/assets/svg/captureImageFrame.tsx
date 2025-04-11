import { forwardRef } from "react";
import Paltan_Pix from "./paltan_pix.png";
import MI_Logo from "./mi-logo.png";
import Play_Like_Mumbai from "./play_like_mumbai.png";
import Capture_Frame_Background_Image from "./capture_image_frame_background.png";

interface ChildComponentProps {
    base64Image: string;
}

const CaptureImageFrame = forwardRef<HTMLDivElement, ChildComponentProps>(({ base64Image }, ref) => {

    return (<div ref={ref} style={{ minHeight: "66svh", minWidth: "70svw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", border: "4px solid #FFFFFF", boxShadow: "0px 3.03px 60.53px 0px #FFFFFF66", borderRadius: 25, background: `url(${Capture_Frame_Background_Image})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ height: "100%", width: "86%" }}>
                <img
                    src={Paltan_Pix}
                    alt="paltan-pix"
                    style={{ height: "100%", width: "100%", objectFit: "contain" }}
                    loading="lazy"
                />
            </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "15px", marginBottom:"25px" }}>
            <div style={{ height: "100%", width: "70%", border: "5px solid #FFFFFF" }}>
                <img
                    src={base64Image}
                    alt="capture-image-frame"
                    style={{ height: "100%", width: "100%", objectFit: "contain" }}
                    loading="lazy"
                />
            </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "3.84px", alignItems: "center", justifyContent: 'center', width: "100%" }} >
            <div style={{ height: "60px" }}>
                <img
                    src={MI_Logo}
                    alt="mi-logo"
                    style={{ height: "100%" }}
                    loading="lazy"
                />
            </div>
            <div style={{ height: "10px" }}>
                <img
                    src={Play_Like_Mumbai}
                    alt="play-like-mumbai"
                    style={{ height: "100%" }}
                    loading="lazy"
                />
            </div>
        </div>
    </div>);
});

export default CaptureImageFrame;