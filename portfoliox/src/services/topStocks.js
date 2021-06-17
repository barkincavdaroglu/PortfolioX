import axios from 'axios';
//import { API_URL } from '../lib/constants';

//const URL = `${API_URL}`

export const getTopStocks = async () => {
    const { data } = await axios.get('http://localhost:5000/api/top-stocks/');
    return data;
}