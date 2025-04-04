import { forwardRef } from "react";
import Paltan_Pix from "./paltan_pix.svg";
import MI_Logo from "./mi-logo.svg";
import Play_Like_Mumbai from "./play_like_mumbai.svg";
import Capture_Frame_Background_Image from "./capture_image_frame_background.png";

interface ChildComponentProps {
    base64Image: string;
}

const CaptureImageFrame = forwardRef<HTMLDivElement, ChildComponentProps>(({ base64Image }, ref) => {

    return (<div ref={ref} style={{ minHeight: "calc(100svh - 300px)", minWidth: "calc(100svw - 100px)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", border: "4px solid #FFFFFF", boxShadow: "0px 3.03px 60.53px 0px #FFFFFF66", borderRadius: 25, background: `url(${Capture_Frame_Background_Image})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
        <div style={{ height: "50px", padding: "0px 24px", marginTop: "30px" }}>
            <img
                src={Paltan_Pix}
                alt="paltan-pix"
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                loading="lazy"
            />
        </div>

        <div style={{ padding: "0px 60px", transform: "scaleX(0.85) scaleY(0.90)" }}>
            <div style={{ width: "100%", height: "100%", border: "7px solid #FFFFFF" }}>
                <img
                    src={base64Image}
                    alt="capture-image-frame"
                    style={{ height: "100%", width: "100%", objectFit: "contain" }}
                    loading="lazy"
                />
            </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "3.84px", alignItems: "center", justifyContent: 'center', width: "100%", marginTop: "10px", marginBottom: "24px" }} >
            <div style={{ height: "52px" }}>
                <img
                    src={MI_Logo}
                    alt="mi-logo"
                    style={{ height: "100%", width: "100%", objectFit: "contain" }}
                    loading="lazy"
                />
            </div>
            <div style={{ height: "8.29px" }}>
                <img
                    src={Play_Like_Mumbai}
                    alt="play-like-mumbai"
                    style={{ height: "100%", width: "100%", objectFit: "contain" }}
                    loading="lazy"
                />
            </div>
        </div>
    </div>);
});

export default CaptureImageFrame;