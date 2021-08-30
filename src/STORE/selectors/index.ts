import { createSelector } from "reselect";
import {
  stateTypes,
  headingsStateType,
  servicesHeadingsItemType,
  titleStateType,
  titlePayload,
  titleDocument,
  categoriesStateType,
  itemsStateType,
  itemsDocument,
  itemType,
  whiteListStateType,
  destinationStateType,
  servicesHeadingsDocument,
  cartStateType,
  commentsStateType,
  commentsItemType,
  categoriesDocument,
  categoriesItemType,
  messageSchema,
  itemsPayloadType,
  categoriesSchema,
  chatRoomsStateType,
  defaultMessage,
  chatsStateType,
  memberDetailsSchema,
  addOnsStateType,
  memberDetails,
} from "../../types";
import { STORE } from "../index";

const titleSelector = (state: stateTypes) => state.title;

const headingsSelector = (state: stateTypes) => state.headings;

const categoriesSelector = (state: stateTypes) => state.categories;

const itemsSelector = (state: stateTypes) => state.items;
const serviceIdSelector = (state: stateTypes) => state.serviceId;
const commentsSelector = (state: stateTypes) => state.comments;
const whiteListSelector = (state: stateTypes) => state.whiteList;
const destinationSelector = (state: stateTypes) => state.destination;
const cartSelector = (state: stateTypes) => state.cart;
const currentItemIdSelector = (state: stateTypes, itemParam: any) => itemParam;

const chatsSelector = (state: stateTypes) => state.chats;
const chatRoomsSelector = (state: stateTypes) => state.chatRooms;
const addOnsSelector = (state: stateTypes) => state.addOns;

const categories = () => STORE.getState().categories;
const userInfoSelector = (state: stateTypes) => state.userInfo;
const affiliateSelector = (state: stateTypes) => state.affiliate;



// --------------------------><--------------------------
const userIdSelector = createSelector(
  userInfoSelector,
  (userInfo) => userInfo._id
);

// --------------------------><--------------------------
function headingsList(
  headings: headingsStateType,
  activeTab: string
): servicesHeadingsItemType {
  return (
    headings[activeTab] || {
      shouldFetch: true,
      headings: servicesHeadingsDocument,
    }
  );
}

export const getServicesHeadings = createSelector(
  headingsSelector,
  serviceIdSelector,
  headingsList
);

export const getPostAdServicesHeadings = createSelector(
  headingsSelector,
  currentItemIdSelector,
  headingsList
);

// --------------------------><--------------------------
function getSearchTitle(
  title: titleStateType,
  activeTab: string,
  destination: destinationStateType
): titlePayload {
  const { countryId, cityId } = destination;

  const servicesTitle = title[activeTab]?.[countryId]?.[cityId];

  if (servicesTitle) {
    return servicesTitle;
  } else {
    return {
      shouldFetch: true,
      servicesTitle: titleDocument,
    };
  }
}

export const getServicesSearchTitle = createSelector(
  titleSelector,
  serviceIdSelector,
  destinationSelector,
  getSearchTitle
);

// --------------------------><--------------------------

const activeCategory = (
  searchTitle: titlePayload,
  categories: categoriesStateType
): categoriesItemType => {
  // console.log({searchTitle, categories})

  const { serviceId, categoryId, countryId, cityId } =
    searchTitle.servicesTitle;
  return (
    categories?.[serviceId]?.[countryId]?.[cityId]?.servicesCategories?.[
      categoryId
    ] ?? categoriesDocument
  );
};

export const getActiveCategoryDetails = createSelector(
  getServicesSearchTitle,
  categoriesSelector,
  activeCategory
);

const firstCategory = (categories: categoriesStateType): categoriesItemType => {
  let serviceId;
  let countryId;
  let cityId;
  let doc;

  serviceId = Object.keys(categories)?.[0];
  if (serviceId) {
    countryId = Object.keys(categories?.[serviceId])?.[0];
    if (countryId) {
      cityId = Object.keys(categories?.[serviceId]?.[countryId])?.[0];
      if (cityId) {
        doc = Object.values(
          categories?.[serviceId]?.[countryId]?.[cityId]?.servicesCategories
        )?.[0];
      }
    }
  }

  // if (serviceId && countryId && cityId && categoryId) {
  //   return categories?.[serviceId]?.[countryId]?.[cityId]?.servicesCategories?.[
  //     categoryId
  //   ];
  // } else
  return doc ?? categoriesDocument;
};

