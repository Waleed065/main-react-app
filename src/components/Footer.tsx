import React from "react";
import "./css/Footer.css";
import { Link } from "react-router-dom";
import { useNavLinks } from "../STORE/constants";
import usePrepareLink from "../utils/usePrepareLink";
import { FaFacebookF, FaTwitter, FaInstagram, FaGoogle } from "react-icons/fa";
import {staticPaths} from '../STORE/constants';


const {homePath, affiliatesApplyPath, aboutPath, termsPath, affiliatesTermsPath} = staticPaths;


export default function Footer() {
  const contactUsLink = usePrepareLink(useNavLinks.contactUs);

  return (
    <div id={"footer"}>
      <div id={"footerContainerIcons"}>
        <FaFacebookF className={"footerIcons"} />
        <FaTwitter className={"footerIcons"} />
        <FaInstagram className={"footerIcons"} />
        <FaGoogle className={"footerIcons"} />
      </div>
      <div id={"footerContainer"}>
        <div id={"footerContainerLeftDiv"}>
          <Link to={homePath}>
            <label>Travel Pakistan</label>
          </Link>
          <label>+92 123456789</label>
          <label>St123 at 132 1235478 </label>
          <label>funkaarts@gmail.com</label>
        </div>

        <div id={"footerContainerRightDiv"}>
          <div id={"footerRightDetailsContainer"}>
            <div className={"footerRightDetails"}>
              <Link to={aboutPath}>
                <label>About US</label>
              </Link>
              <Link to={affiliatesApplyPath}>
                <label>Become Affiliate</label>
              </Link>
            </div>
            <div className={"footerRightDetails"}>
              <Link to={termsPath}>
                <label>Terms Of Service</label>
              </Link>
              <Link to={affiliatesTermsPath}>
                <label>Affiliate Terms</label>
              </Link>

            </div>
            <div className={"footerRightDetails"}>
              <Link to={contactUsLink}>
                <label>Contact Us</label>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
