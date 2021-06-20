import { ADD_TO_PORTFOLIO, CHANGE_LOADING, CREATE_PORTFOLIO, DELETE_FROM_PORTFOLIO, DELETE_PORTFOLIO, GET_PORTFOLIOS, GET_PORTFOLIO_BY_NAME } from '../actions/types';

const initialState = {
    loading: true,
    userPortfolios: {
        portfolios: [],
    },
    currentPortfolioLoading: true,
    currentPortfolioActionsLoading: false,
    currentPortfolio: {
        dailyGain: { total: 0, percent: 0 },
        totalGain: { total: 0, percent: 0 },
        pastValues: [],
        stocks: [],
        id: "",
        name: "",
        slug: "",
        owner: "",
        totalValue: 0,
    }
};
  
export default function portfolioReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case CREATE_PORTFOLIO: {
            const portfolio = payload;
            return {
                ...state,
                userPortfolios: {
                    portfolios: state.userPortfolios.portfolios.concat(portfolio),
                },
                currentPortfolio: portfolio,
            }
        }
        case CHANGE_LOADING: {
            return {
                ...state,
                currentPortfolioActionsLoading: true
            }
        }
        case DELETE_PORTFOLIO: {
            const toDelete = payload;
            return {
                ...state,
                userPortfolios: {
                    portfolios: state.userPortfolios.portfolios.filter(portfolio => portfolio.slug !== toDelete)
                }
            }
        }
        case GET_PORTFOLIOS: {
            const portfolios = payload;
            return {
                ...state,
                loading: false,
                userPortfolios: {
                    portfolios,
                }
            }
        }
        case ADD_TO_PORTFOLIO: {
            const portfolio = payload;
            Object.assign(state.currentPortfolio, portfolio);
            return {
                ...state,
                currentPortfolio: portfolio,
                currentPortfolioActionsLoading: false,
            }
        }
        case DELETE_FROM_PORTFOLIO: {
            const portfolio = payload;
            Object.assign(state.currentPortfolio, portfolio);
            return {
                ...state,
                currentPortfolio: portfolio,
                currentPortfolioActionsLoading: false,
            }
        }
        case GET_PORTFOLIO_BY_NAME: {
            const portfolio = payload;
            return {
                ...state,
                currentPortfolioLoading: false,
                currentPortfolio: portfolio,
            }
        }
        default:
            return state;
    }
}