import React, { useState, useRef, useCallback } from "react";
import "./css/Check.css";
import { FaRegClock } from "react-icons/fa";

import { useSelector } from "react-redux";
import { calendarSchema } from "../../types";
import "./css/Calendar.css";

import { getServicesHeadings } from "../../STORE/selectors";
import {  KeyboardTimePicker } from "@material-ui/pickers";
import ExtrasButton from "./ExtrasButton";

interface schema extends calendarSchema {
  setStartDate: (arg: Date) => void;
  setEndDate: (arg: Date) => void;
  setError: (arg: {state: boolean, helperText:string}) => void;
}

function Clocks({ startDate, endDate, setStartDate, setEndDate, setError }: schema) {
  const servicesHeadings = useSelector(getServicesHeadings).headings;
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const clickContainerRef = useRef<HTMLDivElement>(null);
  const { timeHeadingOne, timeHeadingTwo } = servicesHeadings;

  const prevHelperText = useRef('');
  const onErrorChange = useCallback((helperText: any) => {
    if (helperText === prevHelperText.current) return;
    console.log({clock: helperText});

    if (helperText?.length > 0) {
      setError({ state: true, helperText });
    } else {
      setError({ state: false, helperText: "" });
    }
    prevHelperText.current = helperText

    //eslint-disable-next-line
  },[]);
  
  
  return (
    <div id={"slide-container"} ref={clickContainerRef}>
      <div className={"extras-row"}>
        <KeyboardTimePicker
          open={showStartCalendar}
          onOpen={() => setShowStartCalendar(true)}
          onClose={() => setShowStartCalendar(false)}

          fullWidth
          variant="dialog"
          margin="normal"
          value={startDate}
          onChange={(arg: any) => setStartDate(arg._d)}

          onError={onErrorChange}

          TextFieldComponent={({ error }) => (
            <ExtrasButton
              error={error ?? true}
              active={showStartCalendar}
              heading={timeHeadingOne || "Start Time"}
              label={startDate.toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
              icon={<FaRegClock />}
              onClick={() => setShowStartCalendar(!showStartCalendar)}
            />
          )}
        />
        <KeyboardTimePicker
          open={showEndCalendar}
          onOpen={() => setShowEndCalendar(true)}
          onClose={() => setShowEndCalendar(false)}
          fullWidth
          variant="dialog"
          margin="normal"

          value={endDate}
          onChange={(arg: any) => setEndDate(arg._d)}

          onError={onErrorChange}

          TextFieldComponent={({ error }) => {
            return (
              <ExtrasButton
                // ref={checkOutRef}
                error={error ?? true}
                active={showEndCalendar}
                heading={timeHeadingTwo || "End Time"}
                label={endDate.toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
                icon={<FaRegClock />}
                onClick={() => setShowEndCalendar(!showEndCalendar)}
              />
            );
          }}
        />
      </div>

    </div>
  );
}

export default Clocks;
