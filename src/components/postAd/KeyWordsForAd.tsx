import React, { memo } from "react";
import "./css/KeyWordsForAd.css";

interface schema {
  setKeywords: (arg: any) => void;
}

const KeyWordsForAd = ({ setKeywords }: schema) => {
  const onChange = ({ keyword, value }: any) => {
    setKeywords((prevState: any) => {
      return {
        ...prevState,
        [keyword]: value,
      };
    });
  };

  return (
    <div className={"postAdMain-form-field"} style={{ marginTop: 15 }}>
      <h3>Specify Up To 5 Key Words</h3>
      <div className={"keywords-container-flex"}>
        <input
          type="text"
          placeholder={"..."}
          onChange={(e) => onChange({ keyword: "one", value: e.target.value })}
          className="form-input"
          maxLength={15}
        />
        <input
          type="text"
          placeholder={"..."}
          onChange={(e) => onChange({ keyword: "two", value: e.target.value })}
          className="form-input"
          maxLength={15}
        />
        <input
          type="text"
          placeholder={"..."}
          onChange={(e) =>
            onChange({ keyword: "three", value: e.target.value })
          }
          className="form-input"
          maxLength={15}
        />
        <input
          type="text"
          placeholder={"..."}
          onChange={(e) => onChange({ keyword: "four", value: e.target.value })}
          className="form-input"
          maxLength={15}
        />
        <input
          type="text"
          placeholder={"..."}
          onChange={(e) => onChange({ keyword: "five", value: e.target.value })}
          className="form-input"
          maxLength={15}
        />
      </div>
    </div>
  );
};

export default memo(KeyWordsForAd);
