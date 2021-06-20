import axios from 'axios';
import { API_URL } from '../lib/constants';

const URL = `${API_URL}`

export const getNews = async () => {
    const { data } = await axios.get(URL + '/api/news/');
    return data;
}