import { forwardRef } from "react";
import Paltan_Pix from "../paltan_pix_with_bottom_star.png";
import MI_Logo from "../mi-logo.png";
import Play_Like_Mumbai from "../play_like_mumbai.png";
import Capture_Frame_Background_Image from "../capture_frame_background.png";

interface ChildComponentProps {
    base64Image: string;
}

const CaptureImageFrame = forwardRef<HTMLDivElement, ChildComponentProps>(({ base64Image }, ref) => {

    return (<div ref={ref} style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", border: "4.52px solid #FFFFFF", boxShadow: "0px 3.03px 60.53px 0px #FFFFFF66", borderRadius: 25, paddingTop: 30, paddingBottom: 20, background: `url(${Capture_Frame_Background_Image})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }}>
        <div style={{ width: "194px", height: "41px", marginLeft: 10, marginRight: 10 }}>
            <img
                src={Paltan_Pix}
                alt="paltan-pix"
                style={{ height: "100%", width: "100%", objectFit: "contain" }}
            />
        </div>

        <div style={{ width: "105.15px", height: "186.94px", border: "7px solid #FFFFFF" }}>
            {/* <div style={{ width: "100%", height: "100%", border: "7.57px solid #FFFFFF", transform: "rotate(2deg)" }}> */}
            <img
                src={base64Image}
                alt="capture-image-frame"
                style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover"
                    // objectFit: "contain"
                }}
            />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center", justifyContent: 'center', width: "100%", marginTop: 15 }} >
            <div style={{ width: "90.66px", height: "63.63px" }}>
                <img
                    src={MI_Logo}
                    alt="mi-logo"
                    style={{ height: "100%", width: "100%", objectFit: "contain" }}
                />
            </div>
            <div style={{ width: "76.17px", height: "8.29px" }}>
                <img
                    src={Play_Like_Mumbai}
                    alt="play-like-mumbai"
                    style={{ height: "100%", width: "100%", objectFit: "contain" }}
                />
            </div>
        </div>
    </div>);
});

export default CaptureImageFrame;