export interface Player {
  id: number;
  name: string;
  image: string;
}

export interface CameraProps {
  selectedAvatars: Player[];
  onCapture: (imageBlob: Blob) => void;
  onBack: () => void;
}