import React, { forwardRef } from "react";
import "./css/Cover.css";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterParameters } from "../../STORE/constants";
import { getServicesSearchTitle } from "../../STORE/selectors";
import usePrepareLink from "../../utils/usePrepareLink";

type PropsType = {};
type RefType = HTMLDivElement | null;

const Cover = forwardRef<RefType, PropsType>((props, ref) => {
  const { countryId, cityId, serviceId, categoryId } = useSelector(
    getServicesSearchTitle
  ).servicesTitle;

  const servicesLink = usePrepareLink({
    query: {
      [filterParameters.service]: serviceId,
      [filterParameters.country]: countryId,
      [filterParameters.city]: cityId,
    },
    pathname: `/items/${categoryId}`,
  });

  return (
    <div id="cover-backgroundImage" ref={ref}>

        <h2>Not Sure Where To Go?</h2>
        <div>
          <Link to={servicesLink} id="cover-flexible-button" className="button">
            <h3>I'm Flexible</h3>
          </Link>
        </div>

    </div>
  );
});

export default Cover;
