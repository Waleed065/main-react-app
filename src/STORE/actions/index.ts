import { batch } from "react-redux";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

import {
  setServiceIdConst,
  setItemsConst,
  setCategoriesConst,
  setServicesHeadingsConst,
  setServicesSearchTitleConst,
  setServicesLoadingConst,
  addToCartConst,
  removeFromCartConst,
  updateCartConst,
  setDestinationConst,
  setCommentsConst,
  setOurServicesUrlValidConst,
  setPendingAdsConst,
  setActiveAdsConst,
  setUserInfoConst,
  removeUserInfoConst,
  setFavoritesConst,
  removeFavoritesConst,
  chatRoomConst,
  setOrdersConst,
  emptyCartConst,
  updateUserInfoConst,
  setSnackBarConst,
  clearSnackBarConst,
  setAlertConst,
  clearAlertConst,
  setWhiteListDestinationsConst,
  setCurrencyConst,
  setActivityInProgressConst,
  clearActivityInProgressConst,
  addToItemsConst,
  global,
  setAllCategoriesConst,
  setAddOnsConst,
  messageConst,
  setInitialMessagesConst,
  addPreviousMessagesConst,
  setReviewsConst,
  contentTypeHeader,
  tokenHeader,
  userIdHeader,
  setAffiliateInfoConst,
  setAffiliateIdConst,
  clearAffiliateInfoConst,
} from "../constants";

import {
  headingsActionType,
  titleActionType,
  itemType,
  categoriesActionType,
  chatRoomResponseSchema,
  chatRoomsStateType,
  cartActionType,
  itemsActionType,
  categoriesItemType,
  destinationActionType,
  booleanActionType,
  commentsActionType,
  stringActionType,
  pendingAdsActionType,
  activeAdsActionType,
  userInfoActionType,
  setFavoritesActionType,
  removeFavoritesActionType,
  ordersActionType,
  updateUserInfoActionType,
  alertActionType,
  whiteListDestinationsActionType,
  promiseSchema,
  currencyActionType,
  addOnToItemsActionType,
  stateTypes,
  chatRoomsActionType,
  allCategoriesActionType,
  addOnsActionType,
  addOnsStateType,
  postAdItemType,
  messageSchema,
  chatsStateType,
  initialMessagesActionType,
  previousMessagesActionType,
  commentsItemType,
  defaultUserInfo,
  affiliateActionType,
} from "../../types";
import { io, Socket } from "socket.io-client";

async function checkConnection() {
  return axios.get(`${process.env.REACT_APP_BACKEND_API}`);
}

function tokenConfig(revalidate?: boolean) {
  return async (dispatch: any, getState: () => stateTypes) => {
    const { token, _id } = getState().userInfo;

    const config: any = {
      headers: {
        [contentTypeHeader]: "application/json",
      },
    };

    if (!revalidate && token && _id) {
      config.headers[tokenHeader] = token;
      config.headers[userIdHeader] = _id;
    } else {
      const uid = firebase.auth().currentUser?.uid;
      const idToken = await firebase.auth().currentUser?.getIdToken();

      config.headers[tokenHeader] = idToken;
      config.headers[userIdHeader] = uid;

      dispatch(
        updateUserInfo({
          _id: uid,
          token: idToken,
        })
      );
    }

    return config;
  };
}

interface setFuckingItemsSchema extends itemsSchema {
  categoryItems: itemType[];
}
function setFuckingItems({
  serviceId,
  countryId,
  cityId,
  categoryId,
  filterBy,
  sortBy,
  categoryItems,
}: setFuckingItemsSchema) {
  return (dispatch: any) => {
    batch(() => {
      dispatch(setServiceId(serviceId));
      dispatch(
        setDestination({
          countryId,
          cityId,
        })
      );

      dispatch(
        setTitle({
          shouldFetch: false,
          servicesTitle: {
            categoryId,
            serviceId,
            countryId,
            cityId,
          },
        })
      );

      dispatch(
        setServicesCategoryItems({
          serviceId,

          countryId,
          cityId,

          categoryId,
          categoryItems,
          shouldFetch: false,
          filterBy,
          sortBy,
        })
      );

      dispatch(setOurServicesUrlValid(true));
      dispatch(setServicesLoading(false));
    });
  };
}

function notAvailable() {
  return (dispatch: any) => {
    batch(() => {
      dispatch(setOurServicesUrlValid(false));
      dispatch(setServicesLoading(false));
    });
  };
}

// ------------------><--------------------
let socket: Socket | undefined = undefined;
/* --------------------Sockets---------------- */
function subscribeToChatRooms() {
  return (dispatch: any) => {
    socket?.on(chatRoomConst, (data: chatRoomResponseSchema[]) => {
      const chatRooms: chatRoomsStateType = {};
      const chats: chatsStateType = {};
      data.forEach((chat: chatRoomResponseSchema) => {
        chatRooms[chat._id] = chat.members;
        chats[chat._id] = chat.messages;
      });

      batch(() => {
        dispatch(setChatRooms(chatRooms));
        dispatch(setInitialMessages(chats));
      });
    });
  };
}

function subscribeToChatMessages() {
  return (dispatch: any) => {
    socket?.on(messageConst, (data: messageSchema) => {
      dispatch(setMessage(data));
    });
  };
}

