import React from "react";
import { useSelector } from "react-redux";
import { logo } from "../../STORE/constants";
import { stateTypes } from "../../types";

export default function Headings() {
  const userInfo = useSelector((state: stateTypes) => state.userInfo);
  return (
    <>
      <div
        style={{
          marginTop: 80,
          backgroundColor: "#c4a459",
          color: "#fff",
          height: 80,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          marginBottom: 10,
        }}
      >
        <h1 style={{marginRight: 10}}>Vurtos.com</h1>
        <h1>INVOICE</h1>
      </div>


      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 20,
        }}
      >
        <span
          style={{
            backgroundColor: "var(--primaryThemeColor)",
            borderRadius: 100,
            height: 100,
            width: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={logo} alt="vurtos" width={80} height={25} />
        </span>
      </div>

      <div
        style={{
          marginLeft: 15,
          marginRight: 15,
          marginBottom: 20,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            marginBottom: 10,
          }}
        >
          <strong>Email:</strong>
          <label style={{ marginLeft: 5 }}>
            {userInfo.email ?? "Not Mentioned"}
          </label>
        </div>
        <div
          style={{
            display: "inline-flex",
            marginBottom: 10,
          }}
        >
          <strong>Contact:</strong>
          <label style={{ marginLeft: 5 }}>
            {userInfo.phoneNumber ?? "Not Mentioned"}
          </label>
        </div>
        <div
          style={{
            display: "inline-flex",
            marginBottom: 10,
          }}
        >
          <strong>Dated: </strong>
          <label style={{ marginLeft: 5 }}>
            {new Date().toLocaleDateString()}
          </label>
        </div>
      </div>
    </>
  );
}
