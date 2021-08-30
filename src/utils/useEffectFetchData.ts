import { useEffect, useState } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  getServicesSearchTitle,
  getServicesItems,
  getWhiteListCountries,
} from "../STORE/selectors";
import {
  fetchTitle,
  fetchItems,
  setOurServicesUrlValid,
  setServiceId,
  setDestination,
  setTitle,
  fetchWhiteListDestinations,
  fetchAddOns,
} from "../STORE/actions";
import { stateTypes } from "../types";
import { filterParameters, global } from "../STORE/constants";
import { STORE } from "../STORE/index";
import useListners from "./useListners";
import useGetParameter from "./useGetParameter";

export function useEffectWhiteListDestinations(isDoneMounting: boolean) {
  const serviceId = useSelector((state: stateTypes) => state.serviceId);
  const whiteListDestinations = useSelector(getWhiteListCountries);

  const condition = Boolean(Object.keys(whiteListDestinations).length);
  const dispatch = useDispatch();
  useEffect(() => {
    if (condition || !isDoneMounting) return;
    let mounted = true;
    if (!mounted) return;
    console.log("Fetching white list destinations");
    dispatch(fetchWhiteListDestinations({}));

    return () => {
      mounted = false;
    };
  }, [condition, serviceId, isDoneMounting, dispatch]);
}

function useEffectServicesTitle(isDoneMounting: boolean) {
  const destination = useSelector((state: stateTypes) => state.destination);
  const shouldFetch = useSelector(getServicesSearchTitle).shouldFetch;

  const dispatch = useDispatch();
  const isAllowed =
    shouldFetch && Object.values(destination).every((val) => val !== "");
  useEffect(() => {
    if (!isAllowed || !isDoneMounting) return;
    let mounted = true;
    if (!mounted) return;

    console.log("allowed title");
    dispatch(fetchTitle({}));

    return () => {
      mounted = false;
    };
  }, [isAllowed, isDoneMounting, dispatch]);
}

function useEffectItems(isDoneMounting: boolean) {
  // const serviceId = useSelector((state: stateTypes) => state.serviceId);
  const servicesItems = useSelector(getServicesItems);
  const dispatch = useDispatch();
  const { sortBy, filterBy } = useListners();

  const accessBlocked =
    (servicesItems &&
      !servicesItems.shouldFetch &&
      sortBy === servicesItems.sortBy &&
      filterBy === servicesItems.filterBy) ||
    !servicesItems;

  useEffect(() => {
    if (accessBlocked || !isDoneMounting) {
      return;
    }

    const { countryId, cityId, serviceId, categoryId } = getServicesSearchTitle(
      STORE.getState()
    ).servicesTitle;
    // console.log({ serviceId, countryId, cityId, categoryId });

    let mounted = true;
    if (!mounted || !categoryId) return;
    console.log("Fetching Items");

    dispatch(
      fetchItems({
        filterBy,
        sortBy,
        categoryId,
        serviceId,
        countryId,
        cityId,
      })
    );

    return () => {
      mounted = false;
    };
  }, [accessBlocked, filterBy, sortBy, isDoneMounting, dispatch]);
}

export function useEffectFetchData(isDoneMounting: boolean = true) {
  useEffectWhiteListDestinations(isDoneMounting);
  useEffectServicesTitle(isDoneMounting);
  useEffectItems(isDoneMounting);
}

/* --------------------------><----------------------- */
let currentServiceId: string | null;
let currentCountryId: string | null;
let currentCityId: string | null;
let currentCategoryId: string | null;
function useEffectPath(isDoneMounting: boolean) {
  const { countryId, cityId, serviceId, categoryId } = useSelector(
    getServicesSearchTitle
  ).servicesTitle;
  const history = useHistory();

  useEffect(() => {
    const accessGranted =
      isDoneMounting &&
      serviceId &&
      countryId &&
      cityId &&
      categoryId &&
      (serviceId !== currentServiceId ||
        countryId !== currentCountryId ||
        cityId !== currentCityId ||
        categoryId !== currentCategoryId);

    if (!accessGranted) return;
    console.log("Url Set");

    let query = `/items/${categoryId}?${
      serviceId ? "&service=" + serviceId : ""
    }${countryId ? "&country=" + countryId : ""}${
      cityId ? "&city=" + cityId : ""
    }`;
    query = query.replace("?&", "?");
    history.push(query);

    // eslint-disable-next-line
  }, [serviceId, countryId, cityId, categoryId, isDoneMounting]);
}

function useEffectOurServices(setIsDoneMounting: (arg: boolean) => void) {
  const { sortBy, filterBy } = useListners();
  const { categoryParam }: any = useParams();
  const service = useGetParameter(filterParameters.service) ?? global;
  const country = useGetParameter(filterParameters.country) ?? global;
  const city = useGetParameter(filterParameters.city) ?? global;

  const dispatch = useDispatch();

  useEffect(() => {
    const items = STORE.getState().items;

    // if (tabs.indexOf(service) === -1) {
    //   dispatch(setOurServicesUrlValid(false));
    //   return;
    // }
    currentServiceId = service;
    currentCountryId = country;
    currentCityId = city;
    currentCategoryId = categoryParam;
    if (
      items[service]?.[country]?.[city]?.[categoryParam]?.sortBy === sortBy &&
      items[service]?.[country]?.[city]?.[categoryParam]?.filterBy === filterBy
    ) {
      batch(() => {
        dispatch(setOurServicesUrlValid(true));

        dispatch(setServiceId(service));
        dispatch(
          setDestination({
            countryId: country,
            cityId: city,
          })
        );
        // dispatch(setFilterBy(filterBy));

        dispatch(
          setTitle({
            shouldFetch: false,
            servicesTitle: {
              categoryId: categoryParam,
              serviceId: service,
              countryId: country,
              cityId: city,
            },
          })
        );
      });

      return setIsDoneMounting(true);
    }
    console.log("Our Services Fetcher");

    dispatch(
      fetchItems({
        serviceId: service,
        countryId: country,
        cityId: city,
        categoryId: categoryParam,
        filterBy,
        sortBy,
        Then: () => setIsDoneMounting(true),
      })
    );
    // eslint-disable-next-line
  }, [service, country, city, categoryParam, sortBy, filterBy]);
}
// ****
export function useEffectOurServicesOnMount() {
  const [isDoneMounting, setIsDoneMounting] = useState(false);

  useEffectOurServices(setIsDoneMounting);

  useEffectWhiteListDestinations(isDoneMounting);
  useEffectServicesTitle(isDoneMounting);
  useEffectPath(isDoneMounting);
}

export function useEffectFetchAddOns() {
  const dispatch = useDispatch();
  const condition = useSelector(
    (state: stateTypes) => Object.keys(state.addOns).length > 0
  );
  useEffect(() => {
    if (condition) return;
    dispatch(fetchAddOns());
  }, [condition, dispatch]);
}