function initiateSocket() {
  return async (dispatch: any, getState: () => stateTypes) => {
    const isLoggedIn = getState().userInfo.isLoggedIn;
    if (!isLoggedIn) return;

    const header = await dispatch(tokenConfig(true));

    socket = io(`${process.env.REACT_APP_BACKEND_API}`, {
      extraHeaders: header.headers,
      upgrade: false,
    });

    socket.once("connect", () => {
      console.log("Socket Connected");
      dispatch(subscribeToChatRooms());
      dispatch(subscribeToChatMessages());
    });

    socket.on("connect_error", (err: Error) => {
      console.error(err.message); // not authorized
      if (err.message === "invalid token") {
        console.log("Invalid");
      }
    });

    socket.on("disconnect", () => {
      socket?.offAny();
    });
  };
}

export function disconnectSocket() {
  if (socket) {
    socket.offAny();
    socket.disconnect();
    socket = undefined;
    console.log("socket disconnected");
  }
}

export function socketEmit(event: string, arg: { [key: string]: string }) {
  socket?.emit(event, arg);
}

/* --------------------------------------------- */

export function setServicesLoading(payload: boolean): booleanActionType {
  return {
    type: setServicesLoadingConst,
    payload,
  };
}

// ------------------><--------------------
export function setServiceId(payload: string): stringActionType {
  return {
    type: setServiceIdConst,
    payload,
  };
}

// ------------------><--------------------
export function setServicesCategoryItems(
  payload: itemsActionType["payload"]
): itemsActionType {
  return {
    type: setItemsConst,
    payload,
  };
}
export function addToItems(
  payload: addOnToItemsActionType["payload"]
): addOnToItemsActionType {
  return {
    type: addToItemsConst,
    payload,
  };
}
// ------------------><--------------------

interface basicItemsSchema {
  serviceId: string;
  countryId: string;
  cityId: string;
  categoryId: string;
}

interface itemsSchema extends basicItemsSchema, promiseSchema {
  filterBy: string | null;
  sortBy: string | null;
}

interface fetchItemsSchema extends promiseSchema {
  serviceId: string | null;
  countryId: string | null;
  cityId: string | null;
  categoryId: string;
  filterBy: string | null;
  sortBy: string | null;
}

// ------------------><--------------------
export function setTitle(payload: titleActionType["payload"]): titleActionType {
  return {
    type: setServicesSearchTitleConst,
    payload,
  };
}

export function fetchTitle({ Then, Catch, InvalidRequest }: promiseSchema) {
  return (dispatch: any, getState: () => stateTypes) => {
    const { countryId, cityId } = getState().destination;

    const serviceId = getState().serviceId;

    if (!countryId?.length || !cityId?.length || !serviceId?.length) {
      dispatch(setSnackBar("Invalid request"));
      InvalidRequest?.();
      return;
    }

    dispatch(setServicesLoading(true));
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API}/categories/${serviceId}/${countryId}/${cityId}?limit=1`
      )
      .then((result) => {
        if (result.data.success) {
          let servicesCategories: {
            [key: string]: categoriesItemType;
          } = {};

          result.data.result?.forEach((category: any) => {
            servicesCategories[category._id] = {
              ...category,
              categoryId: category._id,
              serviceId: serviceId,

              countryId,
              cityId,
            };
          });

          const categoryId = Object.keys(servicesCategories)[0];

          batch(() => {
            dispatch(
              setTitle({
                shouldFetch: false,
                servicesTitle: {
                  serviceId,
                  countryId,
                  cityId,
                  categoryId,
                },
              })
            );
            dispatch(setServicesLoading(false));
            dispatch(
              setCategories({
                serviceId,
                countryId,
                cityId,
                allCategories: {
                  shouldFetch: true,
                  servicesCategories,
                },
              })
            );
          });
          Then?.();
        } else {
          batch(() => {
            dispatch(
              setSnackBar("Error, unsuccessful request for fetching title!")
            );
            dispatch(setServicesLoading(false));
          });
          Then?.();
        }
      })
      .catch((err) => {
        console.log(err);
        batch(() => {
          dispatch(
            setSnackBar("Error, Unable to to fetch title at the moment!")
          );
          dispatch(setServicesLoading(false));
        });

        Catch?.(err);
      });
  };
}

// ------------------><--------------------
function setServicesHeadings(
  payload: headingsActionType["payload"]
): headingsActionType {
  return {
    type: setServicesHeadingsConst,
    payload,
  };
}

export function setWhiteListDestinations(
  payload: whiteListDestinationsActionType["payload"]
): whiteListDestinationsActionType {
  return {
    type: setWhiteListDestinationsConst,
    payload,
  };
}

export function fetchWhiteListDestinations({
  Then,
  Catch,
  InvalidRequest,
}: promiseSchema) {
  return (dispatch: any, getState: () => stateTypes) => {
    const serviceId = getState().serviceId?.toLocaleLowerCase();
    const destination = getState().destination;

    if (!serviceId) {
      dispatch(
        setSnackBar("Invalid Request! Unable to determine the active service.")
      );
      InvalidRequest?.();
      return;
    }

    dispatch(setServicesLoading(true));

    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/destinations/${serviceId}`)
      .then((result) => {
        if (result.data?.success) {
          try {
            const allDestinations: any = {};
            for (let destinationObj of result.data.result) {
              allDestinations[destinationObj._id] = destinationObj.cities;
            }

            const countries = Object.keys(allDestinations);
            const countryId =
              destination.countryId &&
              countries.indexOf(destination.countryId) > -1
                ? destination.countryId
                : countries?.[0];
            const cityId =
              destination.cityId &&
              allDestinations[countryId]?.indexOf(destination.cityId) > -1
                ? destination.cityId
                : allDestinations[countryId]?.[0];

            // setTimeout(() => {
            batch(() => {
              dispatch(setServicesLoading(false));
              dispatch(
                setWhiteListDestinations({
                  serviceId,
                  destinations: allDestinations,
                })
              );
              dispatch(
                setDestination({
                  countryId,
                  cityId,
                })
              );
            });
            Then?.();
            // }, 1500);
          } catch (error) {
            dispatch(setServicesLoading(false));

            console.error({ error });
          }
        } else {
          console.log("Error in fetchingwhiteList");
          batch(() => {
            dispatch(setSnackBar("Unable to find any countries!"));
            dispatch(setServicesLoading(false));
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(setServicesLoading(false));
        Catch?.(err);
      });
  };
}

// ------------------><--------------------

export function fetchItems({
  serviceId,
  countryId,
  cityId,
  categoryId,
  filterBy,
  sortBy,
  Then,
  Catch,
  InvalidRequest,
}: fetchItemsSchema) {
  return (dispatch: any) => {
    const query = `?query=true${serviceId ? "&service=" + serviceId : ""}${
      countryId ? "&country=" + countryId : ""
    }${cityId ? "&city=" + cityId : ""}${sortBy ? "&sorting=" + sortBy : ""}${
      filterBy ? "&filter=" + filterBy : ""
    }`;

    // console.log(query);

    dispatch(setServicesLoading(true));
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API}/items/search/${categoryId}${query}`
      )
      .then((res) => {
        if (res.data?.success) {
          setTimeout(() => {
            dispatch(
              setFuckingItems({
                categoryId: categoryId ?? global,
                cityId: cityId ?? global,
                countryId: countryId ?? global,
                serviceId: serviceId ?? global,
                filterBy,
                sortBy,
                categoryItems: res.data.result,
              })
            );
            Then?.();
          }, 1500);
        } else {
          dispatch(notAvailable());
          InvalidRequest?.();
        }
      })
      .catch((err) => {
        console.error(err);
        dispatch(notAvailable());
        Catch?.(err);
      });
  };
}

interface fetchOurServicesItemSchema {
  itemParam: string;
}
export function fetchOurServicesItem({
  itemParam,
}: fetchOurServicesItemSchema) {
  return (dispatch: any) => {
    dispatch(setServicesLoading(true));
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/items/${itemParam}`)
      .then((result) => {
        if (result.data?.success) {
          const item = result.data.result;

          const { countryId, cityId, serviceId, categoryId } = item;

          batch(() => {
            dispatch(setServiceId(item.serviceId));

            dispatch(
              setDestination({
                countryId,
                cityId,
              })
            );
            dispatch(
              setTitle({
                shouldFetch: false,
                servicesTitle: {
                  categoryId,
                  serviceId,

                  countryId,
                  cityId,
                },
              })
            );

            dispatch(
              addToItems({
                serviceId,

                countryId,
                cityId,

                categoryId,
                categoryItems: [item],
              })
            );
            dispatch(setServicesLoading(false));
          });
        } else {
          batch(() => {
            dispatch(setOurServicesUrlValid(false));
            dispatch(setServicesLoading(false));
          });
        }
      })
      .catch((err) => {
        batch(() => {
          dispatch(setOurServicesUrlValid(false));
          dispatch(setServicesLoading(false));
        });
        console.error(err);
      });
  };
}

