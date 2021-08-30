import React, { useState, useEffect } from "react";
import "./css/Similar.css";
import { v4 as uuid } from "uuid";

import SimilarItems from "./SimilarItems";
import { useSelector } from "react-redux";
import { getServicesItems } from "../../STORE/selectors";
// import { stateTypes } from "../../types";
// import {useParams} from 'react-router-dom';

interface schema {
  _id: string;
}
function Similar({ _id }: schema) {
  // const {categoryParam} = useParams<any>()
  const servicesItems = useSelector(getServicesItems);
  const [moreItems, setMoreItems] = useState<any[]>([]);

  const condition =
    (servicesItems && !servicesItems.servicesItems.length) || !servicesItems;

  useEffect(() => {
    if (condition) return;

    const newItems =
      servicesItems?.servicesItems.filter((itemObj) => itemObj._id !== _id) ??
      [];
    const itemsLength = newItems.length;
    if (itemsLength) {
      setMoreItems([]);
      const times = Math.floor(10 * Math.random() + 100 + itemsLength);
      for (let i = 0; i < times; i++) {
        const num1 = Math.floor(itemsLength * Math.random());
        const num2 = Math.floor(itemsLength * Math.random());

        const temp = newItems[num1];
        newItems[num1] = newItems[num2];
        newItems[num2] = temp;
      }

      newItems.slice(0, 5).forEach((itemObj) => {
        setMoreItems((prevItems: any) => [...prevItems, itemObj]);
      });
    }
  }, [condition, _id, servicesItems]);

  return (
    <div id={"similar-container"} className={"ourServices-paddingHorizontal"}>
      <div>
        {moreItems.map((_id) => (
          <SimilarItems similarItem={_id} key={uuid()} />
        ))}
      </div>
    </div>
  );
}

export default Similar;
