import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../app/store";

export const LAYOUT_FEATURE_KEY = "layout";

export interface LayoutState {
  sidebarOpen: boolean;
}

export const initialLayoutState: LayoutState = {
  sidebarOpen: window.matchMedia("(min-width: 600px)").matches,
};

export const layoutSlice = createSlice({
  name: LAYOUT_FEATURE_KEY,
  initialState: initialLayoutState,
  reducers: {
    changeSidebar(state, action: PayloadAction<boolean>) {
      state.sidebarOpen = action.payload;
    },
  },
});

export const layoutReducer = layoutSlice.reducer;
export const layoutActions = layoutSlice.actions;

export const getLayoutSidebarState = (rootState: RootState): boolean =>
  rootState[LAYOUT_FEATURE_KEY].sidebarOpen;
