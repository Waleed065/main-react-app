import React, { useState, useRef, useCallback } from "react";
import "./css/Check.css";
import "./css/Calendar.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { calendarSchema } from "../../types";
import { getServicesHeadings } from "../../STORE/selectors";
import { KeyboardDatePicker } from "@material-ui/pickers";
import ExtrasButton from "./ExtrasButton";

interface schema extends calendarSchema {
  setStartDate: (arg: Date) => void;
  setEndDate: (arg: Date) => void;
  setError: (arg: { state: boolean; helperText: string }) => void;
}

function Check({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  setError,
}: schema) {
  const servicesHeadings = useSelector(getServicesHeadings).headings;
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  const clickContainerRef = useRef<HTMLDivElement>(null);
  const {
    calendarHeadingOne,
    calendarHeadingTwo,

  } = servicesHeadings;


  const prevHelperText = useRef("");
  const onErrorChange = useCallback((helperText: any) => {
    if (helperText === prevHelperText.current) return;
    console.log(helperText);

    if (helperText?.length > 0) {
      setError({ state: true, helperText });
    } else {
      setError({ state: false, helperText: "" });
    }
    prevHelperText.current = helperText;
    //eslint-disable-next-line
  }, []);

  return (
    <div id={"slide-container"} ref={clickContainerRef}>
      <div className={"extras-row"}>
        <KeyboardDatePicker
          open={showStartCalendar}
          onOpen={() => setShowStartCalendar(true)}
          onClose={() => setShowStartCalendar(false)}
          fullWidth
          variant="dialog"
          margin="normal"
          minDate={new Date()}
          value={startDate}
          onChange={(arg: any) => setStartDate(arg._d)}
          onError={onErrorChange}
          TextFieldComponent={({ error }) => (
            <ExtrasButton

              error={error ?? true}
              active={showStartCalendar}
              heading={calendarHeadingOne || "Start Date"}
              label={startDate.toDateString()}
              icon={<FaRegCalendarAlt />}
              onClick={() => setShowStartCalendar(!showStartCalendar)}
            />
          )}
        />
        <KeyboardDatePicker
          open={showEndCalendar}
          onOpen={() => setShowEndCalendar(true)}
          onClose={() => setShowEndCalendar(false)}
          fullWidth
          variant="dialog"
          margin="normal"
          label="Start Date"
          minDate={startDate}
          value={endDate}
          onChange={(arg: any) => setEndDate(arg._d)}
          onError={onErrorChange}
          TextFieldComponent={({ error }) => {
            return (
              <ExtrasButton

                error={error ?? true}
                active={showEndCalendar}
                heading={calendarHeadingTwo || "End Date"}
                label={endDate.toDateString()}
                icon={<FaRegCalendarAlt />}
                onClick={() => setShowEndCalendar(!showEndCalendar)}
              />
            );
          }}
        />
      </div>

    </div>
  );
}

export default Check;
