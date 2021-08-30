export interface booleanActionType {
  type: string;
  payload: boolean;
}

// ---------------------->Index<--------------------
export interface indexActionType {
  type: string;
  payload: number;
}
// ---------------------->string<--------------------
export interface stringActionType {
  type: string;
  payload: string;
}

// ---------------------->Categories<--------------------

export const categoriesDocument = {
  serviceId: "",
  _id: "",
  countryId: "",
  cityId: "",
  avatar: null,
  about: "",
  // price: 0,
  title: "",
};

export interface categoriesItemType {
  serviceId: string;
  _id: string;
  countryId: string;
  cityId: string;
  avatar: string | null;
  about: string;
  title: string;
}

export type categoriesSchema = {
  shouldFetch: boolean;
  servicesCategories: {
    [categoryId: string]: categoriesItemType;
  };
};

export interface categoriesStateType {
  [serviceId: string]: {
    [countryId: string]: {
      [cityId: string]: categoriesSchema;
    };
  };
}
export interface categoriesActionType {
  type: string;
  payload: {
    serviceId: string;

    countryId: string;
    cityId: string;

    allCategories: categoriesSchema;
  };
}
// ---------------------->all categories<--------------------
export const allCategoriesDocument = {
  serviceId: "",
  _id: "",
  avatar: null,
  about: "",
  // price: 0,
  title: "",
};

export interface allCategoriesItemType {
  serviceId: string;
  _id: string;
  avatar: string | null;
  about: string;
  title: string;
}

export interface allCategoriesStateType {
  [serviceId: string]: allCategoriesItemType[];
}
export interface allCategoriesActionType {
  type: string;
  payload: {
    serviceId: string;
    allCategories: allCategoriesItemType[];
  };
}
// ---------------------->Add-on categories<--------------------
export const addOnCategoriesDocument = {
  serviceId: "",
  categoryId: "",
  addOn: "",

  countryId: "",
  cityId: "",

  avatar: "",
  about: "",
  price: 0,
  title: "",
};

export interface addOnCategoriesItemType {
  serviceId: string;
  categoryId: string;
  addOn: string;

  countryId: string;
  cityId: string;

  avatar: string;
  about: string;
  price: number;
  title: string;
}

// ---------------------->Title<--------------------
export const titleDocument = {
  serviceId: "",
  categoryId: "",
  countryId: "",
  cityId: "",
};

export type titleSchema = {
  serviceId: string;
  categoryId: string;
  countryId: string;
  cityId: string;
};
export type titlePayload = {
  shouldFetch: boolean;
  servicesTitle: titleSchema;
};
export interface titleStateType {
  [serviceId: string]: {
    [countryId: string]: {
      [cityId: string]: titlePayload;
    };
  };
}
export interface titleActionType {
  type: string;
  payload: titlePayload;
}

// ---------------------->Items<--------------------
export const itemsDocument = {
  averageRating: 0,

  about: "",
  amenities: [],

  pictures: [],
  premium: false,
  price: 0,
  rating: {
    fiveStar: 0,
    fourStar: 0,
    threeStar: 0,
    twoStar: 0,
    oneStar: 0,
  },
  title: "",
  location: [0, 0],

  _id: "",
  createdAt: new Date(),

  addOns: [],

  serviceId: "",
  categoryId: "",

  countryId: "",
  cityId: "",
};

export type addOnType = {
  title: string;
  price: number;
  about: string | null;
};
export interface selectAddOnSingleType {
  title: string;
  price: number;
  quantity: number;
}
export type selectedAddOnType = selectAddOnSingleType[];
export interface itemType {
  _id: string;
  title: string;
  serviceId: string;
  about: string;
  cityId: string;
  countryId: string;
  premium: boolean;
  categoryId: string;
  location: number[];
  createdAt: Date;

  averageRating: number;
  addOns: addOnType[];

  price: number;
  pictures: string[];
  amenities: amenityType[];
  rating: {
    fiveStar: number;
    fourStar: number;
    threeStar: number;
    twoStar: number;
    oneStar: number;
  };
}

export type itemsPayloadType = {
  shouldFetch: boolean;
  filterBy: string | null;
  sortBy: string | null;
  servicesItems: itemType[];
};

export interface itemsStateType {
  [serviceId: string]: {
    [countryId: string]: {
      [cityId: string]: {
        [categoryId: string]: itemsPayloadType;
      };
    };
  };
}

export interface itemsActionType {
  type: string;
  payload: {
    serviceId: string;
    categoryId: string;
    countryId: string;
    cityId: string;
    categoryItems: itemType[];
    shouldFetch: boolean;
    filterBy: string | null;
    sortBy: string | null;
  };
}
export interface addOnToItemsActionType {
  type: string;
  payload: {
    serviceId: string;
    categoryId: string;

    countryId: string;
    cityId: string;

    categoryItems: itemType[];
  };
}

// ---------------------->Comments<--------------------

export type commentsItemType = {
  avatar: string;
  comment: string;
  createdAt: Date;
  updatedAt: Date;

  downVotes: number;
  upVotes: number;
  _id: string;
  name: string;
  rated: 5 | 4 | 3 | 2 | 1;
  itemId: string;
};

