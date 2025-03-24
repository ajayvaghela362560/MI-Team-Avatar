import React from "react";
import { AvatarSelection } from "./components/AvatarSelection";
import { Camera } from "./components/Camera";
import type { Player } from "./types";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [selectedAvatars, setSelectedAvatars] = React.useState<Player[]>([]);
  const [showCamera, setShowCamera] = React.useState(false);
  const [showSplashScreen, setShowSplashScreen] = React.useState(true);

  const handleAvatarsSelected = (avatars: Player[]) => {
    setSelectedAvatars(avatars);
    setShowCamera(true);
  };

  const handleBack = () => {
    setShowCamera(false);
  };

  const handleCapture = (imageBlob: string) => {
    // Handle the captured image if needed
    console.log("Image captured:", imageBlob);
  };

  return (
    <div className="min-h-screen max-w-[100vw] max-h-[100dvh] bg-gradient-to-br from-purple-50 to-pink-50">
      {showSplashScreen ? (<>
        <SplashScreen STATE={{ showSplashScreen, setShowSplashScreen }} />
      </>) : (<>
        {showCamera ? (
          <Camera
            selectedAvatars={selectedAvatars}
            onCapture={handleCapture}
            onBack={handleBack}
          />
        ) : (
          <AvatarSelection onAvatarsSelected={handleAvatarsSelected} />
        )}
      </>)}
    </div>
  );
}

export default App;
