import axios from 'axios';
//import { API_URL } from '../lib/constants';

//const URL = `${API_URL}`

export const getNews = async () => {
    const { data } = await axios.get('http://localhost:5000/api/news/');
    return data;
}