import PanelTop from './panel-top';
import '../../components/styles.css';
import {PanelPortfolios} from './panel-portfolios';
import NewsPanel from './news';
import WatchList from './watchlist';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getNewsAction } from '../../actions/news';
import { getPortfoliosAction } from '../../actions/portfolio';
import { getTopStocksAction } from '../../actions/topStocks';
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function Panel() {
    const dispatch = useDispatch();
    const owner = useSelector(state => state.auth.user.id)
    const newsLoading = useSelector(state => state.news.loading)
    const portfsLoading = useSelector(state => state.portfolios.loading)
    const topStocksLoading = useSelector(state => state.topStocks.loading)

    var [firstTime, setFirstTime] = useState(true)

    useEffect(() => {
        function getData() {
            dispatch(getNewsAction())
            dispatch(getTopStocksAction())
            dispatch(getPortfoliosAction(owner));
        };

        if (firstTime) {
            getData();
            setFirstTime(false)
        } else {
            setInterval(() => {
                getData();
            }, 720000);
        }
    }, [firstTime, dispatch, owner]);
    
    if (!newsLoading && !portfsLoading && !topStocksLoading) {
        return (
            <div className="dashboard-bg mt-12 max-w-8xl mx-auto sm:px-6 lg:px-8">
                <PanelTop />
                <div className="grid lg:grid-cols-dashboard">
                    <PanelPortfolios />
                    <WatchList />
                    <NewsPanel/>
                </div>
            </div>
        )
    } else {
        return (
            <div className="h-screen z-50 flex justify-center items-center bg-color-bg ">
                <PulseLoader color={'#754fff'} loading={(newsLoading || portfsLoading || topStocksLoading)} css={override} size={20} />
            </div>
        )
    }

}