import React, { useRef, useEffect } from "react";
import "./css/MoreTabs.css";


import { CSSTransition } from "react-transition-group";

interface schema{
  showMoreServiceIds: boolean
  setShowMoreServiceIds: (arg: boolean) => void
}
export default function MoreTabs({showMoreServiceIds, setShowMoreServiceIds}:schema) {

  const moreTabsRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <CSSTransition
        nodeRef={moreTabsRef}
        in={showMoreServiceIds}
        timeout={300}
        classNames="show-more-tabs-transition"
        unmountOnExit
        appear
      >
        <div ref={moreTabsRef} id={"more-tabs"}>
          <MoreTabsMount moreTabsRef={moreTabsRef} setShowMoreServiceIds={setShowMoreServiceIds} />
        </div>
      </CSSTransition>
    </>
  );
}

interface MoreTabsMountSchema {
  moreTabsRef: React.RefObject<HTMLDivElement>;
  setShowMoreServiceIds: (arg: boolean) => void

}
function MoreTabsMount({ moreTabsRef, setShowMoreServiceIds }: MoreTabsMountSchema) {

  useEffect(() => {
    const listner = (e: any) => {
      if (
        e.target.title === "moreTabs" ||
        e.target.parentElement.childNodes[0].innerHTML === "moreTabs" ||
        e.target.parentNode.title === "moreTabs"
      ) {
        return;
      } else if (!moreTabsRef.current?.contains(e.target)) {
        setShowMoreServiceIds(false);
      }
    };

    window.addEventListener("mouseup", listner);
    return () => window.removeEventListener("mouseup", listner);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <span>No More Services To Offer</span>
    </div>
  );
}
