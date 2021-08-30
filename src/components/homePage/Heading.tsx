import React from "react";

import "./css/Heading.css";

interface PropsType {
  title: string;
}

const Headings: React.FC<PropsType> = ({ title }) => {
  return <h1 className={"heading-context"}>{title}</h1>;
};

export default Headings;
