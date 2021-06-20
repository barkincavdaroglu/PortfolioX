import { GET_TOPSTOCKS } from '../actions/types';

const initialState = {
    loading: true,
    stocks: [],
};
  
export default function topStocksReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case GET_TOPSTOCKS: {
          const topstocks = payload;
          return {
              ...state,
              loading: false,
              stocks: topstocks[0].stocks,
          }
      }
      default:
        return state;
    }
};