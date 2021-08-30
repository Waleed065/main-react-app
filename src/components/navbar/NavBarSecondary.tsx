import React, { useRef } from "react";
import "./css/NavBarSecondary.css";

import SearchBar from "./SearchBar";
import { CSSTransition } from "react-transition-group";

interface schema {
  secondaryNav: boolean;
  setSecondaryNav: (arg: boolean) => void;
}
export default function NavBarSecondary({
  secondaryNav,
  setSecondaryNav,
}: schema) {
  const childrenRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <CSSTransition
        in={secondaryNav}
        classNames={"navbar-secondary-animation"}
        nodeRef={childrenRef}
        timeout={300}
        unmountOnExit
      >
        <div id={"navbar-secondary-container"} ref={childrenRef}>
          <SearchBar
            childrenRef={childrenRef}
            setShouldShow={setSecondaryNav}
            setSecondaryNav={setSecondaryNav}
          />
        </div>
      </CSSTransition>
    </>
  );
}

/* 

db.items.distinct('title', {
    serviceId: 'hotels',
    countryId: 'pakistan',
    cityId: 'karachi',
    $text: {$search: "room"}
},
{
  $meta: "textScore", 
}, 
)
.sort({$meta:"textScore"}  )

db.items.find(
  { 
    serviceId: 'hotels',
    countryId: 'pakistan',
    cityId: 'karachi',
    $text: {$search: "room"}
  }, 
  {
    score: {$meta: "textScore"}, 
    title: 1
  }, 
)
.sort({score:{$meta:"textScore"} } )




db.item.aggregate([
  {
    $search: {
      "index": "text",
      "autocomplete": {
        "path": "title",
        "query": "suite"
      }
    }
  },
  {
    $limit: 10
  },
  {
    $project: {
      "_id": 0,
      "title": 1
    }
  }
]) 
*/
