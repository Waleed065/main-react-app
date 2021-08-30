import { IconBaseProps } from "react-icons";
import { MdPets, MdSecurity } from "react-icons/md";
import {
  FaSnowflake,
  FaSpa,
  FaAccessibleIcon,
  FaParking,
} from "react-icons/fa";

import {
  BsDisplay,
  BsFillPersonCheckFill,
  BsCollectionPlayFill,
  BsDisplayFill,
  BsBatteryCharging,
  BsClockHistory,
} from "react-icons/bs";
import { RiSoundModuleLine } from "react-icons/ri";
import {
  GiDrinkMe,
  GiCrossedPistols,
  GiCarDoor,
  GiSupersonicBullet,
  GiKitchenScale,
} from "react-icons/gi";
import { BiRestaurant, BiFirstAid } from "react-icons/bi";
import {
  AiOutlineWifi,
  AiOutlineFileProtect,
  AiTwotoneVideoCamera,
  AiFillSafetyCertificate,
  AiFillDollarCircle,
} from "react-icons/ai";
import { IoMan } from "react-icons/io5";

type schema = {
  [key : string]: {
    [key: string]: {
      icon: IconBaseProps;
      title: string;
      details: string;
    };
  };
}

export const allAmenities: schema = {
  hotels: {
    airConditioning: {
      icon: <FaSnowflake />,
      title: "Air-Conditioned",
      details:
        "Air conditioning [climate-controlled]\nBlackout drapes/curtains\nFree cribs/infant beds\nLinens\nPillow-top-mattress\nPremium bedding\nRollaway/extra beds(surcharge)",
    },
    wifi: {
      icon: <AiOutlineWifi />,
      title: "Wifi",
      details:
        "Available in all rooms. Wifi ($5.02 per night) Available in some public areas: internet access.",
    },
    petFriendly: {
      icon: <MdPets />,
      title: "Pet-Friendly",
      details:
        "Pets are allowed for an extra charge of $175 per night. Dogs only. 2 per room(up to 100lbs)",
    },
    spa: {
      icon: <FaSpa />,
      title: "Spa",
      details:
        "Aromatherapy\nBody scrubs\nBody treatments\nBody wraps\nFacials\nManicures and pedicures\nMassage - deep-tissue\nMassage - hot stone\nMassage - prenatal\nMassage - sports\nMassage - Swedish\nMassage - Thai\nReflexology1nSpa open daily",
    },
    foodAndBeverages: {
      icon: <BiRestaurant />,
      title: "Food & Beverages",
      details:
        "Cooked-to-order breakfast available for a fee daily 6:00 AM-11:00 AM: $30-$55 for adults and $15-$35 for children\n11 resturants and 2 coffee shops\n5 bars/lounges and 1 poolside bar\n24-hour room service",
    },
    kitchen: {
      icon: <GiKitchenScale />,
      title: "Kitchen",
      details: "",
    },
    accessibility: {
      icon: <FaAccessibleIcon />,
      title: "accessibility",
      details:
        "If you have requests for specific accessibility needs, please contact the property using the information on the reservation confirmation received after booking.\nAccessible bathroom\nAssistive listening devices available\nBraille signage\nIn-room-accessibility\nRoll-in shower\nWell-lit path to entrance\nWheelchair-accessible business center\nWheelchair-accessable parking\nWheelChair-accessable path of travel\nWheelChair-accessible path to elevator\nWheelChair-accessible public washroom\nWheelChair-accessible restaurant",
    },
    conveniences: {
      icon: <BsClockHistory />,
      title: "Conveniences",
      details:
        "ATM/banking services\nBallroom\nBanquet hall\nElevator\nGift shop/newsstand\nNewspapers in lobby",
    },
    entertainment: {
      icon: <BsCollectionPlayFill />,
      title: "Entertainment",
      details: "",
    },
    parking: {
      icon: <FaParking />,
      title: "Parking",
      details:
        "Free covered self parking on site. Onsite parking is wheelchair accessible. Height restrictions apply for onsite parking.",
    },
  },
  cars: {
    airConditioning: {
      icon: <FaSnowflake />,
      title: "Air-Conditioned",
      details:
        "Air conditioning [climate-controlled]\nBlackout drapes/curtains\nFree cribs/infant beds\nLinens\nPillow-top-mattress\nPremium bedding\nRollaway/extra beds(surcharge)",
    },
    driver: {
      icon: <BsFillPersonCheckFill />,
      title: "Driver",
      details: "",
    },
    wifi: {
      icon: <AiOutlineWifi />,
      title: "Wifi",
      details:
        "Available in all rooms. Wifi ($5.02 per night) Available in some public areas: internet access.",
    },
    frontTelevision: {
      icon: <BsDisplay />,
      title: "Front-TV",
      details: "",
    },
    rearTelevision: {
      icon: <BsDisplayFill />,
      title: "Rear-TV",
      details: "",
    },
    soundSystem: {
      icon: <RiSoundModuleLine />,
      title: "Sound-System",
      details: "",
    },
    drinks: {
      icon: <GiDrinkMe />,
      title: "Drinks",
      details: "",
    },
    tintedWindows: {
      icon: <GiCarDoor />,
      title: "Tinted-Windows",
      details: "",
    },
    bulletProof: {
      icon: <GiSupersonicBullet />,
      title: "Bullet-Proof",
      details: "",
    },
    usbCharging: {
      icon: <BsBatteryCharging />,
      title: "USB-Charging",
      details: "",
    },
  },
  security: {
    trained: {
      icon: <MdSecurity />,
      title: "Trained",
      details: "",
    },
    armed: {
      icon: <GiCrossedPistols />,
      title: "Armend",
      details: "",
    },
    insurance: {
      icon: <AiOutlineFileProtect />,
      title: "Insurance",
      details: "",
    },
    lowRates: {
      icon: <AiFillDollarCircle />,
      title: "Low-Rates",
      details: "",
    },
    safety: {
      icon: <AiFillSafetyCertificate />,
      title: "Safety",
      details: "",
    },
    monitoring: {
      icon: <AiTwotoneVideoCamera />,
      title: "Monitoring",
      details: "",
    },
    firstAid: {
      icon: <BiFirstAid />,
      title: "First-Aid",
      details: "",
    },
    mannered: {
      icon: <IoMan />,
      title: "Well-Behaved",
      details: "",
    },
  },
};
