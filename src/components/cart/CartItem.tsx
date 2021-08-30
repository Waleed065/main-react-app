import React from "react";
import "./css/CartItem.css";
import { IoCloseOutline } from "react-icons/io5";

import { Link } from "react-router-dom";
import { stateTypes, cartSchema, selectAddOnSingleType } from "../../types";
import { useSelector } from "react-redux";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
// import { updateCart } from "../../STORE/actions";
// import { fromDateSelect, toDateSelect } from "../../utils/date";

interface cartRoomItemSchema {
  categoryItem: cartSchema;
  onCancel?: () => void;
}

export default function CartItem({
  categoryItem,
  onCancel,
}: cartRoomItemSchema) {
  const {
    avatar,
    title,
    premium,
    price,
    startDate,
    endDate,
    countryId,
    cityId,
    serviceId,
    _id,
    categoryId,
    addOns,
  } = categoryItem;
  const { calendarHeadingOne = "Start Date", calendarHeadingTwo = "End Date"} = useSelector(
    (state: stateTypes) => state.headings[serviceId ?? '']?.headings ?? {}
  );
  const { currencyCode, exchangeRate } = useSelector(
    (state: stateTypes) => state.currency
  );
  // const dispatch = useDispatch();

  // const removeAddOn = (addOnTitle: string) => {
  //   dispatch(
  //     updateCart({
  //       ...categoryItem,
  //       addOns: addOns.filter((addOn) => addOn.title !== addOnTitle),
  //     })
  //   );
  // };

  return (
    <div className="cart-item-container">
      <div className={"cart-item"}>
        <img alt={"img"} className={"cart-img"} src={avatar} />

        <div className={"cart-room-title-container"}>
          <span className={"cart-rooms-prominant"}>
            <Link
              to={`/services/${serviceId}/${countryId}/${cityId}/${categoryId}/${_id}`}
            >
              {title}
            </Link>
            {premium && <h4 className={"premium"}>PREMIUM</h4>}
          </span>
          <span className={"cart-rooms-date-section"}>
            <span className={"cart-rooms-date"}>
              <span>{calendarHeadingOne}</span>
              <label>{startDate.toDateString()}</label>
            </span>
            <span className={"cart-rooms-date"}>
              <span>{calendarHeadingTwo}</span>
              <label>{endDate.toDateString()}</label>
            </span>
          </span>
        </div>

        <span className={"cart-rooms-last-section"}>
          <strong>
            {currencyCode}-{(price * exchangeRate).toFixed(1)}/night
          </strong>
          {Boolean(onCancel) && (
            <span onClick={onCancel}>
              <IoCloseOutline size={18} className={"cart-close-icon"} />
            </span>
          )}
          {/* <h3 className={"cart-normal-heading"}>{quantity}</h3> */}
        </span>
      </div>
      {Boolean(addOns?.length) && (
        <TableContainer>
          <Table>
            <tbody>
              <TableRow>
                <TableCell style={{ padding: 0, border: "none" }}>
                  <Box>
                    <h3>Add Ons</h3>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Type</TableCell>
                          <TableCell align="right">Quantity</TableCell>
                          <TableCell align="right">Price</TableCell>
                          {/* <TableCell /> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {addOns.map(
                          (addOn: selectAddOnSingleType, index: number) => (
                            <TableRow key={index}>
                              <TableCell scope="row">{addOn.title}</TableCell>
                              <TableCell align="right">
                                {addOn.quantity}
                              </TableCell>
                              <TableCell align="right">{addOn.price}</TableCell>
                              {/* <TableCell align="right">
                                <span
                                  className={"button"}
                                  onClick={() => removeAddOn(addOn.title)}
                                >
                                  <IoCloseOutline
                                    size={18}
                                    className={"cart-close-icon"}
                                  />
                                </span>
                              </TableCell> */}
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </Box>
                </TableCell>
              </TableRow>
            </tbody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
