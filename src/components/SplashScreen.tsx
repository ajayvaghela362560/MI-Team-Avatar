import MI_Logo from "../assets/mi-logo.png";
import Pose_Images from "../assets/images/splash_screen_center_image.png";
import Camera_Icon from "../assets/images/splash_screen_camera_icon.png";

type SplashScreenProps = {
  showSplashScreen: boolean;
  setShowSplashScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SplashScreen({ STATE }: { STATE: SplashScreenProps }) {
  const handleStartExperience = () => {
    STATE?.setShowSplashScreen(false);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen py-8 px-4 splash-screen-background-image" onClick={handleStartExperience}>
      {/* Logos section */}
      <div className="w-full flex items-center justify-center max-w-md my-8">
        <div className="w-32 h-20">
          <img
            className="h-full w-full object-contain"
            alt="mi-logo"
            src={MI_Logo}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        <h6 className="splash-screen-title">POSE WITH THE</h6>
        <h1 className="splash-screen-desc">STARS</h1>

        {/* Silhouette placeholder */}
        <div className="w-full my-10 flex items-center justify-center">
          <img alt="pose-image" src={Pose_Images} />
        </div>

        <div className="mb-8">
          <h1 className="splash-screen-huddle-up-text">HUDDLE UP</h1>
          <h6 className="splash-screen-take-photo-text">AND TAKE A PHOTO</h6>
        </div>

        {/* Start button */}
        <button className="splash-screen-tap-btn">
          <div className="h-14 w-14">
            <img
              className="h-full w-full object-contain"
              alt="camera-image"
              src={Camera_Icon}
            />
          </div>
          <span>{"TAP ON SCREEN"}</span>
        </button>
      </div>
    </div>
  );
}
