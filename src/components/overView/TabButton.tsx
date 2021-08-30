import React, { forwardRef, memo } from "react";

type PropsType = {
  tabValue: string;
  isActive: boolean;
  onClick: (arg: string) => void;
};

type refType = HTMLSpanElement | null;

const TabButton = forwardRef<refType, PropsType>((props, ref) => {
  const { tabValue, isActive, onClick } = props;
  return (
    <span
      ref={ref}
      title={tabValue}
      className={`tab-buttons no-select ${
        isActive ? "active-tab-button" : "inactive-tab-button"
      }`}
      onClick={() => onClick(tabValue)}
    >
      {tabValue}
    </span>
  );
});

export default memo(TabButton);
