import axios from 'axios';
//import { API_URL } from '../lib/constants';

//const URL = `${API_URL}`

export const addWatchList = async (owner, ticker) => {
    const { data } = await axios.post('http://localhost:5000/api/watchlist/add-to-watchlist', {'owner': owner, 'ticker': ticker} );
    return data;
};

export const getWatchlist = async (owner) => {
    const { data } = await axios.post('http://localhost:5000/api/watchlist/', {'owner': owner} );
    return data;
}

export const deleteTickerFromWatchlist = async (owner, ticker) => {
    const { data } = await axios.post('http://localhost:5000/api/watchlist/delete-from-watchlist', {'ticker': ticker, 'owner': owner } );
    console.log("IN DELETE WATCHLIST ACTION: ", data)
    return data;
}