import { Badge, IconButton, Tooltip } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { IoIosNotifications } from "react-icons/io";
import TransitionHeight from "./TransitionHeight";

const options: string[] = [];
export default function Notifications() {
  const [shouldShow, setShouldShow] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const searchOptionsRef = useRef<HTMLDivElement>(null);

  const onSelect = () => {};

  return (
    <div ref={searchOptionsRef} style={{ position: "relative" }}>
      <IconButton
        style={{ marginLeft: 10 }}
        onClick={() => setShouldShow(!shouldShow)}
      >
        <Tooltip
          title="Notifications"
          PopperProps={{
            popperOptions: {
              modifiers: {
                offset: {
                  offset: "0, 5px",
                },
              },
            },
          }}
        >
          <Badge badgeContent={0} color="error">
            <IoIosNotifications size={25} color={"var(--textColor1)"} />
          </Badge>
        </Tooltip>
      </IconButton>

      <TransitionHeight
        shouldShow={shouldShow}
        setShouldShow={setShouldShow}
        inputPlaceholder={"Search"}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSelect={onSelect}
        options={options}
        searchOptionsRef={searchOptionsRef}
        optionsContainerStyle={{ top: 59, minWidth: 300 }}
      />
    </div>
  );
}
