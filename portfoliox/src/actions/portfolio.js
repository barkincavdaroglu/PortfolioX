import * as portfolioService from '../services/portfolio';
import { ADD_TO_PORTFOLIO, CHANGE_LOADING, CREATE_PORTFOLIO, DELETE_FROM_PORTFOLIO, DELETE_PORTFOLIO, GET_PORTFOLIOS, GET_PORTFOLIO_BY_NAME, SEARCH_TICKER } from './types';

export function createPortfolioAction(name, owner, slug) {
    return async (dispatch) => {
        try {
            const {data} = await portfolioService.createPortfolio(name, owner, slug)
            dispatch({type: CREATE_PORTFOLIO, payload: data})
        } catch (e) {
            console.log(e)
        }
    }
}

export function searchTickerAction(ticker) {
    return async (dispatch) => {
        try {
            const data = await portfolioService.searchTicker(ticker)
            dispatch({type: SEARCH_TICKER, payload: data })
        } catch (e) {
            console.log(e)
        }
    }
}

export function addToPortfolioAction(name, owner, stock) {
    return async (dispatch) => {
        try {
            dispatch({type: CHANGE_LOADING, payload: {}})
            const data = await portfolioService.addToPortfolio(owner, stock, name);
            dispatch({type: ADD_TO_PORTFOLIO, payload: data })
        } catch (e) {
            console.log(e)
        }
    }
}

export function deleteFromPortfolioAction(name, owner, stock) {
    return async (dispatch) => {
        try {
            dispatch({type: CHANGE_LOADING, payload: {}})
            const data = await portfolioService.deleteFromPortfolio(owner, stock, name);
            dispatch({type: DELETE_FROM_PORTFOLIO, payload: data })
        } catch (e) {
            console.log(e)
        }
    }
}

export function deletePortfolioAction(slug, owner) {
    return async (dispatch) => {
        try {
            await portfolioService.deletePortfolio(owner, slug);
            dispatch({type: DELETE_PORTFOLIO, payload: slug })
        } catch (e) {
            console.log(e)
        }
    }
}


export function getPortfoliosAction(owner) {
    //const token = localStorage.getItem("jwtToken");
    return async (dispatch) => {
        try {
            const data  = await portfolioService.getPortfolios(owner);
            dispatch({type: GET_PORTFOLIOS, payload: data })
        } catch (e) {
            console.log(e)
        }
    }
}

export function getPortfolioByNameAction(owner, name) {
    return async (dispatch) => {
        try {
            const data = await portfolioService.getPortfolioByName(owner, name);
            dispatch({ type: GET_PORTFOLIO_BY_NAME, payload: data })
        } catch (e) {
            console.log(e)
        }
    }
}