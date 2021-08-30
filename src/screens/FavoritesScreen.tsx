import React, { useEffect, useState } from "react";
import "./css/Favorites.css";
import { useDispatch, useSelector } from "react-redux";
import { stateTypes } from "../types";
import { fetchFavorites } from "../STORE/actions";
import Main from "../components/Main";
import FooterContainer from "../components/FooterContainer";

export default function Favorites() {
  const favorites = useSelector((state: stateTypes) => state.favorites);
  const favoritesIds = useSelector(
    (state: stateTypes) => state.userInfo.favorites
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const condition = favorites.length !== favoritesIds.length;
  useEffect(() => {
    if (!condition) return;

    setLoading(true);
    dispatch(
      fetchFavorites({
        Then: setLoadingFalse,
        Catch: setLoadingFalse,
        InvalidRequest: setLoadingFalse,
      })
    );

    return setLoadingFalse;
  }, [dispatch, condition]);

  const setLoadingFalse = () => setLoading(false);

  return (
    <div id={"favorites-container"} className={"fade-in"}>
      <Main
        items={!loading ? favorites : []}
        loading={loading}
        message={"You Currently Don't Have Any Favorites"}
      />
      <FooterContainer />
    </div>
  );
}
