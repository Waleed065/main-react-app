import React from "react";
import "./css/AboutUs.css";
import FooterContainer from "../components/FooterContainer";

const ourMission =
  // eslint-disable-next-line
  "Our mission is to create\
a world where anyone can belong\
anywhere and we are focused on\
creating an end-to-end travel\
platform that will handle every part\
of your trip. As we work to achieve\
this goal, we are focused on building for\
the future, driving strong\
sustained growth, and creating new\
businesses that will power long-term\
success. In 2018, we saw strong growth\
throughout our company: our core homes\
business enjoyed robust growth.\
\n\n At the same time, we put in place\
senior leaders who are focused on investing\
in growth and long-term profitability.";

const ourApproach =
  // eslint-disable-next-line
  "Airbnb and its hosts put the \
utmost focus on providing guests \
with as much information and \
personalisation as possible. This\
is built on delivering a constant\
and detailed stream of contact,\
and a large volume of great destination \
content. This helps guests to feel more \
comfortable and prepared for their stay.\
\nThe concept of a ‘home away from home’ \
doesn’t have to be restricted to the sharing\
economy however. You can afford guests\
the exact same quality of service at your\
hotel, by giving some extra attention to \
the way you communicate with them";

export default function AboutUs() {
  return (
    <>
    <div id={"aboutus-container"} className={'fade-in'}>


      <div className="aboutus-details-container">
        <span className={"aboutus-details"}>
          <h2>Our Vision</h2>
          <p>{ourMission}</p>
        </span>
        <img
          src="https://static-new.lhw.com/HotelImages/Final/LW1878/lw1878_94220234_720x450.jpg"
          alt="img"
        />
      </div>
      <div className="aboutus-details-container">
        <span className={"aboutus-details"}>
          <h2>Our Approach</h2>
          <p>{ourApproach}</p>
        </span>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Upper_Kachura_lakes_-_Skardu_city_-Gilgit-Baltistan_Pakistan.jpg"
          alt="img"
        />
      </div>

    </div>
    <FooterContainer />
    </>
  );
}
