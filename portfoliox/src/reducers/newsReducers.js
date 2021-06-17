import { GET_NEWS } from '../actions/types';

const initialState = {
    loading: true,
    news: [],
};
  
export default function newsReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
      case GET_NEWS: {
          const topnews = payload;
          return {
              ...state,
              loading: false,
              news: topnews,
          }
      }
      default:
        return state;
    }
};