import axios from 'axios';
//import { API_URL } from '../lib/constants';

//onst URL = `${API_URL}`

export const createPortfolio = async (name, owner, slug) => {
    const data = await axios.post('http://localhost:5000/api/portfolios/create-portfolio/', {'owner': owner, 'slug': slug, 'name': name}).catch(function(err) {
        console.log("ERROR ", err.response.data.error)
        return err.response.data
    });
    return data;
};

export const getPortfolios = async (owner) => {
    const { data } = await axios.post('http://localhost:5000/api/portfolios/all', {'owner': owner} );
    return data;
}

export const addToPortfolio = async (owner, stock, name) => {
    const { data } = await axios.post('http://localhost:5000/api/portfolios/add-to-portfolio', {'owner': owner, 'slug': name, 'stock': stock});
    return data;
}

export const deleteFromPortfolio = async (owner, stock, name) => {
    const { data } = await axios.post('http://localhost:5000/api/portfolios/delete-from-portfolio', {'owner': owner, 'slug': name, 'stock': stock});
    return data;
}

export const getPortfolioByName = async (owner, name) => {
    const { data } = await axios.post(`http://localhost:5000/api/portfolios/${name}`, {'owner': owner, 'slug': name});
    return data;
}

export const deletePortfolio = async (owner, name) => {
    const { data } = await axios.post('http://localhost:5000/api/portfolios/delete', {'owner': owner, 'slug': name});
    return data;
}