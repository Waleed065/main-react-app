import React, { useEffect, useState } from "react";
import "./css/Log.css";
import { IoIosArrowRoundBack } from "react-icons/io";

import ActivityIndicator from "../ActivityIndicator";
import LogInOptions from "./LogInOptions";
import LogInByNumber from "./LogInByNumber";

export default function LogIn() {
  const [loading, setLoading] = useState(false);

  const [numberLogIn, setNumberLogIn] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={"log-container"}>
      <ActivityIndicator loading={loading} />

      <div id={"log-image-container"}>
        <img
          src="https://i.pinimg.com/originals/8f/26/6d/8f266d1e455ca21055247f7a3304fdb2.jpg"
          alt="img"
        />
        {numberLogIn && (
          <span
            id={"log-back-button"}
            className={"button"}
            onClick={() => setNumberLogIn(false)}
          >
            <IoIosArrowRoundBack color={"gray"} size={30} />
          </span>
        )}
      </div>
      {!numberLogIn ? (
        <LogInOptions setNumberLogIn={setNumberLogIn} setLoading={setLoading} />
      ) : (
        <LogInByNumber setLoading={setLoading} loading={loading} />
      )}
    </div>
  );
}