// ------------------><--------------------
function setAllCategories(
  payload: allCategoriesActionType["payload"]
): allCategoriesActionType {
  return {
    type: setAllCategoriesConst,
    payload,
  };
}

interface allCategoriesSchema extends promiseSchema {
  serviceId: string;
}
export function fetchAllCategories({
  Then,
  Catch,

  serviceId,
}: allCategoriesSchema) {
  return (dispatch: any) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/categories/all/${serviceId}`)
      .then((result) => {
        if (result.data?.success) {
          dispatch(
            setAllCategories({
              serviceId,
              allCategories: result.data.result,
            })
          );

          Then?.();
        }
      })
      .catch((err) => Catch?.(err));
  };
}
// ------------------><--------------------

function setCategories(
  payload: categoriesActionType["payload"]
): categoriesActionType {
  return {
    type: setCategoriesConst,
    payload,
  };
}
export function fetchCategories({Then, Catch, InvalidRequest}:promiseSchema) {
  return (dispatch: any, getState: () => stateTypes) => {
    console.log("hello");

    const serviceId = getState().serviceId;
    const { countryId, cityId } = getState().destination;
    if (!countryId || !cityId || !serviceId) {
      dispatch(setSnackBar("Invalid Request! Missing Proper credentials."));
      InvalidRequest?.();
      return;
    }

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API}/categories/${serviceId}/${countryId}/${cityId}`
      )
      .then((response) => {
        if (response.data?.success) {
          const servicesCategories: {
            [key: string]: categoriesItemType;
          } = {};
          response.data?.result?.forEach((category: any) => {
            servicesCategories[category._id] = {
              ...category,
              countryId,
              cityId,
              categoryId: category._id,
              serviceId: serviceId,
            };
          });

          console.log(servicesCategories);

          if (Object.keys(servicesCategories).length) {
            dispatch(
              setCategories({
                serviceId: serviceId,
                countryId,
                cityId,
                allCategories: {
                  shouldFetch: false,
                  servicesCategories,
                },
              })
            );
          }

          Then?.();
        }
      })
      .catch((err) => {
        console.log(err);
        Catch?.(err);
      });
  };
}

// ------------------><--------------------

export function setComments(payload: commentsActionType["payload"]) {
  return {
    type: setCommentsConst,
    payload,
  };
}

