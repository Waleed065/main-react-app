import React, { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { getAddOns } from "../../STORE/selectors";

import { addOnsForPostAd } from "../../types";
import AddOn from "./AddOn";

interface schema {
  addOns: addOnsForPostAd;

  setAddOns: (arg: any) => void;
}
const AddOnsForAd = ({ addOns, setAddOns }: schema) => {
  const allAddOns = useSelector(getAddOns);

  const setChecked = useCallback(
    ({ checked, title }: any) => {
      if (checked) {
        // Object.keys(prevState)
        //     .filter((key) => key !== title)
        //     .reduce((obj: any, key) => (obj[key] = addOns[key]), {})
        setAddOns((prevState: addOnsForPostAd) => {
          delete prevState[title];
          return {
            ...prevState,
          };
        });
      } else {
        setAddOns((prevState: addOnsForPostAd) => {
          return {
            ...prevState,
            [title]: {
              title,
              price: 0,
              about: "",
            },
          };
        });
      }
    },
    [setAddOns]
  );

  const onPriceChange = useCallback(
    ({ value, title }) => {
      setAddOns((prevState: addOnsForPostAd) => {
        return {
          ...prevState,
          [title]: {
            ...prevState[title],
            price: value,
          },
        };
      });
    },
    [setAddOns]
  );
  const onAboutChange = useCallback(
    ({ value, title }) => {
      setAddOns((prevState: addOnsForPostAd) => {
        return {
          ...prevState,
          [title]: {
            ...prevState[title],
            about: value,
          },
        };
      });
    },
    [setAddOns]
  );

  return (
    <div className={"postAdMain-form-field"}>
      <h3>Add Ons</h3>

      {allAddOns.map((title) => (
        <AddOn
          key={title}
          title={title}
          checked={addOns.hasOwnProperty(title)}
          setChecked={setChecked}
          onPriceChange={onPriceChange}
          onAboutChange={onAboutChange}
        />
      ))}
    </div>
  );
};

export default memo(AddOnsForAd);
