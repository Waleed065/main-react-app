import React, { memo, useEffect, useState } from "react";
import { BsDot } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "../../STORE/actions";
import { stateTypes } from "../../types";
import formattedTitle from "../../utils/formattedTitle";
import Searchoptions from "../SearchOptions";

interface schema {
  serviceId: string;
  categoryId: string;
  setLoading: (arg: boolean) => void;
  setCategoryId: (arg: string) => void;
}
const AllCategories = ({
  serviceId,
  categoryId,
  setCategoryId,
  setLoading,
}: schema) =>{
  const allCategories =
    useSelector((state: stateTypes) => state.allCategories?.[serviceId])?.map(
      (category) => category._id
    ) ?? [];
  const [showServices, setShowServices] = useState(false);
  const dispatch = useDispatch();

  const condition = Boolean(allCategories?.length);
  useEffect(() => {
    if (condition) return;
    console.log("Fetching all categories");
    setLoading(true);
    dispatch(
      fetchAllCategories({
        serviceId,
        Then: setLoadingFalse,
        Catch: setLoadingFalse,
        InvalidRequest: setLoadingFalse,
      })
    );
    // eslint-disable-next-line
  }, [condition, dispatch, serviceId]);

  const setLoadingFalse = () => setLoading(false);

  return (
    <div className={"postAdMain-form-field"}>
      <h3>Choose A Category</h3>

      <Searchoptions
        title={formattedTitle(categoryId)}
        leftIcon={
          <FiChevronDown color={"var(--primaryThemeColor)"} size={25} />
        }
        onSelect={(option) => {
          setShowServices(false);
          setCategoryId(option);
        }}
        inputPlaceholder={"Search..."}
        options={allCategories}
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


export default memo(AllCategories)