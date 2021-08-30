import React, { useState } from "react";
import "./css/Receipt.css";

import { BsFillPersonFill } from "react-icons/bs";
import { BiCalendarExclamation } from "react-icons/bi";
import { CgPassword } from "react-icons/cg";
import { AiFillCreditCard, AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { postOrders } from "../STORE/actions";
import PaymentOptions from "../components/PaymentOptions";
import { stateTypes } from "../types";
import { getTotalPrice } from "../STORE/selectors";
import ActivityIndicator from "../components/ActivityIndicator";
import { Link } from "react-router-dom";
import { useNavLinks } from "../STORE/constants";
import usePrepareLink from "../utils/usePrepareLink";

// import { fromDateSelect, toDateSelect } from "../utils/date";

// import {useSelector} from 'react-redux';
// import {stateTypes} from '../types';

export default function Receipt() {
  const { currencyCode, exchangeRate } = useSelector(
    (state: stateTypes) => state.currency
  );
  const isLoggedIn = useSelector((state: stateTypes) => state.userInfo.isLoggedIn);
  const totalPrice = useSelector(getTotalPrice);
  const dispatch = useDispatch();

  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [cardNumberError, setCardNumberError] = useState<boolean>(false);
  const [cardHolderError, setCardHolderError] = useState<boolean>(false);
  const [expiryError, setExpiryError] = useState<boolean>(false);
  const [cvcError, setCvcError] = useState<boolean>(false);

  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardHolder, setCardHolder] = useState<string>("");
  const [expiry, setExpiry] = useState<string>("");
  const [cvc, setCvc] = useState<string>("");

  const [currentCard, setCurrentCard] = useState<string>("");

  const cartLink = usePrepareLink(useNavLinks.cart);

  const renderCheckOut = () => {
    if (!isLoggedIn || !totalPrice) return;
    let error = false;

    if (cardNumber.length !== 12) {
      setCardNumberError(true);
      error = true;
    } else setCardNumberError(false);

    if (cardHolder.length < 1) {
      setCardHolderError(true);
      error = true;
    } else setCardHolderError(false);

    if (expiry.length !== 5 || !expiry.includes("/")) {
      setExpiryError(true);
      error = true;
    } else setExpiryError(false);

    if (cvc.length !== 3) {
      setCvcError(true);
      error = true;
    } else setCvcError(false);

    if (error) return;

    setLoading(true);
    dispatch(
      postOrders({
        Then: () => {
          setLoading(false);
          setSuccess(true);
        },
        Catch: () => setLoading(false),
        InvalidRequest: () => setLoading(false),
      })
    );
  };

  return (
    <>
      <ActivityIndicator loading={loading} />
        {success && (
          <div style={{ display: "flex" }} className={"global-override"}>
            <h2 id={"success"}>🎉 Success. Your Order Has Been Recieved. 🎉</h2>
          </div>
        )}

      <div id={"receipt"}>
        <div id={"receipt-container"}>
          <PaymentOptions
            currentTab={currentCard}
            setCurrentTab={setCurrentCard}
          />

          <div id={"receipt-weed-container"}>
            <h1>{currentCard}</h1>
          </div>
        </div>

        <div id={"receipt-main"}>
          <div className={"receipt-form"}>
            <span className={"recipt-form-heading-container"}>
              <span>
                <AiFillCreditCard />
              </span>
              <h3 style={{ color: cardNumberError ? "red" : "black" }}>
                Card Number
              </h3>
            </span>
            <input
              type="text"
              maxLength={12}
              placeholder={"xxxx xxxx xxxx xxxx"}
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              autoComplete={"off"}
            />
          </div>
          <div className={"receipt-form"}>
            <span className={"recipt-form-heading-container"}>
              <span>
                <BsFillPersonFill />
              </span>
              <h3 style={{ color: cardHolderError ? "red" : "black" }}>
                Card Holder
              </h3>
            </span>
            <input
              type="text"
              placeholder={"Name"}
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value)}
              autoComplete={"off"}
            />
          </div>

          <div className={"receipt-flex"}>
            <div className={"receipt-form"}>
              <span className={"recipt-form-heading-container"}>
                <span>
                  <BiCalendarExclamation />
                </span>
                <h3 style={{ color: expiryError ? "red" : "black" }}>
                  Expires
                </h3>
              </span>
              <input
                type="text"
                maxLength={5}
                placeholder={"MM/YY"}
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                autoComplete={"off"}
              />
            </div>
            <div className={"receipt-form"}>
              <span className={"recipt-form-heading-container"}>
                <span>
                  <CgPassword />
                </span>
                <h3 style={{ color: cvcError ? "red" : "black" }}>CVC</h3>
              </span>
              <input
                type="text"
                maxLength={3}
                placeholder={"***"}
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                autoComplete={"off"}
              />
            </div>
          </div>
          <div id={"receipt-total-container"} className={"receipt-flex"}>
            <h2>Total</h2>
            <h3>
              {currencyCode} {(totalPrice * exchangeRate).toFixed(1)}
            </h3>
          </div>
          <div id={"receipt-buttons-container"}>
            <Link id={"print-button"} className={"button"} to={cartLink}>
              <AiOutlineShoppingCart />

              <span>Review</span>
            </Link>
            <span className={"checkOut-button button"} onClick={renderCheckOut}>
              CheckOut
            </span>
          </div>
        </div>
      </div>
      <div id={"saw-tooth"} />
    </>
  );
}
