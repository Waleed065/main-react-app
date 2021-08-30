import React, { useState } from "react";
import { AiFillReconciliation } from "react-icons/ai";
import { MdAttachment } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setServiceId } from "../STORE/actions";
import { tabs } from "../STORE/constants";
import { stateTypes } from "../types";
import formattedTitle from "../utils/formattedTitle";
import SearchOptions from "./SearchOptions";

const tabOptions = tabs.map((tab) => formattedTitle(tab));

export default function Service(): JSX.Element {
  const activeTab = useSelector((state: stateTypes) => state.serviceId);
  const dispatch = useDispatch();
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <SearchOptions
      title={formattedTitle(activeTab)}
      options={tabOptions}
      shouldShow={showSearchBar}
      setShouldShow={setShowSearchBar}
      onSelect={(arg) => {
        dispatch(setServiceId(arg.toLowerCase()));
        setShowSearchBar(false);
      }}
      inputPlaceholder={"Choose A Service..."}
      optionsIcon={<MdAttachment />}
      leftIcon={
        <AiFillReconciliation
          color="var(--primaryThemeColor)"
          style={{ alignSelf: "center" }}
        />
      }
    />
  );
}
