import React, { useEffect, useRef, useState } from "react";

interface schema {
  allRefs: {
    [name: string]: React.RefObject<HTMLDivElement>;
  };
  activeTab: string;
  setBubbleStyles: (arg: { width: number; left: number }) => void;
}
export default function useEffectTabsBubble({
  allRefs,
  activeTab,
  setBubbleStyles,
}: schema) {
  const [activeTabSizeSwitch, setActiveTabSizeSwitch] = useState(false);

  const resizeRef = useRef<any>(null);
  useEffect(() => {
    function resizeTab() {
      clearTimeout(resizeRef.current);
      resizeRef.current = setTimeout(() => {
        setActiveTabSizeSwitch(true);
      }, 100);
    }
    window.addEventListener("resize", resizeTab);
    return () => window.removeEventListener("resize", resizeTab);
  }, []);

  useEffect(() => {
    const currentTab = allRefs[activeTab];
    if (currentTab?.current) {
      const { offsetLeft, clientWidth } = currentTab.current;
      const newBubbleStyles = {
        left: offsetLeft,
        width: clientWidth,
      };
      setBubbleStyles(newBubbleStyles);
      setActiveTabSizeSwitch(false);
    }
    // eslint-disable-next-line
  }, [activeTab, activeTabSizeSwitch]);
}