interface fetchCommentsSchema {
  itemParam: string;
}
export function fetchComments({ itemParam }: fetchCommentsSchema) {
  return (dispatch: any) => {
    if (!itemParam) {
      return;
    }

    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/comments/${itemParam}`)
      .then((result) => {
        if (result.data.success) {
          dispatch(
            setComments({
              _id: itemParam,
              comments: result.data.result ?? [],
            })
          );
        } else {
          dispatch(setSnackBar("Unable to fetch comments at the moment!"));
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(setSnackBar("Error, Invalid request for fetching comments!"));
      });
  };
}

// ------------------><--------------------
export function fetchHeadings() {
  return (dispatch: any) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/headings`)
      .then((result) => {
        if (result.data?.success) {
          let payload: any = {};
          result.data.result?.forEach((headings: any) => {
            const key = headings._id;
            delete headings._id;
            payload[key] = {
              shouldFetch: false,
              headings,
            };
          });
          dispatch(setServicesHeadings(payload));
        } else {
          dispatch(setSnackBar("Unable to find any headings!"));
        }
      })
      .catch((err) => {
        dispatch(
          setSnackBar(
            "Unable to connect to the server! Please check your connection."
          )
        );
      });
  };
}

// ------------------><--------------------

export function addToCart(payload: cartActionType["payload"]): cartActionType {
  return {
    type: addToCartConst,
    payload,
  };
}
// ------------------><--------------------
export function removeFromCart(
  payload: cartActionType["payload"]
): cartActionType {
  return {
    type: removeFromCartConst,
    payload,
  };
}
// ------------------><--------------------
export function updateCart(payload: cartActionType["payload"]): cartActionType {
  return {
    type: updateCartConst,
    payload,
  };
}
// ------------------><--------------------
export function emptyCart() {
  return {
    type: emptyCartConst,
  };
}
// ------------------><--------------------
export function setDestination(
  payload: destinationActionType["payload"]
): destinationActionType {
  return {
    type: setDestinationConst,
    payload,
  };
}

// ------------------><--------------------
export const setOurServicesUrlValid = (payload: boolean): booleanActionType => {
  return {
    type: setOurServicesUrlValidConst,
    payload,
  };
};

// ------------------><--------------------
export const setChatRooms = (
  payload: chatRoomsActionType["payload"]
): chatRoomsActionType => {
  return {
    type: chatRoomConst,
    payload,
  };
};
// ------------------><--------------------
export const setInitialMessages = (
  payload: initialMessagesActionType["payload"]
): initialMessagesActionType => {
  return {
    type: setInitialMessagesConst,
    payload,
  };
};
export const setMessage = (payload: messageSchema) => {
  return {
    type: messageConst,
    payload,
  };
};

const addPreviousMessages = (
  payload: previousMessagesActionType["payload"]
): previousMessagesActionType => {
  return {
    type: addPreviousMessagesConst,
    payload,
  };
};

interface fetchChatMessagesSchema extends promiseSchema {
  chatRoomId: string;
  chatId: string;
}
export function fetchChatMessages({
  chatRoomId,
  chatId,
  Then,
  Catch,
  InvalidRequest,
}: fetchChatMessagesSchema) {
  return async (dispatch: any) => {
    const header = await dispatch(tokenConfig());

    axios
      .get(
        `${process.env.REACT_APP_BACKEND_API}/chats/${chatRoomId}?chatId=${chatId}`,
        header
      )
      .then((response) => {
        if (!response.data.success) {
          dispatch(setSnackBar("Unable to verify request at the moment!"));
          return InvalidRequest?.();
        }
        // setTimeout(() => {
        if (response.data.result?.length === 0) {
          dispatch(setSnackBar("No more messages!"));
          return Then?.();
        }

        dispatch(
          addPreviousMessages({
            chatRoomId,
            messages: response.data.result ?? [],
          })
        );

        Then?.();
        // }, 2000);
      })
      .catch((err) => {
        dispatch(setSnackBar("An Error Occured While Fetching Messages"));
        return Catch?.(err);
      });
  };
}

// ------------------><--------------------
export const setPendingAds = (
  payload: pendingAdsActionType["payload"]
): pendingAdsActionType => {
  return {
    type: setPendingAdsConst,
    payload,
  };
};
// ------------------><--------------------
export const setActiveAds = (
  payload: activeAdsActionType["payload"]
): activeAdsActionType => {
  return {
    type: setActiveAdsConst,
    payload,
  };
};
// ------------------><--------------------
export const setUserInfo = (
  payload: userInfoActionType["payload"]
): userInfoActionType => {
  return {
    type: setUserInfoConst,
    payload,
  };
};
export const updateUserInfo = (
  payload: updateUserInfoActionType["payload"]
): updateUserInfoActionType => {
  return {
    type: updateUserInfoConst,
    payload,
  };
};
export const removeUserInfo = (): any => {
  return {
    type: removeUserInfoConst,
  };
};

// ------------------><--------------------
export const setFavorites = (
  payload: setFavoritesActionType["payload"]
): setFavoritesActionType => {
  return {
    type: setFavoritesConst,
    payload,
  };
};
export const removeFavorites = (
  payload: removeFavoritesActionType["payload"]
): removeFavoritesActionType => {
  return {
    type: removeFavoritesConst,
    payload,
  };
};

// -----------------><----------------
export const setOrders = (
  payload: ordersActionType["payload"]
): ordersActionType => {
  return {
    type: setOrdersConst,
    payload,
  };
};

export function setSnackBar(payload: string): stringActionType {
  return {
    type: setSnackBarConst,
    payload,
  };
}
export function clearSnackBar(): any {
  return {
    type: clearSnackBarConst,
  };
}

export function setAlert(payload: alertActionType["payload"]): alertActionType {
  return {
    type: setAlertConst,
    payload,
  };
}

