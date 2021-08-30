import React, { useState, useEffect, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import ActivityIndicator from "../ActivityIndicator";

import { getServicesCategories } from "../../STORE/selectors";
import { fetchCategories } from "../../STORE/actions";

import Category from "./Category";

interface schema {
  searchTitleContainerRef: React.RefObject<HTMLDivElement>;
  showCategory: boolean;
  setShowCategory: (arg: boolean) => void;
}

const AllCategories: React.FC<schema> = ({
  searchTitleContainerRef,
  showCategory,
  setShowCategory,
}) => {
  const { shouldFetch, servicesCategories } = useSelector(
    getServicesCategories
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const listner = (e: any) => {
      if (
        showCategory &&
        !searchTitleContainerRef.current?.contains(e.target)
      ) {
        setShowCategory(false);
      }
    };
    window.addEventListener("mouseup", listner);
    return () => window.removeEventListener("mouseup", listner);
    // eslint-disable-next-line
  }, [showCategory, dispatch]);

  useEffect(() => {
    if (!shouldFetch) return;
    let mounted = true;
    if (!mounted) return;
    setLoading(true);
    console.log("Fetching Categories");

    dispatch(
      fetchCategories({
        Then: () => setLoading(false),
        Catch: () => setLoading(false),
        InvalidRequest: () => setLoading(false),
      })
    );
    // setLoading(false);
    return () => {
      mounted = false;
      setLoading(false);
    };
  }, [dispatch, shouldFetch]);

  const categories = Object.values(servicesCategories);
  return (
    <div>
      <ActivityIndicator loading={loading} />

      {categories.length ? (
        categories.map((categoryDetails) => (
          <Category
            key={categoryDetails._id}
            categoryDetails={categoryDetails}
            setShowCategory={setShowCategory}
          />
        ))
      ) : (
        <div className={"allCategories-subsitute"} />
      )}
    </div>
  );
};

export default memo(AllCategories);
