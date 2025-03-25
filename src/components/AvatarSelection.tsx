import React from 'react';
import { Player } from '../types';
import { players } from '../data/players';

interface AvatarSelectionProps {
  onAvatarsSelected: (avatars: Player[]) => void;
}

export function AvatarSelection({ onAvatarsSelected }: AvatarSelectionProps) {
  const [selectedAvatars, setSelectedAvatars] = React.useState<Player[]>([]);

  const toggleAvatar = (avatar: Player) => {
    if (selectedAvatars.find(a => a.id === avatar.id)) {
      setSelectedAvatars(selectedAvatars.filter(a => a.id !== avatar.id));
    } else if (selectedAvatars.length < 2) {
      setSelectedAvatars([...selectedAvatars, avatar]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#006CB7] to-[#013B7A] py-5 px-7">
      <div className="">
        <div className="flex flex-col justify-center items-center gap-3 mb-[22px]">
          <h3 className="text-[21px] font-extrabold leading-[100%] tracking-[5%] text-center text-white text-shadow">SELECT</h3>
          <h1 className="text-[36px] font-medium leading-[100%] tracking-[5%] text-center text-white text-shadow">TWO PLAYERS</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {players.map(avatar => (
            <div
              key={avatar.id}
              onClick={() => toggleAvatar(avatar)}
              className={`flex flex-col items-center cursor-pointer ${selectedAvatars.length >= 2 && !selectedAvatars.find(a => a.id === avatar.id)
                ? 'opacity-50 cursor-not-allowed'
                : ''
                }`}
            >
              <div className={`relative w-32 h-32 mb-3 ${selectedAvatars.find(a => a.id === avatar.id)
                ? 'bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,#FFFFFF_100%)]'
                : 'bg-[linear-gradient(180deg,rgba(0,59,122,0)_0%,#003B7A_100%)]'
                }`}>
                <img
                  src={avatar.image}
                  alt={avatar.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-white text-[12px] font-medium leading-[100%] tracking-[0%] text-center text-shadow">{avatar.name}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => onAvatarsSelected(selectedAvatars)}
          disabled={selectedAvatars.length !== 2}
          className={`w-full flex items-center justify-center py-4 px-6 leading-[100%] tracking-[0%] text-center text-[#001848] font-bold text-[16px] uppercase transition-all transform hover:scale-105 ${selectedAvatars.length === 2
            ? 'bg-gradient-to-r from-[#D8B551] to-[#F0DB9E]'
            : 'bg-gray-300 cursor-not-allowed'
            }`}
        >
          {`TAKE SELFiE`}
        </button>
      </div>
    </div>
  );
}