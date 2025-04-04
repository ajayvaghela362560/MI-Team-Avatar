import React from "react";
import { AvatarSelection } from "./components/AvatarSelection";
import { Camera } from "./components/Camera";
import type { Player } from "./types";
import SplashScreen from "./components/SplashScreen";
import "animate.css";

function App() {
  const [selectedAvatars, setSelectedAvatars] = React.useState<Player[]>([]);
  const [showCamera, setShowCamera] = React.useState(false);
  const [showSplashScreen, setShowSplashScreen] = React.useState(true);
  const [childKey, setChildKey] = React.useState(0);

  const handleAvatarsSelected = (avatars: Player[]) => {
    setSelectedAvatars(avatars);
    setShowCamera(true);
  };

  const handleStartAgain = () => {
    setShowSplashScreen(true);
    setShowCamera(false);
    setChildKey((prev) => prev + 1);
  };

  const handleStart = () => {
    setShowSplashScreen(false);
  };

  const handleCapture = (imageBlob: string) => {
    // Handle the captured image if needed
    console.log("Image captured:", imageBlob);
  };

  return (
    // <div className="min-h-[100svh] min-w-[100lvw] max-w-[100lvw] max-h-[100svh]">
    <div className="w-full h-[100svh]">
      {showSplashScreen ? (<>
        <SplashScreen handleStart={handleStart} />
      </>) : (<>
        {showCamera ? (
          <Camera
            selectedAvatars={selectedAvatars}
            onCapture={handleCapture}
            onBack={handleStartAgain}
          />
        ) : (
          <AvatarSelection
            key={childKey}
            onAvatarsSelected={handleAvatarsSelected}
            onBack={handleStartAgain}
          />
        )}
      </>)}
    </div>
  );
}

export default App;