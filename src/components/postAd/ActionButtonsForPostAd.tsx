import React from "react";

interface schema {
  pageIndex: number;
  nextPage: () => void;
  previousPage: () => void;
}
export default function ActionButtonsForPostAd({
  pageIndex,

  nextPage,
  previousPage
}: schema) {
  
  return (
    <div className={"postAdMain-buttons-container"}>
      {pageIndex > 0 && (
        <button
          className={"button themeButton"}
          onClick={previousPage}
          disabled={pageIndex === 0}
        >
          Back
        </button>
      )}
        <button
          className={"button themeButton"}
          onClick={nextPage}
          >
          {pageIndex < 2 ? "Next" : "Post"}

        </button>
    </div>
  );
}
