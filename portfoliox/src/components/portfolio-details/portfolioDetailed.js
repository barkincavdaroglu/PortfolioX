import Navbar from '../../components/header';

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../components/styles.css';
import NewsPanel from '../dashboard/news';
import { PortfolioMain } from './portfolioMain';
import { CollectionIcon } from '@heroicons/react/outline';
import { getPortfolioByNameAction } from '../../actions/portfolio';
import { getNewsAction } from '../../actions/news';
import { useParams } from "react-router-dom";

import { useHistory } from "react-router-dom";

import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;


export default function PortfolioDetailed(props) {
    var stats = useSelector(state => state.news)
    var newsLoading = stats.loading

    const dispatch = useDispatch();
    const detailedPortfolio = useSelector(state => state.portfolios.currentPortfolio)
    const loading = useSelector(state => state.portfolios.currentPortfolioLoading)
    const owner = useSelector(state => state.auth.user.id)

    let slug = useParams();
    let history = useHistory();

    var [firstTime, setFirst] = useState(true)

    useEffect(() => {
        function getPortfolioByName() {
            dispatch(getNewsAction());
            dispatch(getPortfolioByNameAction(owner, slug.name))
        }
        if (firstTime) {
            getPortfolioByName();
            setFirst(false)
        } else {
            setInterval(() => {
                getPortfolioByName();
                console.log(firstTime)
              }, 720000); //720000
        }
    }, [firstTime]); // eslint-disable-line react-hooks/exhaustive-deps

    if (!loading && !newsLoading) {
        return (
            <div className="bg-color-bg bg-height h-screen md:bg-dashboard">
                <Navbar />
                <div className="dashboard-bg mt-12 max-w-8xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-row pb-4">
                        <CollectionIcon className="-ml-1 mr-0.5 pr-3 text-semibold flex-shrink-0 self-center h-13 w-11 text-white opacity-50"/>
                        <h1 onClick={history.goBack} className="text-3xl font-bold text-white opacity-50">Your Portfolios</h1>
                        <h1 className="px-4 text-3xl font-bold text-white">/</h1>
                        <h1 className="text-3xl font-bold text-white">{detailedPortfolio.name}</h1>
                    </div>
        
                    <div className="grid lg:grid-cols-portfolioDetailed">
                        <PortfolioMain portfolio={detailedPortfolio}/>
                        <NewsPanel />
                    </div>
                    
                </div>
            </div>
        )
    } else {
        return (
            <div className="h-screen flex justify-center items-center bg-color-bg ">
                <PulseLoader color={'#754fff'} loading={(loading || newsLoading)} css={override} size={20} />
            </div>
        )
    }

}