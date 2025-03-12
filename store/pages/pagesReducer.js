import { PAGES_LINKS } from "@/constant";
import { createSlice } from "@reduxjs/toolkit";

export const pageSlice = createSlice({
  name: "page",
  initialState: {
    home: {},
    about: {},
    advise: {},
    collection: {},
    speed: {},
    contact: {},
    collectionDetails: {},
    notFound: {},
    isLoading: false,
  },
  reducers: {
    setHomePage: (state, action) => {
      state.home = action.payload || {};
    },
    setAboutUsPage: (state, action) => {
      state.about = action.payload || {};
    },
    setAdvisePage: (state, action) => {
      state.advise = action.payload || {};
    },
    setCollectionPage: (state, action) => {
      state.collection = action.payload || {};
    },
    setSpeedPage: (state, action) => {
      state.speed = action.payload || {};
    },
    setContactPage: (state, action) => {
      state.contact = action.payload || {};
    },
    setCollectionDetailsPage: (state, action) => {
      state.collectionDetails = action.payload || {};
      state.isLoading = false;
    },
    resetCollectionDetailsPage: (state) => {
      state.collectionDetails = {};
      state.isLoading = true;
    },
    setNotFoundPage: (state, action) => {
      state.notFound = action.payload || {};
    },
    setNotFoundPage: (state, action) => {
      state.notFound = action.payload || {};
    },
  },
});

// Action creators are generated for each case reducer function
export const {
    setHomePage,
    setAboutUsPage,
    setAdvisePage,
    setCollectionPage,
    setSpeedPage,
    setContactPage,
    setCollectionDetailsPage,
    resetCollectionDetailsPage,
    setNotFoundPage,
  } = pageSlice.actions;
  
  export default pageSlice.reducer;