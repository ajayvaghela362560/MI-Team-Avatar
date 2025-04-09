import MI_Logo from "../assets/svg/mi-logo.png";
import Play_Like_Mumbai from "../assets/svg/play_like_mumbai.png";
import Paltan_Pix from "../assets/svg/paltan_pix.png";
import Huddle_Up from "../assets/svg/huddle_up_text_image.png";
import Pose_Images from "../assets/images/Splash_Screen/splash_screen_center_image.png";

type SplashScreenProps = {
  handleStart: () => void;
};

export default function SplashScreen({ handleStart }: SplashScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center splash-screen-background-image">
      {/* Mi Logo section */}
      <div className="w-full flex flex-col items-center justify-center">
        <div className="h-[88px] mb-2">
          <img
            className="h-full w-full object-contain"
            alt="mi-logo"
            src={MI_Logo}
            loading="lazy"
          />
        </div>
        <div className="h-5 mb-5">
          <img
            className="h-full w-full object-contain"
            alt="play-like-mumbai"
            src={Play_Like_Mumbai}
            loading="lazy"
          />
        </div>
        {/* Paltan pix image */}
        <div className="h-[67px]">
          <img
            className="h-full w-full object-contain"
            alt="paltan-pix"
            src={Paltan_Pix}
            loading="lazy"
          />
        </div>
      </div>

      {/* Splash Screen Center Image */}
      <div className="w-full flex justify-center items-center h-[calc(40svh)] my-5">
        <img
          className="h-full w-auto object-contain shadow-[0px_4.84px_96.71px_0px_#FFFFFF66] rotate-[6.87deg]"
          alt="pose-image"
          src={Pose_Images}
          loading="lazy"
        />
      </div>

      <div className="flex flex-col gap-1 items-center justify-center w-full mb-8">
        <div className="h-11">
          <img
            className="h-full w-full object-contain"
            alt="huddle-up"
            src={Huddle_Up}
            loading="lazy"
          />
        </div>
        <h6 className="splash-screen-take-photo-text">AND TAKE A PHOTO</h6>
      </div>

      {/* Start button */}
      <button className="animatedButton" onClick={() => handleStart()}>
        <div className="gradientBg"></div>
        <div className="ripple1"></div>
        <div className="ripple2"></div>
        <div className="ripple3"></div>
        <span className="buttonText">{`START`}</span>
      </button>
    </div>
  );
}
