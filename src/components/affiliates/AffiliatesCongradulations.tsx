import React, { useState } from "react";
import "./css/AffiliatesCongradulations.css";
import { FaCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { stateTypes } from "../../types";
import { useEffect } from "react";
import { STORE } from "../../STORE";
import { Link } from "react-router-dom";
import { getIsAffiliate } from "../../STORE/selectors";
import {staticPaths} from '../../STORE/constants';


const {affiliatesDashboardPath} = staticPaths;


export default function AffiliatesCongradulations() {
  const { email } = useSelector((state: stateTypes) => state.userInfo);
  const [isAffiliate, setIsAffiliate] = useState(false);

  useEffect(() => {
    if (getIsAffiliate(STORE.getState())) {
      setIsAffiliate(true);
    }
  }, []);

  return (
    <div id="congradulations-container" className="fade-in">
      <FaCheckCircle size={50} color="green" />
      {!isAffiliate ? (
        <>
          <h3>Congradulations, you're almost ready to start earning!</h3>
          <p>
            Keep an eye on your inbox! We'll shortly be sending an email to{" "}
            <strong>{email}</strong> with instructions on how to start using
            your Vurtos.com Affiliate Partner Programme account.
          </p>
        </>
      ) : (
        <>
          <h3>🎉 You're already an affiliate!</h3>
          <p>
            We've opened an{" "}
            <Link
              style={{ textDecoration: "underline" }}
              to={affiliatesDashboardPath}
            >
              Affiliate Partner Dashboard
            </Link>{" "}
            for your account which you can use to manage your affiliate account.{" "}
            If you need help on how to manage your affiliate account, please
            watch this{" "}
            <a
              style={{ textDecoration: "underline" }}
              href="https://www.youtube.com/watch?v=sAr-e2cmLJ8"
              rel="noreferrer"
              target="_blank"
            >
              tutorial
            </a>{" "}
          </p>
        </>
      )}
    </div>
  );
}
