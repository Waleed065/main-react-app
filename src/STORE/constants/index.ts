export const setCommentsConst = "setComments";
// ------------------><-----------------
export const setCurrencyConst = "setCurrency";
// ------------------><-----------------
export const setServiceIdConst = "setServiceId";
// ------------------><-----------------
export const setItemsConst = "setItems";
// ------------------><-----------------
export const addToItemsConst = "addToItems";
// ------------------><-----------------
export const setAddOnsConst = "setAddOns";
// ------------------><-----------------
export const setAffiliateInfoConst = "setAffiliateInfo";
// ------------------><-----------------
export const setAffiliateIdConst = "setAffiliateId";
// ------------------><-----------------
export const clearAffiliateInfoConst = "clearAffiliateInfo";
// ------------------><-----------------
export const setCategoriesConst = "setCategories";
// ------------------><-----------------
export const setAllCategoriesConst = "setAllCategories";
// ------------------><-----------------
export const setServicesHeadingsConst = "setServicesHeadings";
// ------------------><-----------------
export const setServicesSearchTitleConst = "setServicesSearchTitle";

// ------------------><-----------------
export const setServicesLoadingConst = "setServicesLoading";
// ------------------><-----------------
export const setActivityInProgressConst = "setActivityInProgress";
export const clearActivityInProgressConst = "clearActivityInProgress";

// ------------------><-----------------
export const setUserInfoConst = "setUserInfo";
// ------------------><-----------------
export const removeUserInfoConst = "removeUserInfo";
// ------------------><-----------------
export const updateUserInfoConst = "updateUserInfo";
// ------------------><-----------------
export const setOurServicesUrlValidConst = "setOurServicesUrlValid";
// ------------------><-----------------
export const addToCartConst = "addToCart";
// ------------------><-----------------
export const removeFromCartConst = "removeFromCart";
// ------------------><-----------------
export const updateCartConst = "updateQuantityCart";
// ------------------><-----------------
export const emptyCartConst = "emptyCart";
// ------------------><-----------------
export const setWhiteListDestinationsConst = "setWhiteListDestinations";
// ------------------><-----------------
export const setDestinationConst = "setDestination";

// ------------------><-----------------
export const setMessagesConst = "setMessages";
// ------------------><-----------------
export const deleteMessageConst = "deleteMessage";

// ------------------><-----------------
export const setCurrentItemIndexConst = "setCurrentItemIndex";

// ------------------><-----------------
export const setPendingAdsConst = "setPendingAds";
// ------------------><-----------------
export const setReviewsConst = "setReviews";
// ------------------><-----------------
export const setActiveAdsConst = "setActiveAds";
// ------------------><-----------------
export const setFavoritesConst = "setFavorites";
// ------------------><-----------------
export const removeFavoritesConst = "removeFavorites";
// ------------------><-----------------
export const setOrdersConst = "setOrders";
// ------------------><----------->
export const setSnackBarConst = "setSnackBar";
export const clearSnackBarConst = "clearSnackBar";
// ------------------><-----------------
export const setAlertConst = "setAlert";
export const clearAlertConst = "clearAlert";
// ------------------><-----------------
export const setInitialMessagesConst = "setInitialMessages";
export const addPreviousMessagesConst = "addPreviousMessages";
// ------------------><-----------------

/* -------------socket constants------------- */
export const messageConst = "message";
export const chatRoomConst = "chatRoom";
export const connectionConst = "connection";
/* ------------------------------------------ */

export const GET_PARAMS = {
  show: "show",
  filterBy: "filter",
  sortBy: "sorting",
};

export const GET_ENUMS = {
  show: {
    logIn: "log-in",
    logOut: "log-out",
    contactUs: "contact-us",
    receipt: "receipt",
    getAQuote: "get-a-quote",
    filter: "filter",
    cart: "cart",
  },
  sortBy: {
    priceLowToHigh: "price-asc",
    priceHighToLow: "price-desc",
    averageRating: "ratings",
    datePublished: "date-published",
  },
  filterBy: {
    priceRange: "price-between",
    onlyPremium: "premium-true",
    onlyNonPremium: "premium-false",
  },
};

// ------------------><-----------------

export const modalAnimationTimeOut: number = 300;
// ------------------><-----------------
export const itemTabs = {
  tab1: "Overview",
  tab2: "Location",
  tab3: "Amenities",
  tab4: "Similar",
  tab5: "Reviews",
};

export const tabs = ["hotels", "cars", "security"];

export const useNavLinks = {
  cart: {
    query: {
      [GET_PARAMS.show]: GET_ENUMS.show.cart,
    },
  },
  receipt: {
    query: {
      [GET_PARAMS.show]: GET_ENUMS.show.receipt,
    },
  },

  logIn: {
    query: {
      [GET_PARAMS.show]: GET_ENUMS.show.logIn,
    },
  },

  logOut: {
    query: {
      [GET_PARAMS.show]: GET_ENUMS.show.logOut,
    },
  },

  contactUs: {
    query: {
      [GET_PARAMS.show]: GET_ENUMS.show.contactUs,
    },
  },

  sortByPriceLowToHigh: {
    query: {
      [GET_PARAMS.sortBy]: GET_ENUMS.sortBy.priceLowToHigh,
    },
  },
  sortByPriceHighToLow: {
    query: {
      [GET_PARAMS.sortBy]: GET_ENUMS.sortBy.priceHighToLow,
    },
  },
  sortByAverageRating: {
    query: {
      [GET_PARAMS.sortBy]: GET_ENUMS.sortBy.averageRating,
    },
  },
  sortByDatePublished: {
    query: {
      [GET_PARAMS.sortBy]: GET_ENUMS.sortBy.datePublished,
    },
  },
  sortByOnlyPremium: {
    query: {
      [GET_PARAMS.filterBy]: GET_ENUMS.filterBy.onlyPremium,
    },
  },
  sortByOnlyNonPremium: {
    query: {
      [GET_PARAMS.filterBy]: GET_ENUMS.filterBy.onlyNonPremium,
    },
  },
};

export const messagesTypes = {
  text: "text",
  image: "image",
  video: "video",
};

export const global = "global";

export const filterParameters = {
  service: "service",
  country: "country",
  city: "city",
};

export const googleMapsKey = "";

export const validNumbers = new RegExp("^[0-9]*$");

export const noDisplay = "";
export const logo = "";
export const identityGood = "";
export const doneScene = "";

export const contentTypeHeader = "Content-Type";
export const tokenHeader = "Authorization";
export const userIdHeader = "x-api-key";

export const staticPaths = {
  homePath: "/",
  itemsPath: "/items",
  itemPath: "/item",
  accountPath: "/account",
  affiliatesApplyPath: "/affiliates-apply",
  affiliatesTermsPath: "/affiliates-terms",
  aboutPath: "/about",
  termsPath: "/terms-of-service",
  postAdPath: "/account/post-ad",
  myAdsPath: "/account/my-ads",
  myOrdersPath: "/account/my-orders",
  chatPath: "/account/chat",
  favoritesPath: "/account/favorites",
  affiliatesPath: "/account/affiliates",
  affiliatesDashboardPath: "/account/affiliates/dashboard",
  affiliatesGroupPath: "/account/affiliates/groups",
  affiliatesProductsPath: "/account/affiliates/products",
  affiliatesPerformancePath: "/account/affiliates/performance",
  affiliatesExtrasPath: "/account/affiliates/extras",
};
