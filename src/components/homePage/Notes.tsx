import { useState, useEffect, createRef } from "react";
import "./css/Notes.css";

import { CSSTransition, TransitionGroup } from "react-transition-group";

const allNotes = [
  {
    _id: "132468",
    details:
      "The greatest glory in living lies not in never falling, but in rising every time we fall.",
  },
  {
    _id: "13246874868",
    details:
      "Many of life’s failures are people who did not realize how close they were to success when they gave up",
  },
  {
    _id: "132487668",
    details:
      "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking.",
  },
  {
    _id: "353438968",
    details:
      "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
  },
  {
    _id: "863653468",
    details:
      "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
  },
];

const Notes: React.FC = () => {
  const [currentNote, setCurrentNote] = useState<number>(0);
  const notesRef = createRef<HTMLSpanElement>();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNote((prevState) => {
        if (prevState >= allNotes.length - 1) return 0;
        return prevState + 1;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span id={"notes"}>
      <h1>Luxury Rooms</h1>

      <TransitionGroup>
        <CSSTransition
          nodeRef={notesRef}
          key={allNotes[currentNote]._id}
          in={true}
          timeout={500}
          classNames="notesTransition"
        >
          <span className={"cardDetails"} ref={notesRef}>
            <p>{allNotes[currentNote].details}</p>
            <p>{`${currentNote + 1}/${allNotes.length}`}</p>
          </span>
        </CSSTransition>
      </TransitionGroup>
      <span className={"indexContainer"}>
        {allNotes.map((item, index) => (
          <span
            style={{
              borderColor:
                index !== currentNote
                  ? "var(--bgColor1)"
                  : "var(--secondaryThemeColor)",
            }}
            key={index}
            className={"index"}
          />
        ))}
      </span>
    </span>
  );
};

export default Notes;
