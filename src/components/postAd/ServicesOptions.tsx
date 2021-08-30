import React, { memo, useState } from "react";
import { BsDot } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";

import { tabs } from "../../STORE/constants";

import formattedTitle from "../../utils/formattedTitle";
import Searchoptions from "../SearchOptions";


const servicesOptions = tabs.map(tab => formattedTitle(tab))

interface schema {
  serviceId: string;
  onSelect: (arg: string) => void;
}
const ServicesOptions = ({ serviceId, onSelect }: schema) =>{
  const [showServices, setShowServices] = useState(false);

  const onServiceSelect = (option: string) => {
    setShowServices(false);
    onSelect(option.toLowerCase());
  }
  
  return (
    <div className={"postAdMain-form-field"}>
      <h3>Choose A Service</h3>

      <Searchoptions
        title={formattedTitle(serviceId)}
        leftIcon={
          <FiChevronDown color={"var(--primaryThemeColor)"} size={25} />
        }
        onSelect={onServiceSelect}
        inputPlaceholder={"Search..."}
        options={servicesOptions}
        optionsIcon={<BsDot color={"var(--primaryThemeColor)"} size={25} />}
        shouldShow={showServices}
        setShouldShow={setShowServices}
        button
        barStyle={{
          marginBottom: 30,
        }}
      />
    </div>
  );
}


export default memo(ServicesOptions);