import { ADD_WATCHLIST, DELETE_WATCHLIST, GET_WATCHLIST, WATCHLIST_CHANGE_LOADING, WATCHLIST_ERROR } from '../actions/types';

const initialState = {
    loading: true,
    watchlist: [],
    isError: false,
    errorMessage: "",
    watchlistActionsLoading: false,
};
  
export default function watchlistReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ADD_WATCHLIST: {
            const watchlist = payload;
            return {
                ...state,
                loading: false,
                isError: false,
                watchlist: watchlist,
                watchlistActionsLoading: false,
            }
        }
        case WATCHLIST_CHANGE_LOADING: {
            return {
                ...state,
                watchlistActionsLoading: true
            }
        }
        case GET_WATCHLIST: {
            const watchlist = payload;
            return {
                ...state,
                loading: false,
                isError: false,
                watchlist: watchlist
            }
        }
        case DELETE_WATCHLIST: {
            const toDelete = payload;
            return {
                ...state,
                loading: false,
                isError: false,
                watchlist: state.watchlist.filter(stock => stock.ticker !== toDelete)
            }
        }
        case WATCHLIST_ERROR: {
            return {
                ...state,
                isError: true,
                errorMessage: payload,
            }
        }
        default:
            return state;
    }
}