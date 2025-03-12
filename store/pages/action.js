import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  getAboutUsPageContentApi,
  getAdvisePageContentApi,
  getAutomationPageContentApi,
  getCarDetailsContentApi,
  getCollectiePageLabelApi,
  getCollectionPageContentApi,
  getContactPageContentApi,
  getFutureProjectsApi,
  getHomePageContentApi,
  getNotFoundPageContentApi,
  getSpeedPageContentApi,
} from "@/apiConfig/services";

import {
  resetCollectionDetailsPage,
  setAboutUsPage,
  setAdvisePage,
  setCollectionDetailsPage,
  setCollectionPage,
  setContactPage,
  setHomePage,
  setNotFoundPage,
  setSpeedPage,
} from "./pagesReducer";
import {
  PAGE_DEFAULT_ID,
  LANGAUGE,
  LOCAL_STORAGE,
  PAGES_KEY,
  PAGES_LINKS,
  NOT_FOUND_PATH,
  DATA_BASE_CAR_ID,
  DEFAULT_FUTURE_CAR_ID,
} from "@/constant";
import Cookies from "js-cookies";

const getId = (pageKey) => {
  const menu = JSON.parse(localStorage.getItem(LOCAL_STORAGE.MENUS_KEY)) || [];
  const page = menu?.filter(
    (item) => pageKey === item?.connectedObject?.pageKey?.key
  );
  const id = page?.[0]?.connectedObject?.databaseId || PAGE_DEFAULT_ID[pageKey];
  return id;
};

export const fecthHomePageData = createAsyncThunk(
  "fecthHomePageData",
  async (payload, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const language =
      localStorage.getItem(LOCAL_STORAGE.LANGUAGE_KEY) ||
      LANGAUGE.DEFAULT_LANGUAGE_CODE;

    try {
      const data = (await getHomePageContentApi(language)) || {};
      console.log("thuiks", data);
      dispatch(setHomePage(data));
    } catch (error) {
      console.error("Error fetching home page data:", error);
    }
  }
);

export const fecthAboutUsPageData = createAsyncThunk(
  "fecthHomePageData",
  async (payload, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const language =
      localStorage.getItem(LOCAL_STORAGE.LANGUAGE_KEY) ||
      LANGAUGE.DEFAULT_LANGUAGE_CODE;
    const id = getId(PAGES_KEY.ABOUT_US);

    try {
      const data = (await getAboutUsPageContentApi(language)) || {};

      console.log("about data", data);

      dispatch(setAboutUsPage(data));
    } catch (error) {}
  }
);

export const fecthAdvisePageData = createAsyncThunk(
  "fecthAdvisePageData",
  async (payload, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const language =
      localStorage.getItem(LOCAL_STORAGE.LANGUAGE_KEY) ||
      LANGAUGE.DEFAULT_LANGUAGE_CODE;
    const id = getId(PAGES_KEY.ADVISE);
    try {
      const data = (await getAdvisePageContentApi(language)) || {};
      dispatch(setAdvisePage(data));
    } catch (error) {}
  }
);

export const fetchCollectionPageData = createAsyncThunk(
  "fetchCollectionPageData",
  async (payload, thunkAPI) => {
    const { dispatch } = thunkAPI;

    const id = getId(PAGES_KEY.COLLECTIVE);
    const language =
      localStorage.getItem(LOCAL_STORAGE.LANGUAGE_KEY) ||
      LANGAUGE.DEFAULT_LANGUAGE_CODE;
    try {
      const data = (await getCollectionPageContentApi(language)) || {};
      const { data: data2 } = await getCarDetailsContentApi(language);
      const { data: labelData } = await getCollectiePageLabelApi(language);
      dispatch(setCollectionPage({ ...data, ...data2, labelData }));
      console.log("data", data);
    } catch (error) {}
  }
);

export const fetchSpeedPageData = createAsyncThunk(
  "fetchSpeedPageData",
  async (payload, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const language =
      localStorage.getItem(LOCAL_STORAGE.LANGUAGE_KEY) ||
      LANGAUGE.DEFAULT_LANGUAGE_CODE;
    const id = getId(PAGES_KEY.SPEED);
    try {
      const data = (await getSpeedPageContentApi(language)) || {};
      // const { data: data2 } = await getFutureProjectsApi(DEFAULT_FUTURE_CAR_ID);

      // const obj = {
      //   ...data,
      //   futureProjectsSection: data2?.cars?.nodes,
      // };

      dispatch(setSpeedPage(data));
    } catch (error) {}
  }
);

export const fetchContactPageData = createAsyncThunk(
  "fetchContactPageData",
  async (payload, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const language =
      localStorage.getItem(LOCAL_STORAGE.LANGUAGE_KEY) ||
      LANGAUGE.DEFAULT_LANGUAGE_CODE;
    const id = getId(PAGES_KEY.CONTACT);
    try {
      const data = (await getContactPageContentApi(language)) || {};
      console.log("contact Data", data);
      dispatch(setContactPage(data));
    } catch (error) {}
  }
);

export const fetchCollectionDetailsPageData = createAsyncThunk(
  "fetchCollectionDetailsPageData",
  async (payload, { dispatch }) => {
    dispatch(resetCollectionDetailsPage());
    try {
      const language =
        localStorage.getItem(LOCAL_STORAGE.LANGUAGE_KEY) ||
        LANGAUGE.DEFAULT_LANGUAGE_CODE;
      const { data } = await getAutomationPageContentApi(payload, language);
      const { data: labelData } = await getCollectiePageLabelApi(language);

      if (data?.car) {
        dispatch(setCollectionDetailsPage({ ...data.car, labelData }));
      } else {
        window.location.href = NOT_FOUND_PATH;
      }
    } catch (error) {
      // window.location.href = NOT_FOUND_PATH;
      console.error("Error fetching collection details page data:", error);
    }
  }
);
export const fetchNotFoundPageData = createAsyncThunk(
  "fetchNotFounfPageData",
  async (payload, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const language =
        localStorage.getItem(LOCAL_STORAGE.LANGUAGE_KEY) ||
        LANGAUGE.DEFAULT_LANGUAGE_CODE;

      const id = LANGAUGE.DEFAULT_LANGUAGE_CODE === language ? 1356 : 1373;

      const { data } = await getNotFoundPageContentApi(id);

      dispatch(setNotFoundPage(data?.page));
    } catch (error) {}
  }
);
