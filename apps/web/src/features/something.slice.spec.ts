// import {
//   fetchSomething,
//   somethingAdapter,
//   somethingReducer,
// } from "./something.slice";

// describe("something reducer", () => {
//   it("should handle initial state", () => {
//     const expected = somethingAdapter.getInitialState({
//       loadingStatus: "not loaded",
//       error: null,
//     });

//     expect(somethingReducer(undefined, { type: "" })).toEqual(expected);
//   });

//   it("should handle fetchSomethings", () => {
//     let state = somethingReducer(undefined, fetchSomething.pending(null, null));

//     expect(state).toEqual(
//       expect.objectContaining({
//         loadingStatus: "loading",
//         error: null,
//         entities: {},
//       }),
//     );

//     state = somethingReducer(
//       state,
//       fetchSomething.fulfilled([{ id: 1 }], null, null),
//     );

//     expect(state).toEqual(
//       expect.objectContaining({
//         loadingStatus: "loaded",
//         error: null,
//         entities: { 1: { id: 1 } },
//       }),
//     );

//     state = somethingReducer(
//       state,
//       fetchSomething.rejected(new Error("Uh oh"), null, null),
//     );

//     expect(state).toEqual(
//       expect.objectContaining({
//         loadingStatus: "error",
//         error: "Uh oh",
//         entities: { 1: { id: 1 } },
//       }),
//     );
//   });
// });
