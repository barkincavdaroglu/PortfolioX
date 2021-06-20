import * as watchlistService from '../services/watchlist';
import { ADD_WATCHLIST, DELETE_WATCHLIST, GET_WATCHLIST, WATCHLIST_CHANGE_LOADING, WATCHLIST_ERROR } from './types';

export function addToWatchlistAction(owner, ticker) {
    return async (dispatch) => {
        try {
            dispatch({type: WATCHLIST_CHANGE_LOADING, payload: {}})
            const data = await watchlistService.addWatchList(owner, ticker)
            dispatch({ 
                type: ADD_WATCHLIST, 
                payload: data 
            });
        } catch (e) {
            dispatch({ type: WATCHLIST_ERROR, payload: e.response.data })
            console.log(e)
        }
    }
};

export function deleteWatchlistAction(owner, ticker) {
    return async (dispatch) => {
        try {
            await watchlistService.deleteTickerFromWatchlist(owner, ticker)
            dispatch({
                type: DELETE_WATCHLIST,
                payload: ticker
            })
        } catch (e) {
            dispatch({ type: WATCHLIST_ERROR, payload: e.response.data })
            console.log(e)
        }
    }
}

export function getWatchlistAction(owner) {
    return async (dispatch) => {
        try {
            const data = await watchlistService.getWatchlist(owner);
            dispatch({
                type: GET_WATCHLIST,
                payload: data,
            })
        } catch (e) {
            dispatch({ type: WATCHLIST_ERROR, payload: e.response.data })
        }
    }
};
