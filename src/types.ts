export interface Player {
  id: number;
  name: string;
  image: string;
  left_image?: string;
  left_image_last_frame?: string;
  right_image?: string;
  right_image_last_frame?: string;
}

export interface CameraProps {
  selectedAvatars: Player[];
  onCapture: (imageBlob: string) => void;
  onBack: () => void;
}