export const getFirstCategory = createSelector(
  categoriesSelector,
  firstCategory
);

// --------------------------><--------------------------
const getCategoriesList = (
  categories: categoriesStateType,
  activeTab: string,
  destination: destinationStateType
): categoriesSchema => {
  const { countryId, cityId } = destination;
  return (
    categories[activeTab]?.[countryId]?.[cityId] ?? {
      shouldFetch: true,
      servicesCategories: {},
    }
  );
};

export const getServicesCategories = createSelector(
  categoriesSelector,
  serviceIdSelector,
  destinationSelector,
  getCategoriesList
);

// --------------------------><--------------------------

const servicesItemsList = (
  items: itemsStateType,
  activeTab: string,
  destination: destinationStateType,
  title: titleStateType
): itemsPayloadType | undefined => {
  const { countryId, cityId } = destination;
  const category =
    title[activeTab]?.[countryId]?.[cityId]?.servicesTitle.categoryId;
  if (!category) return undefined;

  // console.log(items[activeTab]?.[countryId]?.[cityId]?.[category])
  return (
    items[activeTab]?.[countryId]?.[cityId]?.[category] ?? {
      shouldFetch: true,
      sortBy: null,
      filterBy: null,
      servicesItems: [],
    }
  );
};

export const getServicesItems = createSelector(
  itemsSelector,
  serviceIdSelector,
  destinationSelector,
  titleSelector,
  servicesItemsList
);

// --------------------------><--------------------------

const whiteListCities = (
  activeTab: string,
  whiteList: whiteListStateType,
  destination: destinationStateType
): string[] => {
  return whiteList[activeTab]?.[destination?.countryId] || [];
};

export const getWhiteListCities = createSelector(
  serviceIdSelector,
  whiteListSelector,
  destinationSelector,
  whiteListCities
);

// --------------------------><--------------------------
const whiteListCountries = (
  activeTab: string,
  whiteList: whiteListStateType
): { [countryId: string]: string[] } => {
  return whiteList[activeTab] || {};
};

export const getWhiteListCountries = createSelector(
  serviceIdSelector,
  whiteListSelector,
  whiteListCountries
);

// --------------------------><--------------------------

const currentItem = (
  items: itemsStateType,
  currentItemId: string
): itemType => {
  let array: itemType[] = [];

  for (let service in items) {
    for (let country in items[service]) {
      for (let city in items[service][country]) {
        for (let category in items[service][country][city]) {
          array.push(
            ...(items[service][country][city][category].servicesItems ?? [])
          );
        }
      }
    }
  }

  return (
    array.find((itemObj) => itemObj._id === currentItemId) ?? itemsDocument
  );
};

export const getItem = createSelector(
  itemsSelector,
  currentItemIdSelector,
  currentItem
);

// --------------------------><--------------------------
export const randomItem = (items: itemsPayloadType | undefined): itemType => {
  if (items) {
    const randomItemIndex = Math.floor(
      Math.random() * items?.servicesItems.length
    );
    return items?.servicesItems[randomItemIndex] ?? itemsDocument;
  }

  return itemsDocument;
};

export const getRandomItem = createSelector(getServicesItems, randomItem);

// --------------------------><--------------------------

const allComments = (
  currentItemId: string,
  comments: commentsStateType
): commentsItemType[] => {
  return comments[currentItemId] ?? [];
};

export const getComments = createSelector(
  currentItemIdSelector,
  commentsSelector,

  allComments
);

// --------------------------><--------------------------
interface isAddedToCartSchema {
  cart: cartStateType;
  serviceId: string;
  countryId: string;
  cityId: string;
  _id: string;
  categoryId: string;
}
export const isAddedToCart = ({
  cart,
  countryId,
  cityId,
  serviceId,
  _id,
  categoryId,
}: isAddedToCartSchema) => {
  return (
    cart?.[serviceId]?.[countryId]?.[cityId]?.[categoryId]?.some(
      (cartItem: any) => cartItem._id === _id
    ) ?? false
  );
};

