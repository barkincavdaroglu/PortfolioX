import * as topStocksService from '../services/topStocks';
import { GET_TOPSTOCKS } from './types';

export function getTopStocksAction() {
    return async (dispatch) => {
        try {
            const data  = await topStocksService.getTopStocks();
            dispatch({
                type: GET_TOPSTOCKS,
                payload: data,
            })
        } catch (e) {
            console.log(e)
        }
    }
};