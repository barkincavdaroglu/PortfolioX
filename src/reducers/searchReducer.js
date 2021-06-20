import { SEARCH_TICKER } from "../actions/types";

const initialState = {
    loading: true,
    searchResults: [],
};
  
export default function searchReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case SEARCH_TICKER: {
          const results = payload.matches;
          return {
              ...state,
              loading: false,
              searchResults: results,
          }
      }
      default:
        return state;
    }
}