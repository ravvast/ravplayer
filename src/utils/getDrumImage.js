import Drum9 from "assets/drum9.png";
import Drum9P from "assets/drum9P.svg";
import Drum10 from "assets/drum10.png";
import Drum11 from "assets/drum11.svg";
import Drum12 from "assets/drum12.svg";
import Drum13 from "assets/drum13.svg";
import Drum14 from "assets/drum14.png";
import Drum15 from "assets/drum15.png";

const drumImageMap = {
  9: Drum9,
  "9P": Drum9P,
  10: Drum10,
  12: Drum12,
  13: Drum13,
  14: Drum14,
  15: Drum15,
};

export const getDrumImage = type => drumImageMap[type] || Drum11;
