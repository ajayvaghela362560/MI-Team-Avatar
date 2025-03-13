import React from 'react';
import { Ticket as Cricket } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-8">
            <Cricket className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
              Choose Mumbai Indians Players
            </h1>
          </div>

          <p className="text-gray-600 mb-6 text-lg">
            Select 2 players to appear in your selfie
            <span className="text-sm ml-2 text-blue-600">
              ({selectedAvatars.length}/2 selected)
            </span>
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {players.map(avatar => (
              <div
                key={avatar.id}
                onClick={() => toggleAvatar(avatar)}
                className={`flex flex-col items-center cursor-pointer transition-all transform hover:scale-105 ${selectedAvatars.length >= 2 && !selectedAvatars.find(a => a.id === avatar.id)
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
                  }`}
              >
                <div className={`relative w-32 h-32 rounded-full overflow-hidden mb-3 ${selectedAvatars.find(a => a.id === avatar.id)
                  ? 'ring-4 ring-blue-500'
                  : 'ring-2 ring-gray-200'
                  }`}>
                  <img
                    src={avatar.image}
                    alt={avatar.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-center font-medium text-gray-800">{avatar.name}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => onAvatarsSelected(selectedAvatars)}
            disabled={selectedAvatars.length !== 2}
            className={`w-full flex items-center justify-center gap-3 rounded-xl py-4 px-6 text-white font-medium text-lg transition-all transform hover:scale-102 ${selectedAvatars.length === 2
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg'
              : 'bg-gray-300 cursor-not-allowed'
              }`}
          >
            <Cricket className="w-6 h-6" />
            Take Selfie with MI Players
          </button>
        </div>
      </div>
    </div>
  );
}