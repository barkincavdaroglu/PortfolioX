import { IS_LOADING } from './types';

export function getWatchlistAction(loading) {
    return async (dispatch) => {
        try {
            const data = await watchlistService.getWatchlist(owner);
            dispatch({
                type: IS_LOADING,
                payload: loading,
            })
        } catch (e) {
            console.log(e)
        }
    }
};