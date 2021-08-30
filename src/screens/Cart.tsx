import "./css/Cart.css";
import { Link, useHistory} from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";
import { FaCheckSquare } from "react-icons/fa";

import { useNavLinks } from "../STORE/constants";
import { useSelector } from "react-redux";
import { stateTypes } from "../types";
import { getTotalPrice } from "../STORE/selectors";
import CartSection from "../components/cart/CartSection";
import usePrepareLink from "../utils/usePrepareLink";

export default function Cart() {
  const history = useHistory();
  const { currencyCode, exchangeRate } = useSelector(
    (state: stateTypes) => state.currency
  );
  const totalPrice = useSelector(getTotalPrice);

  return (
    <div id={"cart-container"}>
      <div id={"orders-container"}>
        <div
          className={"cart-close-flex"}
          onClick={() =>  history.goBack()}
        >
          <span className={"cart-close-icon"}>
            <IoCloseOutline size={32} />
          </span>
        </div>
        <h1>Cart</h1>

        <div>
          <CartSection />
        </div>
      </div>
      <span id={"cart-footer"}>
        <h4 className={"heading"}>
          Total: {currencyCode}-{(totalPrice * exchangeRate).toFixed(1)}
        </h4>
        {!!totalPrice && <OrderButton />}
      </span>
    </div>
  );
}

function OrderButton() {
  const isLoggedIn = useSelector((state: stateTypes) => state.userInfo.isLoggedIn);

  const receiptLink = usePrepareLink(useNavLinks.receipt);
  const loginLink = usePrepareLink(useNavLinks.logIn);

  return (
    <Link
      id={"cart-orderButton"}
      className={"button"}
      to={isLoggedIn ? receiptLink : loginLink}
    >
      <span id={"cart-orderButton-icon"}>
        <FaCheckSquare size={22} />
      </span>
      <h3>ORDER</h3>
    </Link>
  );
}