export function clearAlert() {
  return {
    type: clearAlertConst,
  };
}

export function setCurrency(
  payload: currencyActionType["payload"]
): currencyActionType {
  return {
    type: setCurrencyConst,
    payload,
  };
}

export function currencyPanYuk(currencyCode: string) {
  return (dispatch: any) => {
    dispatch(setActivityInProgress());
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/currency/${currencyCode}`)
      .then((response) => {
        if (!response.data.success) {
          return batch(() => {
            dispatch(
              setSnackBar(
                "Could not proceed to request at the moment! Try a different currency."
              )
            );
            dispatch(clearActivityInProgress());
          });
        }

        const rate = response.data.result;

        batch(() => {
          dispatch(
            setCurrency({
              currencyCode: currencyCode,
              exchangeRate: rate,
            })
          );
          dispatch(
            setSnackBar(`${currencyCode} is now your default currency!`)
          );
          dispatch(clearActivityInProgress());
        });
      })
      .catch(() => {
        batch(() => {
          dispatch(clearActivityInProgress());
          dispatch(
            setSnackBar(
              "Unable to change currency. Please check your connection!"
            )
          );
        });
      });
  };
}

export function setActivityInProgress() {
  return {
    type: setActivityInProgressConst,
  };
}
export function clearActivityInProgress() {
  return {
    type: clearActivityInProgressConst,
  };
}

export function verifyUser() {
  return async (dispatch: any) => {
    const header = await dispatch(tokenConfig(true));

    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/user`, header)
      .then((response) => {
        if (response.data.success) {
          const newUserInfo = response.data.result;
          const { displayName, email, emailVerified, phoneNumber, photoURL } =
            firebase.auth().currentUser ?? defaultUserInfo;

          if (
            !(
              displayName === newUserInfo.displayName &&
              email === newUserInfo.email &&
              emailVerified === newUserInfo.emailVerified &&
              phoneNumber === newUserInfo.phoneNumber &&
              photoURL === newUserInfo.photoURL
            )
          ) {
            console.log("Updating User Info On Verification!");
            dispatch(updateUserRequest({}));
          }

          batch(() => {
            dispatch(initiateSocket());
            dispatch(
              setUserInfo({
                ...response.data.result,
                token: header.headers["Authorization"],
              })
            );
          });
        } else {
          dispatch(setSnackBar("Unable to login at the moment!"));

          firebase.auth().signOut();
        }
      })
      .catch((error) => {
        dispatch(setSnackBar("An error occurred while logging in!"));

        firebase.auth().signOut();
        console.error({ error });
      });
  };
}

export function updateUserRequest({
  Then,
  Catch,
  InvalidRequest,
}: promiseSchema) {
  return async (dispatch: any, getState: () => stateTypes) => {
    const isLoggedIn = getState().userInfo.isLoggedIn;

    if (!isLoggedIn) return InvalidRequest?.();

    const header = await dispatch(tokenConfig());

    axios
      .put(`${process.env.REACT_APP_BACKEND_API}/user`, {}, header)
      .then((result) => {
        if (result.data?.success) {
          const user = firebase.auth().currentUser;
          batch(() => {
            dispatch(
              updateUserInfo({
                displayName: user?.displayName,
                email: user?.email,
                emailVerified: user?.emailVerified,
                phoneNumber: user?.phoneNumber,
                photoURL: user?.photoURL,
              })
            );
            dispatch(setSnackBar("Successfully updated information"));
          });

          Then?.();
        } else {
          batch(() => {
            dispatch(setSnackBar("Unable to update user information!"));

            dispatch(
              updateUserInfo({
                token: "",
              })
            );
          });
          Then?.();
        }
      })
      .catch(async (err) => {
        if (err.response?.data?.message?.code === "auth/id-token-expired") {
          await dispatch(tokenConfig(true));
          Catch?.();
          return;
        }
        console.error(err);

        dispatch(setSnackBar("Unable to update user information!"));
        Catch?.(err);
      });
  };
}

export function fetchPendingAds({ Then, Catch }: promiseSchema) {
  return async (dispatch: any) => {
    const header = await dispatch(tokenConfig());

    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/ads/pending`, header)
      .then((response) => {
        if (response.data.success) {
          // setTimeout(() => {
          dispatch(setPendingAds(response.data.result ?? []));
          Then?.();
          // }, 1500);
        } else {
          batch(() => {
            dispatch(setSnackBar("Unable to get pending ads at the moment!"));
            dispatch(
              updateUserInfo({
                token: "",
              })
            );
          });
        }
      })
      .catch(async (err) => {
        if (err.response?.data?.message?.code === "auth/id-token-expired") {
          await dispatch(tokenConfig(true));
          Catch?.();
          return;
        }
        dispatch(setSnackBar("Error, unauthorized request!"));
        Catch?.();
      });
  };
}
export function fetchActiveAds({ Then, Catch, InvalidRequest }: promiseSchema) {
  return async (dispatch: any) => {
    const header = await dispatch(tokenConfig());

    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/ads/active`, header)
      .then((response) => {
        if (response.data.success) {
          // setTimeout(() => {
          dispatch(setActiveAds(response.data.result ?? []));
          Then?.();
          // }, 1500);
        } else {
          batch(() => {
            dispatch(setSnackBar("Unable to get pending ads at the moment!"));
            dispatch(
              updateUserInfo({
                token: "",
              })
            );
          });
        }
      })
      .catch(async (err) => {
        if (err.response?.data?.message?.code === "auth/id-token-expired") {
          await dispatch(tokenConfig(true));
          Catch?.();
          return;
        }
        dispatch(setSnackBar("Error, unauthorized request!"));
        Catch?.();
      });
  };
}

