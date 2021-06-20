import { combineReducers } from "redux";
import authReducer from "./authReducers";
import portfolioReducer from './portfolioReducers';
import topStocksReducer from './topStockReducers';
import newsReducer from "./newsReducers";
import watchlistReducer from "./watchlistReducers";
import searchReducer from "./searchReducer";

export default combineReducers({
  auth: authReducer,
  portfolios: portfolioReducer,
  news: newsReducer,
  watchlist: watchlistReducer,
  topStocks: topStocksReducer,
  search: searchReducer,
});