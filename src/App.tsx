import React from 'react';
import { AvatarSelection } from './components/AvatarSelection';
import { Camera } from './components/Camera';
import type { Avatar } from './types';

function App() {
  const [selectedAvatars, setSelectedAvatars] = React.useState<Avatar[]>([]);
  const [showCamera, setShowCamera] = React.useState(false);

  const handleAvatarsSelected = (avatars: Avatar[]) => {
    setSelectedAvatars(avatars);
    setShowCamera(true);
  };

  const handleBack = () => {
    setShowCamera(false);
  };

  const handleCapture = (imageBlob: Blob) => {
    // Handle the captured image if needed
    console.log('Image captured:', imageBlob);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {showCamera ? (
        <Camera
          selectedAvatars={selectedAvatars}
          onCapture={handleCapture}
          onBack={handleBack}
        />
      ) : (
        <AvatarSelection onAvatarsSelected={handleAvatarsSelected} />
      )}
    </div>
  );
}

export default App;