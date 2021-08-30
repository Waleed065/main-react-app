import React, { memo, useRef } from "react";
import "./css/ServicesFooter.css";
import ReactToPrint from "react-to-print";
import { FaCheckSquare } from "react-icons/fa";
import { FiScissors, FiPrinter } from "react-icons/fi";
import { useSelector } from "react-redux";
import { getTotalPrice } from "../../STORE/selectors";
import usePrepareLink from "../../utils/usePrepareLink";
import { useNavLinks } from "../../STORE/constants";
import { Link } from "react-router-dom";
import { stateTypes } from "../../types";
import PrintReceipt from "../invoice/PrintReceipt";

const ServicesFooter: React.FC = memo(() => {
  const totalPrice = useSelector(getTotalPrice);
  const { currencyCode, exchangeRate } = useSelector(
    (state: stateTypes) => state.currency
  );

  const printRef = useRef(null);

  // console.log(cart);
  return (
    <div>
      <div className={"total-container"}>
        <FiScissors className={"scissor"} />
        <h3 className={"heading"}>Grand Total</h3>
        <h3 className={"heading"}>
          {currencyCode} {(totalPrice * exchangeRate).toFixed(1)}
        </h3>
      </div>

      <div className={"servicesFooter"}>
        <ReactToPrint
          trigger={() => (
            <div className={"servicesFooterButtons printButton"}>
              <FiPrinter size={22} style={{ marginRight: "20px" }} />
              <p>Print</p>
            </div>
          )}
          content={() => printRef.current}
        />

        <BookNow />
      </div>

      <div style={{ display: "none", visibility: "hidden" }}>
        <PrintReceipt ref={printRef} />
      </div>
    </div>
  );
});

export default ServicesFooter;

function BookNow() {
  const cartLink = usePrepareLink(useNavLinks.cart);

  return (
    <Link to={cartLink} className={"servicesFooterButtons orderButton"}>
      <span className={"orderIcon"}>
        <FaCheckSquare size={22} />
      </span>
      <h3>Book Now</h3>
    </Link>
  );
}