interface updateNameAndImageSchema extends promiseSchema {
  type: string;
  firebasePic: Uint8Array;
  newName: string;
}
export const updateNameAndImage = ({
  type,
  firebasePic,
  newName,
  Then,
  Catch,
  InvalidRequest,
}: updateNameAndImageSchema) => {
  return (dispatch: any, getState: () => stateTypes) => {
    const _id = getState().userInfo._id;
    const currentUser = firebase.auth().currentUser;
    if (!_id || !currentUser) return InvalidRequest?.();
    const metadata = {
      contentType: type,
    };
    const storageRef = firebase.storage().ref(`profilePictures/${_id}`);

    storageRef
      .put(firebasePic, metadata)
      .then(() => {
        storageRef.getDownloadURL().then((url) => {
          currentUser
            ?.updateProfile({
              photoURL: url,
              displayName: newName,
            })
            .then(() => {
              dispatch(updateUserRequest({ Then, Catch, InvalidRequest }));
            })
            .catch((err) => {
              dispatch(setSnackBar("Unable to update profile at the moment!"));
              Catch?.(err);
            });
        });
      })
      .catch(() => {
        dispatch(setSnackBar("Error, Unable to upload picture at the moment!"));
        InvalidRequest?.();
      });
  };
};

interface updateImageSchema extends promiseSchema {
  type: string;
  firebasePic: Uint8Array;
}
export const updateImage = ({
  type,
  firebasePic,
  Then,
  Catch,
  InvalidRequest,
}: updateImageSchema) => {
  return (dispatch: any, getState: () => stateTypes) => {
    const _id = getState().userInfo._id;
    const currentUser = firebase.auth().currentUser;
    if (!_id || !currentUser) return InvalidRequest?.();
    const metadata = {
      contentType: type,
    };
    const storageRef = firebase.storage().ref(`profilePictures/${_id}`);

    storageRef
      .put(firebasePic, metadata)
      .then(() => {
        storageRef.getDownloadURL().then((url) => {
          currentUser
            ?.updateProfile({
              photoURL: url,
            })
            .then(() => {
              dispatch(updateUserRequest({ Then, Catch, InvalidRequest }));
            })
            .catch((err) => {
              dispatch(setSnackBar("Unable to update profile at the moment!"));
              Catch?.(err);
            });
        });
      })
      .catch(() => {
        dispatch(setSnackBar("Error, Unable to upload picture at the moment!"));
      });
  };
};

interface updateNameSchema extends promiseSchema {
  newName: string;
}
export const updateName = ({
  newName,
  Then,
  Catch,
  InvalidRequest,
}: updateNameSchema) => {
  return (dispatch: any, getState: () => stateTypes) => {
    const _id = getState().userInfo._id;
    const currentUser = firebase.auth().currentUser;
    if (!_id || !currentUser) return InvalidRequest?.();
    currentUser
      .updateProfile({
        displayName: newName,
      })
      .then(() => {
        dispatch(updateUserRequest({ Then, Catch, InvalidRequest }));
      })
      .catch((err) => {
        dispatch(setSnackBar("Unable to update profile at the moment!"));
        Catch?.(err);
      });
  };
};
type ordersSchema = {
  itemId: string;
  serviceId: string;
  countryId: string;
  cityId: string;
  categoryId: string;
  startDate: Date;
  endDate: Date;
  addOns: {
    title: string;
    price: number;
    quantity: number;
  }[];
  userId: string;
}[];

export function postOrders({ Then, Catch, InvalidRequest }: promiseSchema) {
  return async (dispatch: any, getState: () => stateTypes) => {
    const { _id, isLoggedIn, email, emailVerified, displayName } =
      getState().userInfo;
    const { currencyCode, exchangeRate } = getState().currency;
    const cart = getState().cart;

    if (!isLoggedIn || !email || !emailVerified) return InvalidRequest?.();

    const header = await dispatch(tokenConfig());

    const orders: ordersSchema = [];
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
                userId: _id,
              });
            }
          }
        }
      }
    }
    if (!orders.length) return InvalidRequest?.();

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/orders`,
        {
          payload: orders,
          meta: { email, displayName, currencyCode, exchangeRate },
        },
        header
      )
      .then(() => {
        dispatch(emptyCart());
        Then?.();
      })
      .catch(async (err) => {
        if (err.response?.data?.message?.code === "auth/id-token-expired") {
          await dispatch(tokenConfig(true));
          Catch?.();
          return;
        }
        Catch?.(err);
      });
  };
}

export function fetchOrders({ Then, Catch, InvalidRequest }: promiseSchema) {
  return async (dispatch: any, getState: () => stateTypes) => {
    const isLoggedIn = getState().userInfo.isLoggedIn;
    if (!isLoggedIn) return InvalidRequest?.();

    const header = await dispatch(tokenConfig());

    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/orders`, header)
      .then((response) => {
        if (response.data?.success) {
          // setTimeout(() => {
          dispatch(setOrders(response.data.result));
          Then?.();
          // }, 1500);
        } else {
          batch(() => {
            dispatch(setSnackBar("Unable to fetch orders at the moment!"));
            dispatch(
              updateUserInfo({
                token: "",
              })
            );
          });
        }
      })
      .catch(async (err) => {
        console.log(err);
        if (err.response?.data?.message?.code === "auth/id-token-expired") {
          await dispatch(tokenConfig(true));
          Catch?.();
          return;
        }
        dispatch(setSnackBar("Error, Unauthorized request"));
        Catch?.(err);
      });
  };
}

