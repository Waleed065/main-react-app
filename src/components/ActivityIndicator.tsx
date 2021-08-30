import React, { memo } from "react";
import { PulseLoader } from "react-spinners";

interface schema {
  loading: boolean;
}
const ActivityIndicator = ({ loading }: schema) => {

  return (
    <div
      style={{ display: loading ? "flex" : "none" }}
      className={"global-override"}
    >
      <PulseLoader
        size={50}
        color={"var(--primaryThemeColor)"}
        loading={loading}
      />
    </div>
  );
}

export default memo(ActivityIndicator);