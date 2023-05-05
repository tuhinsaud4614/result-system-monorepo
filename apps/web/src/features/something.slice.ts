import {
  EntityState,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

export const SOMETHING_FEATURE_KEY = "something";

/*
 * Update these interfaces according to your requirements.
 */
export interface SomethingEntity {
  id: number;
}

export interface SomethingState extends EntityState<SomethingEntity> {
  loadingStatus: "not loaded" | "loading" | "loaded" | "error";
  error: string | null | undefined;
}

export const somethingAdapter = createEntityAdapter<SomethingEntity>();

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchSomething())
 * }, [dispatch]);
 * ```
 */
export const fetchSomething = createAsyncThunk(
  "something/fetchStatus",
  async (_, thunkAPI) => {
    /**
     * Replace this with your custom fetch call.
     * For example, `return myApi.getSomethings()`;
     * Right now we just return an empty array.
     */
    return Promise.resolve([]);
  },
);

export const initialSomethingState: SomethingState =
  somethingAdapter.getInitialState({
    loadingStatus: "not loaded",
    error: null,
  });

export const somethingSlice = createSlice({
  name: SOMETHING_FEATURE_KEY,
  initialState: initialSomethingState,
  reducers: {
    add: somethingAdapter.addOne,
    remove: somethingAdapter.removeOne,
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSomething.pending, (state: SomethingState) => {
        state.loadingStatus = "loading";
      })
      .addCase(
        fetchSomething.fulfilled,
        (state: SomethingState, action: PayloadAction<SomethingEntity[]>) => {
          somethingAdapter.setAll(state, action.payload);
          state.loadingStatus = "loaded";
        },
      )
      .addCase(fetchSomething.rejected, (state: SomethingState, action) => {
        state.loadingStatus = "error";
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const somethingReducer = somethingSlice.reducer;

/*
 * Export action creators to be dispatched. For use with the `useDispatch` hook.
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(somethingActions.add({ id: 1 }))
 * }, [dispatch]);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#usedispatch
 */
export const somethingActions = somethingSlice.actions;

/*
 * Export selectors to query state. For use with the `useSelector` hook.
 *
 * e.g.
 * ```
 * import { useSelector } from 'react-redux';
 *
 * // ...
 *
 * const entities = useSelector(selectAllSomething);
 * ```
 *
 * See: https://react-redux.js.org/next/api/hooks#useselector
 */
const { selectAll, selectEntities } = somethingAdapter.getSelectors();

export const getSomethingState = (rootState: unknown): SomethingState =>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  rootState[SOMETHING_FEATURE_KEY];

export const selectAllSomething = createSelector(getSomethingState, selectAll);

export const selectSomethingEntities = createSelector(
  getSomethingState,
  selectEntities,
);
