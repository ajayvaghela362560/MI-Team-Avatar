import React from 'react';
import { Player } from '../types';
import { players } from '../data/players';
import Player_Selection_Header_Image from '../assets/images/select_players.png';
import Galaxy_Stars_Image from '../assets/images/galaxy_star_effect.png';
import Glowing_Star_Image from '../assets/images/glowing_star.png';
import "animate.css";

interface AvatarSelectionProps {
  onAvatarsSelected: (avatars: Player[]) => void;
  STATE: {
    showSplashScreen: boolean;
    setShowSplashScreen: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

interface selectPlayersTypes extends Player {
  showSmallStar?: boolean;
  showBigStar?: boolean;
  showAlternateImage?: boolean;
  fadeOutImage?: boolean;
}

export function AvatarSelection({ onAvatarsSelected, STATE }: AvatarSelectionProps) {
  const [selectedAvatars, setSelectedAvatars] = React.useState<selectPlayersTypes[]>([]);

  const toggleAvatar = (avatar: Player) => {
    setSelectedAvatars((prev) => {
      const isSelected = prev.some((p) => p.id === avatar.id);

      if (isSelected) {
        // Reverse animation on deselection
        setSelectedAvatars((prevState) =>
          prevState.map((p) =>
            p.id === avatar.id
              ? { ...p, showBigStar: false, showSmallStar: true, fadeOutImage: true }
              : p
          )
        );

        setTimeout(() => {
          setSelectedAvatars((prevState) =>
            prevState.map((p) =>
              p.id === avatar.id ? { ...p, showSmallStar: false, showAlternateImage: false, fadeOutImage: false } : p
            )
          );
        }, 1000);

        return prev.filter((p) => p.id !== avatar.id);
      } else {
        if (prev.length >= 2) return prev; // Prevent more than max selections

        const newPlayer = { ...avatar, showSmallStar: true, showBigStar: false, showAlternateImage: true, fadeOutImage: false };

        setTimeout(() => {
          setSelectedAvatars((prevState) =>
            prevState.map((p) =>
              p.id === avatar.id ? { ...p, showSmallStar: false, showBigStar: true } : p
            )
          );
        }, 2000);

        return [...prev, newPlayer];
      }
    });

    // setSelectedAvatars((prev) => {
    //   const isSelected = prev.some((p) => p.id === avatar.id);

    //   if (isSelected) {
    //     // Reverse animation on deselection
    //     setSelectedAvatars((prevState) =>
    //       prevState.map((p) =>
    //         p.id === avatar.id ? { ...p, showBigStar: false, showSmallStar: true } : p
    //       )
    //     );

    //     setTimeout(() => {
    //       setSelectedAvatars((prevState) => prevState.filter((p) => p.id !== avatar.id));
    //     }, 2000);

    //     return prev;
    //   } else {

    //     if (prev.length >= 2) return prev; // Prevent more than max selectionsccc

    //     const newPlayer = { ...avatar, showSmallStar: true, showBigStar: false };

    //     setTimeout(() => {
    //       setSelectedAvatars((prevState) =>
    //         prevState.map((p) =>
    //           p.id === avatar.id ? { ...p, showSmallStar: false, showBigStar: true } : p
    //         )
    //       );
    //     }, 2000);

    //     return [...prev, newPlayer];
    //   }
    // });
  };

  const backToSplashScreen = () => {
    setSelectedAvatars([]);
    STATE.setShowSplashScreen(true);
  }

  const handleSubmit = () => {
    onAvatarsSelected(selectedAvatars);
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#006CB7_0%,#013B7A_84.21%)]">

      <div className="flex flex-col justify-center items-center gap-3 pt-6 mb-3 px-5">
        <div className="h-[69px]">
          <img
            className="h-full w-full object-contain"
            alt="player-selection-header-image"
            src={Player_Selection_Header_Image}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 overflow-y-scroll max-h-[calc(100vh-200px)] px-5">
        {players.map(avatar => {
          const selectedPlayer = selectedAvatars.find((p) => p.id === avatar.id);
          return (<div
            key={avatar.id}
            onClick={() => toggleAvatar(avatar)}
            className={`flex flex-col items-center cursor-pointer ${selectedAvatars.length >= 2 && !selectedAvatars.find(a => a.id === avatar.id)
              ? 'opacity-50 cursor-not-allowed'
              : ''
              }`}
          >
            <div key={avatar.id} className="relative w-[100px] h-[100px]">
              <div className={`absolute w-[70px] h-[70px] border-4 border-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${selectedPlayer ? "opacity-0" : ""}`}></div>

              <div className="absolute top-1/1 left-1/1 transform -translate-x-1/1 -translate-y-1/1 cursor-pointer z-10">
                <img
                  src={selectedPlayer?.showAlternateImage ? avatar.selected_pose_image : avatar.default_pose_image}
                  alt={avatar.name}
                  className={`w-full animate__animated ${selectedPlayer?.fadeOutImage ? "animate__fadeOut" : "animate__fadeIn"}`}
                  onAnimationEnd={() => {
                    if (selectedPlayer?.fadeOutImage) {
                      setSelectedAvatars((prevState) =>
                        prevState.map((p) =>
                          p.id === avatar.id ? { ...p, fadeOutImage: false } : p
                        )
                      );
                    }
                  }}
                />
              </div>

              <div className="absolute top-1/1 left-1/1 transform -translate-x-1/1 -translate-y-1/1">
                {selectedPlayer?.showSmallStar && (
                  <img
                    src={Galaxy_Stars_Image}
                    alt="Small Star"
                    className="animate__animated animate__zoomIn"
                  />
                )}
                {selectedPlayer?.showBigStar && (
                  <img
                    src={Glowing_Star_Image}
                    alt="Big Star"
                    className="animate__animated animate__zoomIn"
                  />
                )}
              </div>
            </div>

            <p className="player-name text-shadow">{avatar.name}</p>
          </div>);
        })}
      </div>

      <div className="flex justify-center items-center px-5 pt-6 gap-5">
        <button
          onClick={backToSplashScreen}
          className="player-selection-cancel-button"
        >
          {`Cancel`}
        </button>

        <button
          onClick={handleSubmit}
          disabled={selectedAvatars.length !== 2}
          className={`w-full flex items-center justify-center py-4 px-6 leading-[100%] tracking-[0%] text-center text-[#001848] font-bold text-[16px] uppercase transition-all transform hover:scale-105 bg-gradient-to-r from-[#D8B551] to-[#F0DB9E] ${selectedAvatars.length === 2
            ? ''
            : 'opacity-[50%] cursor-not-allowed'
            }`}
        >
          {`Submit`}
        </button>
      </div>

    </div>
  );
}