// --------------------------><--------------------------
interface cartCategorySchema {
  serviceId: string;
  countryId: string;
  cityId: string;
  categoryId: string;
}
export function getCategory({
  serviceId,
  countryId,
  cityId,
  categoryId,
}: cartCategorySchema): categoriesItemType {
  return (
    categories()[serviceId]?.[countryId]?.[cityId]?.servicesCategories?.[
      categoryId
    ] ?? categoriesDocument
  );
}

// --------------------------><--------------------------

const currentChat = (
  chatId: string,
  chats: chatsStateType
): messageSchema[] => {
  return chats[chatId] ?? [];
};

export const getCurrentChatMessages = createSelector(
  currentItemIdSelector,
  chatsSelector,

  currentChat
);

// --------------------------><--------------------------

const currentChatRoom = (
  chatId: string,
  chatRooms: chatRoomsStateType
): memberDetailsSchema => {
  return chatRooms[chatId]?.[0] ?? memberDetails;
};

export const getCurrentChat = createSelector(
  currentItemIdSelector,
  chatRoomsSelector,

  currentChatRoom
);

// --------------------------><--------------------------

const totalPrice = (cart: cartStateType): number => {
  let grandTotal = 0;

  for (let serviceId in cart) {
    for (let countryId in cart[serviceId]) {
      for (let cityId in cart[serviceId][countryId]) {
        for (let category in cart[serviceId][countryId][cityId]) {
          for (let categoryItem of cart[serviceId][countryId][cityId][
            category
          ]) {
            const Difference_In_Time =
              categoryItem.endDate.getTime() - categoryItem.startDate.getTime();

            const Difference_In_Days =
              Math.ceil(Difference_In_Time / (1000 * 3600 * 24)) || 1;

            grandTotal += categoryItem.price * Difference_In_Days;
            for (let addOn of categoryItem.addOns) {
              grandTotal += addOn.price * addOn.quantity;
            }
          }
        }
      }
    }
  }

  return grandTotal;
};

export const getTotalPrice = createSelector(cartSelector, totalPrice);

const totalOrders = (cart: cartStateType): number => {
  let totalOrders = 0;

  for (let serviceId in cart) {
    for (let countryId in cart[serviceId]) {
      for (let cityId in cart[serviceId][countryId]) {
        for (let category in cart[serviceId][countryId][cityId]) {
          for (
            let i = 0;
            i < cart[serviceId][countryId][cityId][category].length;
            i++
          ) {
            totalOrders++;
          }
        }
      }
    }
  }

  return totalOrders;
};

export const getTotalOrders = createSelector(cartSelector, totalOrders);

function ordersArray(cart: cartStateType, userId: string): any[] {
  const orders: any = [];
  for (let serviceId in cart) {
    for (let countryId in cart[serviceId]) {
      for (let cityId in cart[serviceId][countryId]) {
        for (let category in cart[serviceId][countryId][cityId]) {
          for (let categoryItem of cart[serviceId][countryId][cityId][
            category
          ]) {
            const {
              _id: itemId,
              serviceId,
              countryId,
              cityId,
              categoryId,
              startDate,
              endDate,
              addOns,
              avatar,
              premium,
              price,
              title,
            } = categoryItem;
            orders.push({
              itemId,
              serviceId,
              countryId,
              cityId,
              categoryId,
              startDate,
              endDate,
              addOns,
              userId,
              avatar,
              premium,
              price,
              title,
            });
          }
        }
      }
    }
  }

  return orders;
}

export const getOrdersArray = createSelector(
  cartSelector,
  userIdSelector,
  ordersArray
);

function lastMessage(chats: chatsStateType, chatRoomId: string) {
  return chats[chatRoomId]?.[chats[chatRoomId].length - 1] ?? defaultMessage;
}

export const getLastMessage = createSelector(
  chatsSelector,
  currentItemIdSelector,
  lastMessage
);

function currentAddOns(addOns: addOnsStateType, serviceId: string): string[] {
  return addOns[serviceId] ?? [];
}

export const getAddOns = createSelector(
  addOnsSelector,
  serviceIdSelector,
  currentAddOns
);



export const getIsAffiliate = createSelector(
  affiliateSelector,
  (info):boolean => info._id?.length > 0
);