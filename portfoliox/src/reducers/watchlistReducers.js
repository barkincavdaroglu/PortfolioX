import { ADD_WATCHLIST, DELETE_WATCHLIST, GET_WATCHLIST } from '../actions/types';

const initialState = {
    loading: true,
    watchlist: [],
};
  
export default function watchlistReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case ADD_WATCHLIST: {
        const watchlist = payload;
        return {
            ...state,
            loading: false,
            watchlist: watchlist
        }
      }
      case GET_WATCHLIST: {
        const watchlist = payload;
        return {
            ...state,
            loading: false,
            watchlist: watchlist
        }
      }
      case DELETE_WATCHLIST: {
          const toDelete = payload;
          return {
              ...state,
              loading: false,
              watchlist: state.watchlist.filter(stock => stock.ticker !== toDelete)
          }
      }
      default:
        return state;
    }
}