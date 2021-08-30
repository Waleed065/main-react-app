import React, { useState } from "react";

import { stateTypes } from "../../types";
import Items, { ItemsSkeleton } from "./Items";
import { useSelector } from "react-redux";
import { getServicesItems, isAddedToCart } from "../../STORE/selectors";

const ItemsContainer = () => {
  const favorityIds = useSelector(
    (state: stateTypes) => state.userInfo.favorites
  );
  const cart = useSelector((state: stateTypes) => state.cart);
  const servicesItems = useSelector(getServicesItems)?.servicesItems ?? [];
  const loading = useSelector((state: stateTypes) => state.servicesLoading);

  const [activeAccordian, setActiveAccordian] = useState("");

  
  return (
    <div>
      {Boolean(servicesItems.length)
        ? servicesItems.map((itemObj) => {
            const { serviceId, categoryId, countryId, cityId, _id } = itemObj;
            const isAdded = isAddedToCart({
              cart,
              countryId,
              cityId,
              serviceId,
              _id,
              categoryId,
            });

            return (
              <Items
                key={_id}
                setActiveAccordian={setActiveAccordian}
                categoryItem={itemObj}
                isActive={activeAccordian === categoryId + _id}
                isFavorite={favorityIds?.indexOf(_id) > -1}
                isAdded={isAdded}
              />
            );
          })
        : loading && <ItemsSkeleton />}
    </div>
  );
};
export default ItemsContainer;
