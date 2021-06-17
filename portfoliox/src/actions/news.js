import * as newsService from '../services/news';
import { GET_NEWS } from './types';

export function getNewsAction() {
    return async (dispatch) => {
        try {
            const data  = await newsService.getNews();
            dispatch({
                type: GET_NEWS,
                payload: data,
            })
        } catch (e) {
            console.log(e)
        }
    }
};