export interface commentsStateType {
  [key: string]: commentsItemType[];
}
export interface commentsActionType {
  type: string;
  payload: {
    _id: string;
    comments: commentsItemType[];
  };
}
// ---------------------->Heading<--------------------
export const servicesHeadingsDocument = {
  calendarHeadingOne: "",
  calendarHeadingTwo: "",
  categoriesHeading: "",
  locationHeadingOne: "",
  locationHeadingTwo: "",
  itemsHeading: "",
  timeHeadingOne: "",
  timeHeadingTwo: "",
  pictures: [],
};

export interface servicesHeadingsSchema {
  calendarHeadingOne: string;
  calendarHeadingTwo: string;
  categoriesHeading: string;
  locationHeadingOne: string;
  locationHeadingTwo: string;
  itemsHeading: string;
  pictures: string[];
  timeHeadingOne: string;
  timeHeadingTwo: string;
}
export type servicesHeadingsItemType = {
  shouldFetch: boolean;
  headings: servicesHeadingsSchema;
};
export type servicesHeadingsPayload = {
  [serviceId: string]: servicesHeadingsItemType;
};
export interface headingsStateType {
  [serviceId: string]: {
    shouldFetch: boolean;
    headings: servicesHeadingsSchema;
  };
}
export interface headingsActionType {
  type: string;
  payload: servicesHeadingsPayload;
}

// ---------------------->Cart<--------------------
export interface cartSchema {
  avatar: string;
  about: string;
  premium: boolean;
  price: number;
  title: string;
  addOns: selectedAddOnType;

  countryId: string;
  cityId: string;

  startDate: Date;
  endDate: Date;

  _id: string;
  serviceId: string;
  categoryId: string;
}

export interface cartStateType {
  [serviceId: string]: {
    [countryId: string]: {
      [cityId: string]: {
        [categoryKey: string]: cartSchema[];
      };
    };
  };
}

export interface cartActionType {
  type: string;
  payload: cartSchema;
}

// ---------------------->White List<--------------------
export type whiteListStateType = {
  [serviceId: string]: {
    [countryId: string]: string[];
  };
};

export interface whiteListDestinationsActionType {
  type: string;
  payload: {
    serviceId: string;
    destinations: {
      [countryId: string]: string[];
    };
  };
}
// ---------------------->Destination<--------------------

export type destinationStateType = {
  countryId: string;
  cityId: string;
};
export interface destinationActionType {
  type: string;
  payload: destinationStateType;
}

// ---------------------->Pendings Ads<--------------------
export type pendingAdsItemType = {
  location: [number, number];
  userId: string;
  serviceId: string;
  countryId: string;
  cityId: string;
  categoryId: string;
  isActive: boolean;
  keywords: string[];
  addOns: {
    title: string;
    price: number;
    about: string | null;
  }[];
  avatar: string;
  premium: boolean;

  price: number;
  title: string;

  pictures: string[];
  amenities: string[];

  about: string;
  rating: number;
  averageRating: {
    fiveStar: number;
    fourStar: number;
    threeStar: number;
    twoStar: number;
    oneStar: number;
  };
  createdAt: Date;
  updatedAt: Date;
};
export type pendingAdsStateType = pendingAdsItemType[];

export interface pendingAdsActionType {
  type: string;
  payload: pendingAdsStateType;
}
// ---------------------->Active Ads<--------------------
export type activeAdsStateType = itemType[];

export interface activeAdsActionType {
  type: string;
  payload: activeAdsStateType;
}
// ---------------------->Add Ons<--------------------

export type addOnsStateType = {
  [key: string]: string[];
};
export type addOnsActionType = {
  type: string;
  payload: addOnsStateType;
};

// ---------------------->Favorites<--------------------
export type favoritesStateType = itemType[];

export interface setFavoritesActionType {
  type: string;
  payload: favoritesStateType;
}
export interface removeFavoritesActionType {
  type: string;
  payload: string;
}

// ---------------------->orders<--------------------

export type ordersStateType = itemType[];
export interface ordersActionType {
  type: string;
  payload: ordersStateType;
}

// ---------------------->User Info<--------------------
type userInfoPayload = {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
  photoURL: string | null;
  _id: string;
  token: string | null;
  favorites: string[];
  createdAt: Date;
  updatedAt: Date;
};

export interface userInfoStateType extends userInfoPayload {
  isLoggedIn: boolean;
}

export interface userInfoActionType {
  type: string;
  payload: userInfoPayload;
}
export interface updateUserInfoActionType {
  type: string;
  payload: {
    displayName?: string | null;
    email?: string | null;
    emailVerified?: boolean;
    phoneNumber?: string | null;
    photoURL?: string | null;
    _id?: string;
    token?: string | null;
    favorites?: string[];
  };
}

// ---------------------->ChatRooms<--------------------
export const memberDetails = {
  photoURL: "",
  displayName: "",
};
export type memberDetailsSchema = {
  photoURL: string;
  displayName: string;
};

export type chatRoomsStateType = {
  [_id: string]: memberDetailsSchema[];
};

