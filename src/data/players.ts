import { Player } from "../types";

// Hardik Pandya
import Hardik_Pandya_Default_Pose_Image from "../assets/images/Player_Poses/Hardik/Hardik_default.png";
import Hardik_Pandya_Selected_Pose_Image from "../assets/images/Player_Poses/Hardik/Hardik_selected.png";

// Rohit Sharma
import Rohit_Sharma from "../assets/players/rohit_sharma.png";
import Rohit_Default_Pose_Image from "../assets/images/Player_Poses/Rohit/Rohit_default.png";
import Rohit_Selected_Pose_Image from "../assets/images/Player_Poses/Rohit/Rohit_selected.png";
import Rohit_Right_Position_Image_Last_Frame from "../assets/images/right_side_rohit_last_frame.png";

// Jasprit Bumrah
import Jasprit_Bumrah from "../assets/players/jasprit_bumrah.png";
import Jaspreet_Left_Position_Image_Last_Frame from "../assets/images/left_side_jaspret_last_frame.png";
import Jasprit_Bumrah_Default_Pose_Image from "../assets/images/Player_Poses/Bumrah/Bumrah_default.png";
import Jasprit_Bumrah_Selected_Pose_Image from "../assets/images/Player_Poses/Bumrah/Bumrah_selected.png";

// Suryakumar Yadav
import Suryakumar_Yadav_Default_Pose_Image from "../assets/images/Player_Poses/Suryakumar/Surya_default.png";
import Suryakumar_Yadav_Selected_Pose_Image from "../assets/images/Player_Poses/Suryakumar/Surya_selected.png";

// Tilak Varma
import Tilak_Varma_Default_Pose_Image from "../assets/images/Player_Poses/Tilak_Verma/Tilak_default.png";
import Tilak_Varma_Selected_Pose_Image from "../assets/images/Player_Poses/Tilak_Verma/Tilak_selected.png";

// Trent Boult
import Trent_Boult_Default_Pose_Image from "../assets/images/Player_Poses/Trent_Boult/Trent_default.png";
import Trent_Boult_Selected_Pose_Image from "../assets/images/Player_Poses/Trent_Boult/Trent_selected.png";

// Deepak Chahar
import Deepak_Chahar_Default_Pose_Image from "../assets/images/Player_Poses/Deepak_Chahar/Deepak_default.png.png";
import Deepak_Chahar_Selected_Pose_Image from "../assets/images/Player_Poses/Deepak_Chahar/Deepak_selected.png";

// Will Jacks
import Will_Jacks_Default_Pose_Image from "../assets/images/Player_Poses/Will_Jacks/Will_default.png";
import Will_Jacks_Selected_Pose_Image from "../assets/images/Player_Poses/Will_Jacks/Will_selected.png";

// Naman Dhir
import Naman_Dhir_Default_Pose_Image from "../assets/images/Player_Poses/Naman_Dihr/Naman_default.png";
import Naman_Dhir_Selected_Pose_Image from "../assets/images/Player_Poses/Naman_Dihr/Naman_selected.png";

// Bevon John Jacobs
import Bevon_John_Jacobs_Default_Pose_Image from "../assets/images/Player_Poses/Bevon_Jacobs/Bevon_default.png";
import Bevon_John_Jacobs_Selected_Pose_Image from "../assets/images/Player_Poses/Bevon_Jacobs/Bevon_selected.png";

export const players: Player[] = [
  {
    id: 1,
    name: "Hardik Pandya",
    image: "https://www.mumbaiindians.com/static-assets/images/players/large/63751.png",
    default_pose_image: Hardik_Pandya_Default_Pose_Image,
    selected_pose_image: Hardik_Pandya_Selected_Pose_Image,
    right_image: "",
    left_image: ""
  },
  {
    id: 2,
    name: "Rohit Sharma",
    image: Rohit_Sharma,
    default_pose_image: Rohit_Default_Pose_Image,
    selected_pose_image: Rohit_Selected_Pose_Image,
    right_image: Rohit_Right_Position_Image_Last_Frame,
    left_image: ""
  },
  {
    id: 3,
    name: "Jasprit Bumrah",
    image: Jasprit_Bumrah,
    default_pose_image: Jasprit_Bumrah_Default_Pose_Image,
    selected_pose_image: Jasprit_Bumrah_Selected_Pose_Image,
    right_image: "",
    left_image: Jaspreet_Left_Position_Image_Last_Frame
  },
  {
    id: 4,
    name: "Suryakumar Yadav",
    image: "https://www.mumbaiindians.com/static-assets/images/players/large/11803.png",
    default_pose_image: Suryakumar_Yadav_Default_Pose_Image,
    selected_pose_image: Suryakumar_Yadav_Selected_Pose_Image,
    right_image: "",
    left_image: ""
  },
  {
    id: 5,
    name: "Tilak Varma",
    image: "https://www.mumbaiindians.com/static-assets/images/players/large/70761.png",
    default_pose_image: Tilak_Varma_Default_Pose_Image,
    selected_pose_image: Tilak_Varma_Selected_Pose_Image,
    right_image: "",
    left_image: ""
  },
  {
    id: 6,
    name: "Trent Boult",
    image: "https://www.mumbaiindians.com/static-assets/images/players/large/4338.png",
    default_pose_image: Trent_Boult_Default_Pose_Image,
    selected_pose_image: Trent_Boult_Selected_Pose_Image,
    right_image: "",
    left_image: ""
  },
  {
    id: 7,
    name: "Deepak Chahar",
    image: "https://www.mumbaiindians.com/static-assets/images/players/large/59547.png",
    default_pose_image: Deepak_Chahar_Default_Pose_Image,
    selected_pose_image: Deepak_Chahar_Selected_Pose_Image,
    right_image: "",
    left_image: ""
  },
  {
    id: 8,
    name: "Will Jacks",
    image: "https://www.mumbaiindians.com/static-assets/images/players/large/66927.png",
    default_pose_image: Will_Jacks_Default_Pose_Image,
    selected_pose_image: Will_Jacks_Selected_Pose_Image,
    right_image: "",
    left_image: ""
  },
  {
    id: 9,
    name: "Naman Dhir",
    image: "https://www.mumbaiindians.com/static-assets/images/players/large/100353.png",
    default_pose_image: Naman_Dhir_Default_Pose_Image,
    selected_pose_image: Naman_Dhir_Selected_Pose_Image,
    right_image: "",
    left_image: ""
  },
  {
    id: 10,
    name: "Bevon John Jacobs",
    image: "https://www.mumbaiindians.com/static-assets/images/players/large/115918.png",
    default_pose_image: Bevon_John_Jacobs_Default_Pose_Image,
    selected_pose_image: Bevon_John_Jacobs_Selected_Pose_Image,
    right_image: "",
    left_image: ""
  }
];