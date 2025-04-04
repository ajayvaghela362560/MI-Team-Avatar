import React from 'react';
import { Player } from '../types';
import { players } from '../data/players';
import Player_Selection_Header_Image from '../assets/svg/player_selection_header_img.png';
import Galaxy_Stars_Image from '../assets/images/galaxy_star_effect.png';
import Glowing_Star_Image from '../assets/images/glowing_star.png';
import "animate.css";

interface AvatarSelectionProps {
  key: number;
  onAvatarsSelected: (avatars: Player[]) => void;
  onBack: () => void;
}

interface selectPlayersTypes extends Player {
  showSmallStar?: boolean;
  showBigStar?: boolean;
  showAlternateImage?: boolean;
  fadeOutImage?: boolean;
  timeoutId?: NodeJS.Timeout | null;
}

export function AvatarSelection({ onAvatarsSelected, onBack }: AvatarSelectionProps) {
  const [selectedAvatars, setSelectedAvatars] = React.useState<selectPlayersTypes[]>([]);

  const toggleAvatar = (avatar: Player) => {

    setSelectedAvatars((prev) => {
      const isSelected = prev.some((p) => p.id === avatar.id);
    
      if (isSelected) {
        // Reverse animation on deselection
        setSelectedAvatars((prevState) =>
          prevState.map((p) =>
            p.id === avatar.id
              ? {
                  ...p,
                  showBigStar: false,
                  showSmallStar: true,
                  fadeOutImage: true,
                }
              : p
          )
        );
    
        setTimeout(() => {
          setSelectedAvatars((prevState) =>
            prevState.map((p) =>
              p.id === avatar.id
                ? {
                    ...p,
                    showSmallStar: false,
                    showAlternateImage: false,
                    fadeOutImage: false,
                  }
                : p
            )
          );
        }, 500);
    
        return prev.filter((p) => p.id !== avatar.id);
      } else {
        if (prev.length >= 2) return prev; // Prevent more than max selections
    
        // Initial selection with small star but no image switch
        const newPlayer = {
          ...avatar,
          showSmallStar: true,
          showBigStar: false,
          showAlternateImage: false, // Keep false initially
          fadeOutImage: false,
          animationTimeout: null, // Store timeout ID
        };
    
        setSelectedAvatars([...prev, newPlayer]);
    
        // Clear previous timeouts if player was quickly deselected/selected
        if (newPlayer.animationTimeout) {
          clearTimeout(newPlayer.animationTimeout);
        }
    
        const timeoutId = setTimeout(() => {
          setSelectedAvatars((prevState) =>
            prevState.map((p) =>
              p.id === avatar.id
                ? { 
                    ...p, 
                    showSmallStar: false, 
                    showBigStar: true,
                    showAlternateImage: true // Switch image when big star appears
                  }
                : p
            )
          );
        }, 1000);
    
        return [...prev, { ...newPlayer, animationTimeout: timeoutId }];
      }
    });

    // setSelectedAvatars((prev) => {
    //   const isSelected = prev.some((p) => p.id === avatar.id);
    
    //   if (isSelected) {
    //     // Find the player to get its timeoutId
    //     const playerToDeselect = prev.find((p) => p.id === avatar.id);
    //     if (playerToDeselect?.timeoutId) {
    //       clearTimeout(playerToDeselect.timeoutId);
    //     }
    
    //     // Reverse animation on deselection
    //     setSelectedAvatars((prevState) =>
    //       prevState.map((p) =>
    //         p.id === avatar.id
    //           ? {
    //               ...p,
    //               showBigStar: false,
    //               showSmallStar: false,
    //               fadeOutImage: true,
    //             }
    //           : p
    //       )
    //     );
    
    //     // Set a timeout for the final cleanup (removing the player)
    //     const deselectTimeout = setTimeout(() => {
    //       setSelectedAvatars((prevState) =>
    //         prevState.filter((p) => p.id !== avatar.id)
    //       );
    //     }, 500); // Match the animation duration
    
    //     return prev.map((p) =>
    //       p.id === avatar.id ? { ...p, timeoutId: deselectTimeout } : p
    //     );
    //   } else {
    //     if (prev.length >= 2) return prev; // Prevent more than max selections
    
    //     // Immediately update the player state
    //     const newPlayer = {
    //       ...avatar,
    //       showSmallStar: true,
    //       showBigStar: false,
    //       showAlternateImage: true, // Image should change immediately
    //       fadeOutImage: false,
    //     };
    
    //     // Clear any previous timeouts to prevent unwanted behavior
    //     prev.forEach((p) => {
    //       if (p.timeoutId) {
    //         clearTimeout(p.timeoutId);
    //       }
    //     });
    
    //     setSelectedAvatars([...prev, newPlayer]);
    
    //     // Schedule the big star animation after 1s
    //     const timeoutId = setTimeout(() => {
    //       setSelectedAvatars((prevState) =>
    //         prevState.map((p) =>
    //           p.id === avatar.id
    //             ? { ...p, showSmallStar: false, showBigStar: true }
    //             : p
    //         )
    //       );
    
    //       // Switch plate image after small star disappears
    //       const plateImageTimeout = setTimeout(() => {
    //         setSelectedAvatars((prevState) =>
    //           prevState.map((p) =>
    //             p.id === avatar.id ? { ...p, showPlateImage: true } : p
    //           )
    //         );
    //       }, 500);
    
    //       // Store the plate image timeout ID in case we need to clear it
    //       setSelectedAvatars((prevState) =>
    //         prevState.map((p) =>
    //           p.id === avatar.id ? { ...p, timeoutId: plateImageTimeout } : p
    //         )
    //       );
    //     }, 1000);
    
    //     return [...prev, { ...newPlayer, timeoutId }];
    //   }
    // });

    // setSelectedAvatars((prev) => {
    //   const isSelected = prev.some((p) => p.id === avatar.id);
    
    //   if (isSelected) {
    //     // Reverse animation on deselection
    //     setSelectedAvatars((prevState) =>
    //       prevState.map((p) =>
    //         p.id === avatar.id
    //           ? {
    //               ...p,
    //               showBigStar: false,
    //               showSmallStar: true,
    //               fadeOutImage: true,
    //             }
    //           : p
    //       )
    //     );
    
    //     setTimeout(() => {
    //       setSelectedAvatars((prevState) =>
    //         prevState.map((p) =>
    //           p.id === avatar.id
    //             ? {
    //                 ...p,
    //                 showSmallStar: false,
    //                 showAlternateImage: false,
    //                 fadeOutImage: false,
    //               }
    //             : p
    //         )
    //       );
    //     }, 500);
    
    //     return prev.filter((p) => p.id !== avatar.id);
    //   } else {
    //     if (prev.length >= 2) return prev; // Prevent more than max selections
    
    //     // Immediately update the player state
    //     const newPlayer = {
    //       ...avatar,
    //       showSmallStar: true,
    //       showBigStar: false,
    //       showAlternateImage: true, // Image should change immediately
    //       fadeOutImage: false,
    //     };
    
    //     // Clear any previous timeouts to prevent unwanted behavior
    //     prev.forEach((p) => {
    //       if (p.timeoutId) {
    //         clearTimeout(p.timeoutId);
    //       }
    //     });
    
    //     setSelectedAvatars([...prev, newPlayer]);
    
    //     // Schedule the big star animation after 1s
    //     const timeoutId = setTimeout(() => {
    //       setSelectedAvatars((prevState) =>
    //         prevState.map((p) =>
    //           p.id === avatar.id
    //             ? { ...p, showSmallStar: false, showBigStar: true }
    //             : p
    //         )
    //       );
    
    //       // Switch plate image after small star disappears
    //       setTimeout(() => {
    //         setSelectedAvatars((prevState) =>
    //           prevState.map((p) =>
    //             p.id === avatar.id
    //               ? { ...p, showPlateImage: true } // Update plate image here
    //               : p
    //           )
    //         );
    //       }, 500); // Adjust timing to match the animation
    //     }, 1000);
    
    //     return [...prev, { ...newPlayer, timeoutId }];
    //   }
    // });

    // setSelectedAvatars((prev) => {
    //   const isSelected = prev.some((p) => p.id === avatar.id);

    //   if (isSelected) {
    //     // Reverse animation on deselection
    //     setSelectedAvatars((prevState) =>
    //       prevState.map((p) =>
    //         p.id === avatar.id
    //           ? {
    //             ...p,
    //             showBigStar: false,
    //             showSmallStar: true,
    //             fadeOutImage: true,
    //           }
    //           : p
    //       )
    //     );

    //     setTimeout(() => {
    //       setSelectedAvatars((prevState) =>
    //         prevState.map((p) =>
    //           p.id === avatar.id
    //             ? {
    //               ...p,
    //               showSmallStar: false,
    //               showAlternateImage: false,
    //               fadeOutImage: false,
    //             }
    //             : p
    //         )
    //       );
    //     }, 500);

    //     return prev.filter((p) => p.id !== avatar.id);
    //   } else {
    //     if (prev.length >= 2) return prev; // Prevent more than max selections

    //     // Immediately update the player state
    //     const newPlayer = {
    //       ...avatar,
    //       showSmallStar: true,
    //       showBigStar: false,
    //       showAlternateImage: true, // Image should change immediately
    //       fadeOutImage: false,
    //     };

    //     // Clear any previous timeouts to prevent unwanted behavior
    //     prev.forEach((p) => {
    //       if (p.timeoutId) {
    //         clearTimeout(p.timeoutId);
    //       }
    //     });

    //     setSelectedAvatars([...prev, newPlayer]);

    //     // Schedule the big star animation after 1s
    //     const timeoutId = setTimeout(() => {
    //       setSelectedAvatars((prevState) =>
    //         prevState.map((p) =>
    //           p.id === avatar.id ? { ...p, showSmallStar: false, showBigStar: true } : p
    //         )
    //       );
    //     }, 1000);

    //     return [...prev, { ...newPlayer, timeoutId }];
    //   }
    // });

    // setSelectedAvatars((prev) => {
    //   const isSelected = prev.some((p) => p.id === avatar.id);

    //   if (isSelected) {
    //     // Reverse animation on deselection
    //     setSelectedAvatars((prevState) =>
    //       prevState.map((p) =>
    //         p.id === avatar.id
    //           ? {
    //             ...p,
    //             showBigStar: false,
    //             showSmallStar: true,
    //             fadeOutImage: true,
    //           }
    //           : p
    //       )
    //     );

    //     setTimeout(() => {
    //       setSelectedAvatars((prevState) =>
    //         prevState.map((p) =>
    //           p.id === avatar.id
    //             ? { ...p, showSmallStar: false, showAlternateImage: false, fadeOutImage: false }
    //             : p
    //         )
    //       );
    //     }, 500);

    //     return prev.filter((p) => p.id !== avatar.id);
    //   } else {
    //     if (prev.length >= 2) return prev; // Prevent more than max selections

    //     // Immediately switch the image when the small star animation starts
    //     const newPlayer = {
    //       ...avatar,
    //       showSmallStar: true,
    //       showBigStar: false,
    //       showAlternateImage: true, // Image switches immediately when small star starts
    //       fadeOutImage: false,
    //       animationTimeout: null, // Store timeout ID
    //     };

    //     setSelectedAvatars([...prev, newPlayer]);

    //     // Clear previous timeouts if player was quickly deselected/selected
    //     if (newPlayer.animationTimeout) {
    //       clearTimeout(newPlayer.animationTimeout);
    //     }

    //     const timeoutId = setTimeout(() => {
    //       setSelectedAvatars((prevState) =>
    //         prevState.map((p) =>
    //           p.id === avatar.id ? { ...p, showSmallStar: false, showBigStar: true } : p
    //         )
    //       );
    //     }, 1000);

    //     return [...prev, { ...newPlayer, animationTimeout: timeoutId }];
    //   }
    // });

  };

  const backToSplashScreen = () => {
    setSelectedAvatars([]);
    onBack();
  }

  const handleSubmit = () => {
    onAvatarsSelected(selectedAvatars);
  };

  const [scrollBarPosition, setCcrollBarPosition] = React.useState("top");
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    if (scrollTop === 0) {
      setCcrollBarPosition('top');
    }
    if (scrollTop + clientHeight >= scrollHeight - 1) {
      setCcrollBarPosition('bottom');
    }
  };

  return (
    <div className="h-full bg-[linear-gradient(180deg,#006CB7_0%,#013B7A_84.21%)] position-relative">

      <div className={`flex flex-col justify-center items-center py-5 px-5 player-selection-header ${(scrollBarPosition === "top") ? "border-b-2 border-[#FFFFFF29]" : ""}`}>
        <div className="h-[69px]">
          <img
            className="h-full w-full object-contain"
            alt="player-selection-header-image"
            src={Player_Selection_Header_Image}
            loading='lazy'
          />
        </div>
      </div>

      {/* <div
        ref={containerRef}
        onScroll={handleScroll}
        className={`grid grid-cols-2 md:grid-cols-4 gap-6 overflow-y-scroll max-h-[calc(100vh-200px)] px-10 pt-4 pb-6 ${(scrollBarPosition === "top") ? "border-t-2 border-[#FFFFFF29]" : (scrollBarPosition === "bottom") ? "border-b-2 border-[#FFFFFF29]" : ""}`}> */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className={`grid grid-cols-2 md:grid-cols-4 gap-6 overflow-y-scroll px-10 player-selection-body ${(scrollBarPosition === "top") ? "border-t-2 border-[#FFFFFF29]" : (scrollBarPosition === "bottom") ? "border-b-2 border-[#FFFFFF29]" : ""}`}>
        {players.map(avatar => {
          const selectedPlayer = selectedAvatars.find((p) => p.id === avatar.id);
          return (<div
            key={avatar.id}
            onClick={() => toggleAvatar(avatar)}
            className={`flex flex-col items-center cursor-pointer ${selectedAvatars.length >= 2 && !selectedAvatars.find(a => a.id === avatar.id) ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <div key={avatar.id} className="relative w-[103px] h-[103px]">
              <div className={`absolute w-[70px] h-[70px] border-[2.81px] border-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${selectedPlayer ? "opacity-0" : ""}`}></div>

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
                    className="small_stars animate__animated animate__zoomIn"
                  />
                )}
                {selectedPlayer?.showBigStar && (
                  <img
                    src={Glowing_Star_Image}
                    alt="Big Star"
                    className="big-star animate__animated animate__zoomIn"
                  />
                )}
              </div>
            </div>

            <p className="player-name text-shadow">{avatar.name}</p>
          </div>);
        })}
      </div>

      <div className={`flex justify-center items-center px-14 py-6 gap-5 player-selection-footer ${(scrollBarPosition === "bottom") ? "border-t-2 border-[#FFFFFF29]" : ""}`}>
        <button
          onClick={backToSplashScreen}
          className="player-selection-cancel-button"
        >
          {`Cancel`}
        </button>

        <button
          onClick={handleSubmit}
          disabled={selectedAvatars.length !== 2}
          className={`w-full flex items-center justify-center py-4 px-6 leading-[100%] tracking-[0%] text-center text-[#001848] font-bold text-[16px] uppercase transition-all transform bg-gradient-to-r from-[#D8B551] to-[#F0DB9E] ${selectedAvatars.length === 2 ? '' : 'opacity-[50%] cursor-not-allowed'}`}>
          {`Submit`}
        </button>
      </div>

    </div>
  );
}