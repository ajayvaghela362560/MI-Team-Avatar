import MI_Logo from "../assets/mi-logo.png";
import Play_Like_Mumbai from "../assets/play_like_mumbai.png";
import Paltan_Pix from "../assets/paltan_pix.png";
import Huddle_Up from "../assets/images/Splash_Screen/huddle_up_text_image.png";
import Pose_Images from "../assets/images/Splash_Screen/splash_screen_center_image.png";

type SplashScreenProps = {
  showSplashScreen: boolean;
  setShowSplashScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SplashScreen({ STATE }: { STATE: SplashScreenProps }) {
  const handleStartExperience = () => {
    STATE?.setShowSplashScreen(false);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen splash-screen-background-image">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        {/* Mi Logo section */}
        <div className="w-full flex flex-col gap-2 items-center justify-center max-w-md my-8">
          <div className="w-36 h-24">
            <img
              className="h-full w-full object-contain"
              alt="mi-logo"
              src={MI_Logo}
            />
          </div>
          <div className="h-5">
            <img
              className="h-full w-full object-contain"
              alt="play-like-mumbai"
              src={Play_Like_Mumbai}
            />
          </div>
        </div>

        {/* Paltan pix image */}
        <div className="h-[67px]">
          <img
            className="h-full w-full object-contain"
            alt="paltan-pix"
            src={Paltan_Pix}
          />
        </div>

        {/* Silhouette placeholder */}
        <div className="w-full my-4 flex items-center justify-center">
          <img alt="pose-image" src={Pose_Images} />
        </div>

        <div className="flex flex-col gap-1.5 items-center justify-center w-full mb-8">
          <div className="h-11">
            <img
              className="h-full w-full object-contain"
              alt="huddle-up"
              src={Huddle_Up}
            />
          </div>
          <h6 className="splash-screen-take-photo-text">AND TAKE A PHOTO</h6>
        </div>

        {/* Start button */}
        <button className="animatedButton mb-14" onClick={handleStartExperience}>
          <div className="gradientBg"></div>
          <div className="ripple1"></div>
          <div className="ripple2"></div>
          <div className="ripple3"></div>
          <span className="buttonText">{`START`}</span>
        </button>
      </div>
    </div>
  );
}