export function fetchFavorites({ Then, Catch, InvalidRequest }: promiseSchema) {
  return async (dispatch: any, getState: () => stateTypes) => {
    const { favorites, isLoggedIn } = getState().userInfo;
    const header = await dispatch(tokenConfig());

    const favor = getState().favorites.reduce(
      (array: string[], favority) => array.concat(favority._id),
      []
    );

    let favoritiesIdsToFetch: string[] = [];
    if (favorites.length > favor.length) {
      favoritiesIdsToFetch = favorites.filter((id) => favor.indexOf(id) === -1);
    } else if (favor.length > favorites.length) {
      favoritiesIdsToFetch = favor.filter((id) => favorites.indexOf(id) === -1);
    }

    if (!favoritiesIdsToFetch.length || !isLoggedIn) return InvalidRequest?.();

    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/favorites`, header)
      .then((response) => {
        if (response.data?.success) {
          // setTimeout(() => {
          dispatch(setFavorites(response.data.result));
          Then?.();
          // }, 1500);
        } else {
          batch(() => {
            dispatch(setSnackBar("Unable to favor orders at the moment!"));
            dispatch(
              updateUserInfo({
                token: "",
              })
            );
          });
        }
      })
      .catch(async (err) => {
        if (err.response?.data?.message?.code === "auth/id-token-expired") {
          await dispatch(tokenConfig(true));
          Catch?.();
          return;
        }
        dispatch(setSnackBar("Error, Unauthorized request"));
        Catch?.(err);
      });
  };
}

interface favoritesSchema extends promiseSchema {
  itemId: string;
}
export function addToFavorites({
  itemId,
  Then,
  Catch,
  InvalidRequest,
}: favoritesSchema) {
  return async (dispatch: any, getState: () => stateTypes) => {
    const { isLoggedIn, favorites } = getState().userInfo;

    if (favorites.indexOf(itemId) > -1 || !isLoggedIn) {
      return InvalidRequest?.();
    }

    const header = await dispatch(tokenConfig());

    dispatch(updateUserInfo({ favorites: [...favorites, itemId] }));
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/favorites`,
        {
          payload: itemId,
        },
        header
      )
      .then((response) => {
        if (!response.data?.success) {
          batch(() => {
            dispatch(setSnackBar("Unable to fetch favorites at the moment!"));
            dispatch(updateUserInfo({ favorites: [...favorites], token: "" }));
          });
        }

        Then?.();
      })
      .catch(async (err) => {
        if (err.response?.data?.message?.code === "auth/id-token-expired") {
          await dispatch(tokenConfig(true));
          Catch?.();
          return;
        }

        batch(() => {
          dispatch(setSnackBar("Error, Unauthorized request"));
          dispatch(updateUserInfo({ favorites: [...favorites] }));
        });
        Catch?.(err);
      });
  };
}

export function removeFromFavorites({
  itemId,
  Then,
  Catch,
  InvalidRequest,
}: favoritesSchema) {
  return async (dispatch: any, getState: () => stateTypes) => {
    const { isLoggedIn, favorites } = getState().userInfo;
    const header = await dispatch(tokenConfig());

    if (favorites.indexOf(itemId) === -1 || !isLoggedIn)
      return InvalidRequest?.();
    dispatch(
      updateUserInfo({
        favorites: favorites.filter((favority) => favority !== itemId),
      })
    );

    axios
      .delete(
        `${process.env.REACT_APP_BACKEND_API}/favorites/${itemId}`,
        header
      )
      .then((response) => {
        if (!response.data?.success) {
          batch(() => {
            dispatch(
              updateUserInfo({
                favorites: [...favorites, itemId],
                token: "",
              })
            );
            dispatch(setSnackBar("Unable to fetch favor at the moment!"));
          });
        }

        Then?.();
      })
      .catch(async (err) => {
        if (err.response?.data?.message?.code === "auth/id-token-expired") {
          await dispatch(tokenConfig(true));
          Catch?.();
          return;
        }
        batch(() => {
          dispatch(
            updateUserInfo({
              favorites: [...favorites, itemId],
            })
          );
          dispatch(setSnackBar("Error, Unauthorized request"));
        });
        Catch?.(err);
      });
  };
}