export interface chatRoomsActionType {
  type: string;
  payload: chatRoomsStateType;
}

// ---------------------->User Info<--------------------
export const defaultUserInfo = {
  displayName: "",
  email: "",
  emailVerified: false,
  phoneNumber: "",
  photoURL: "",
  _id: "",
  token: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  favorites: [],
  isLoggedIn: false,
};

// ---------------------->Chats<--------------------
export const defaultMessage = {
  _id: "",
  chatRoomId: "",
  type: "",
  from: "",
  content: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export type messageSchema = {
  _id: string;
  chatRoomId: string;
  type: string;
  from: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  error?: boolean;
};

export type chatsStateType = {
  [chatRoomId: string]: messageSchema[];
};

export interface initialMessagesActionType {
  type: string;
  payload: chatsStateType;
}
export interface previousMessagesActionType {
  type: string;
  payload: {
    chatRoomId: string;
    messages: messageSchema[];
  };
}

export interface chatRoomResponseSchema {
  _id: string;
  members: memberDetailsSchema[];
  messages: messageSchema[];
}
// ----------------------><-----------------
export interface alertStateType {
  head: string;
  message: string;
  leftButtonText: string;
  rightButtonText: string;
  onLeftButtonPress: () => any;
  onRightButtonPress: () => any;
  showAlert: boolean;
}
export interface alertActionType {
  type: string;
  payload: {
    head: string;
    message: string;
    leftButtonText: string;
    rightButtonText: string;
    onLeftButtonPress: () => any;
    onRightButtonPress: () => any;
  };
}
// ----------------------><-----------------
export interface currencyStateType {
  currencyCode: string;
  exchangeRate: number;
}
export interface currencyActionType {
  type: string;
  payload: currencyStateType;
}

// ---------------------->><--------------------
export interface promiseSchema {
  Then?: (arg?: any) => any;
  Catch?: (arg?: any) => any;
  InvalidRequest?: (arg?: any) => any;
}

// ---------------------->><-------------------->
export type countryType = {
  name: string;
  alpha2Code: string;
  emoji: string;
  flag: string;
  callingCodes: Array<string>;
  currencyCode: string;
};
export type countriesSchema = Array<countryType>;

// ---------------------->>>>>>>>>>>>><<<<<<<<<<<--------------------
export type calendarSchema = {
  startDate: Date;
  endDate: Date;
};

// ---------------------->Location Type<--------------------

export type locationSchema = {
  lat: number;
  lng: number;
  address: string;
};

export interface picturesSchema {
  firebase: any;
  local: string;
  loading: boolean;
  error: boolean;
  fileType: string;
  id: string;
}

export type addOnsForPostAd = { [key: string]: addOnType };

// ----------------------><--------------------
export interface postAdItemType {
  title: string;
  keywords: string[];
  serviceId: string;
  about: string;
  cityId: string;
  countryId: string;
  premium: boolean;
  categoryId: string;
  location: number[];
  addOns: addOnType[];
  price: number;
  pictures: picturesSchema[];
  amenities: string[];
  userId: string;
}

// ---------------------->Affiliate <--------------------
export type affiliateStateType = {
  _id: string;
  isActive: boolean;
  affiliations: string[];
  websiteName: string;
  websiteUrl: string;
  industry: string;
  promoCode: string | null;
};

export type affiliateActionType = {
  type: string;
  payload: affiliateStateType
}

export const defaultAffiliateState = {
  _id:'',
  isActive:false,
  affiliations: [],
  websiteName:'',
  websiteUrl:'',
  industry:'',
  promoCode:'',
};

// ----------------------><--------------------
export type amenityType =
  | "airConditioning"
  | "driver"
  | "wifi"
  | "frontTelevision"
  | "rearTelevision"
  | "soundSystem"
  | "drinks"
  | "tintedWindows"
  | "bulletProof"
  | "usbCharging"
  | "petFriendly"
  | "spa"
  | "foodAndBeverages"
  | "kitchen"
  | "accessibility"
  | "conveniences"
  | "entertainment"
  | "parking"
  | "trained"
  | "armed"
  | "insurance"
  | "lowRates"
  | "safety"
  | "monitoring"
  | "firstAid"
  | "mannered";

// ---------------------->Main Application State<--------------------
export interface stateTypes {
  serviceId: string;
  servicesLoading: boolean;
  addOns: addOnsStateType;
  ourServicesUrlValid: boolean;
  headings: headingsStateType;
  title: titleStateType;
  cart: cartStateType;
  categories: categoriesStateType;
  allCategories: allCategoriesStateType;
  items: itemsStateType;
  destination: destinationStateType;
  reviews: commentsItemType[];

  comments: commentsStateType;
  chats: chatsStateType;
  chatRooms: chatRoomsStateType;

  pendingAds: pendingAdsStateType;
  activeAds: activeAdsStateType;
  userInfo: userInfoStateType;
  favorites: favoritesStateType;

  orders: ordersStateType;
  alertModal: alertStateType;
  snackBar: string;
  whiteList: whiteListStateType;
  currency: currencyStateType;
  affiliate: affiliateStateType
}
// ----------------------><--------------------
