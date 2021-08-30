import React from "react";
import { MdChevronRight } from "react-icons/md";
import { allAmenities } from "../../utils/allAmenities";
import { IconContext } from "react-icons";
import { itemType } from "../../types";
import { Link } from "react-router-dom";
import {staticPaths} from '../../STORE/constants';


const {itemsPath} = staticPaths;

interface schema {
  similarItem: itemType;
}
export default function SimilarItems({ similarItem }: schema) {
  const {
    title,
    premium,
    price,
    amenities,
    countryId,
    cityId,
    serviceId,
    categoryId,

  } = similarItem;

  const myAmenities = () => {
    return amenities.slice(0, 3)
  };

  return (
    <IconContext.Provider
      value={{ size: "22px", color: "var(--primaryThemeColor)" }}
    >
      <div className={"similarItems-item"}>
        <img
          alt={"#"}
          src="https://cdn.home-designing.com/wp-content/uploads/2015/05/huge-bedroom-design.png"
        />
        <div className={"similarItems-item-flex-box"}>
          <div className={"similarItems-title-boss"}>
            <div className={"similarItems-title-container"}>
              <Link
                to={`${itemsPath}/${categoryId}?service=${serviceId}&country=${countryId}&city=${cityId}/`}
              >
                {title}
              </Link>
              {premium && <span className={"premium"}>PREMIUM</span>}
            </div>
            <label>USD$ {price}/night</label>
          </div>

          <div className={"similarItems-item-details"}>
            {myAmenities().map((amenity) => {
              const details = allAmenities[amenity];
              if (details) {
                const { icon, title } = details;
                return (
                  <span
                    key={amenity}
                    className={"similarItems-item-details-coin"}
                  >
                    <span>{icon}</span>
                    <label className={"smallFont"}>{title}</label>
                  </span>
                );
              } else return null;
            })}
          </div>

          <Link
            className={"similarItems-item-details-coin"}
            style={{ marginTop: 5 }}
            to={`${itemsPath}/${categoryId}?service=${serviceId}&country=${countryId}&city=${cityId}/`}
            >
            <label className={"smallFont themeColor"}>More Details</label>
            <MdChevronRight />
          </Link>
        </div>
      </div>
    </IconContext.Provider>
  );
}