function setAddOns(payload: addOnsActionType["payload"]): addOnsActionType {
  return {
    type: setAddOnsConst,
    payload,
  };
}
export function fetchAddOns() {
  return (dispatch: any) => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/add-ons`)
      .then((response) => {
        if (!response.data?.success) {
          return dispatch(
            setSnackBar("Unable to fetch add-ons at the moment!")
          );
        }

        const addOns: addOnsStateType = {};

        response.data?.result?.forEach((addOn: any) => {
          addOns[addOn._id] = addOn.options;
        });

        dispatch(setAddOns(addOns));
      })
      .catch((err) => {
        console.error(err);
        return dispatch(
          setSnackBar("An error occured while fetching add-ons!")
        );
      });
  };
}

interface postAdSchema extends promiseSchema {
  item: postAdItemType;
}
export function postAd({ item, Then, Catch, InvalidRequest }: postAdSchema) {
  return (dispatch: any) => {
    const { pictures, userId } = item;

    checkConnection()
      .then(async (response) => {
        if (!response.data.success) {
          batch(() => {
            dispatch(setSnackBar("Sorry An Error Occurred! 🙁"));
          });

          return InvalidRequest?.();
        }
        let pictureLinks: string[] = [];
        let promise = new Promise((resolve, reject) => {
          pictures.forEach((file) => {
            const metadata = {
              contentType: file.firebase.type,
            };

            const storageRef = firebase
              .storage()
              .ref(
                `items/${userId}/vurtos-hotels-cars-security-vacations-${
                  Date.now() + file.firebase.name
                }`
              );

            storageRef
              .put(file.firebase, metadata)
              .then(() => {
                storageRef
                  .getDownloadURL()
                  .then((url) => {
                    if (pictureLinks.length === pictures.length - 1)
                      resolve(true);

                    pictureLinks.push(url);
                  })
                  .catch(() => {
                    pictureLinks.forEach((img) => {
                      firebase.storage().refFromURL(img).delete();
                    });

                    dispatch(setSnackBar("Error in posting pictures"));
                    return reject();
                  });
              })
              .catch((err) => {
                pictureLinks.forEach((img) => {
                  firebase.storage().refFromURL(img).delete();
                });
                dispatch(setSnackBar("Error in uploading pictures"));
                return reject();
              });
          });
        });

        const header = await dispatch(tokenConfig(true));
        promise
          .then(() => {
            axios
              .post(
                `${process.env.REACT_APP_BACKEND_API}/ads/pending`,
                {
                  payload: {
                    ...item,
                    pictures: pictureLinks,
                  },
                },
                header
              )
              .then(() => {
                dispatch(
                  setSnackBar("🥳 Congradulations Your Ad Is Live Now! 🎉")
                );
                Then?.();
              })
              .catch((err) => {
                pictureLinks.forEach((img) => {
                  firebase.storage().refFromURL(img).delete();
                });

                dispatch(setSnackBar("Unable to post ad! 🙁"));
                console.log(err);

                Catch?.(err);
              });
          })
          .catch((err) => {
            pictureLinks.forEach((img) => {
              firebase.storage().refFromURL(img).delete();
            });

            dispatch(setSnackBar("Could Not Post Ad Due To An Error! 🙁"));

            Catch?.(err);
          });
      })
      .catch((err) => {
        dispatch(setSnackBar("Could Not Connect To Servers At The Moment 🙁"));

        Catch?.(err);
      });
  };
}

function setReviews(payload: commentsItemType[]) {
  return {
    type: setReviewsConst,
    payload,
  };
}
export function fetchReviews() {
  return (dispatch: any, getState: () => stateTypes) => {
    const reviewsAvailable = getState().reviews.length > 0;
    if (reviewsAvailable) return;

    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/comments`)
      .then((response) => {
        if (!response.data?.success) {
          return dispatch(
            setSnackBar("Unable to fetch reviews at the moment!")
          );
        }

        dispatch(setReviews(response.data.result));
      })
      .catch(() => {
        dispatch(setSnackBar("An error occured while fetching reviews!"));
      });
  };
}

export function setAffiliateInfo(
  payload: affiliateActionType["payload"]
): affiliateActionType {
  return {
    type: setAffiliateInfoConst,
    payload,
  };
}

export function setAffiliateId(payload: string): stringActionType {
  return {
    type: setAffiliateIdConst,
    payload,
  };
}

export function clearAffiliateInfo() {
  return {
    type: clearAffiliateInfoConst,
  };
}

interface affiliatesJoinSchema extends promiseSchema {
  pictures: any[];
  affiliations: string[];
  websiteName: string;
  websiteUrl: string;
  industry: string;
  promoCode: string;
}
export function requestJoinAffiliatesProgram({
  pictures,
  affiliations,
  websiteName,
  websiteUrl,
  industry,
  promoCode,
  Then,
  Catch,
}: affiliatesJoinSchema) {
  return async (dispatch: any, getState: () => stateTypes) => {
    const userId = getState().userInfo._id;

    let identityPictures: string[] = [];
    let promise = new Promise((resolve, reject) => {
      pictures.forEach((file) => {
        const metadata = {
          contentType: file.firebase.type,
        };

        const storageRef = firebase
          .storage()
          .ref(
            `affiliates/${userId}/vurtos-hotels-cars-security-vacations-${
              Date.now() + file.firebase.name
            }`
          );

        storageRef
          .put(file.firebase, metadata)
          .then(() => {
            storageRef
              .getDownloadURL()
              .then((url) => {
                if (identityPictures.length === pictures.length - 1) {
                  resolve(true);
                }

                identityPictures.push(url);
              })
              .catch((err) => {
                identityPictures.forEach((img) => {
                  firebase.storage().refFromURL(img).delete();
                });

                dispatch(setSnackBar("Error in posting pictures"));
                return reject();
              });
          })
          .catch((err) => {
            identityPictures.forEach((img) => {
              firebase.storage().refFromURL(img).delete();
            });
            dispatch(setSnackBar("Error in uploading pictures"));
            return reject();
          });
      });
    });

    const header = await dispatch(tokenConfig(true));

    promise
      .then(() => {
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_API}/affiliates/pending`,
            {
              payload: {
                identityPictures,
                affiliations,
                websiteName,
                websiteUrl,
                industry,
                promoCode: promoCode || null,
              },
            },
            header
          )
          .then((response) => {
            if (!response.data.success)
              return setSnackBar("An Error Occured! 🎉");
            batch(() => {
              dispatch(setAffiliateInfo(response.data.result));
              dispatch(
                setSnackBar("Successfully applied for affiliate program! 🎉")
              );
            });
            Then?.();
          })
          .catch((err) => {
            identityPictures.forEach((img) => {
              firebase.storage().refFromURL(img).delete();
            });

            dispatch(
              setSnackBar(
                "Unable to apply for affiliate program at the moment!"
              )
            );
            Catch?.(err);
          });
      })
      .catch((err) => {
        Catch?.(err);
      });
  };
}
