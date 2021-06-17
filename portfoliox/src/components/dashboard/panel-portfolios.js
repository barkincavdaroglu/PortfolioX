import { CollectionIcon, ArrowRightIcon } from '@heroicons/react/outline';
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';
import { XCircleIcon } from '@heroicons/react/solid'
import { TrashIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { createPortfolioAction, deletePortfolioAction } from '../../actions/portfolio';
import { useHistory } from "react-router";
import { PortfolioChart } from '../chart';

var slugify = require('slugify')

const HandleInput = () => {
    const dispatch = useDispatch();
    const owner = useSelector(state => state.auth.user.id)
    const [createNew, setCreateNew] = useState(false);
    const [portfolioName, setPortfolioName] = useState('');
    const history = useHistory()
    const portfolios = useSelector(state => state.portfolios.userPortfolios.portfolios);
    const [isError, setError] = useState(false)

    function tryAddPortfolio() {
        var isErrorTmp = false
        let slug = slugify(portfolioName)
        if (portfolios.length !== 0) {
            for (var i = 0; i < portfolios.length; i++) {
                if (portfolios[i].name === portfolioName) {
                    isErrorTmp = true
                } else if (i === (portfolios.length - 1) && isErrorTmp === false) {
                    dispatch(createPortfolioAction(portfolioName, owner, slug)).then((res) => {
                    if (window.location.href.slice(-10) !== 'dashboard/') { history.push(`dashboard/${slug}`) } 
                    else if (window.location.href.slice(-9) !== 'dashboard') { history.push(`dashboard/${slug}`) } 
                    else { history.push(`/${slug}`) }
                    })
                    setCreateNew(false)
                }
                setError(isErrorTmp)
            }     
        } else {
            dispatch(createPortfolioAction(portfolioName, owner, slug)).then((res) => {
            if (window.location.href.slice(-10) !== 'dashboard/') { history.push(`dashboard/${slug}`) } 
            else if (window.location.href.slice(-9) !== 'dashboard') { history.push(`dashboard/${slug}`) } 
            else { history.push(`/${slug}`) }
            })
            setCreateNew(false)
        }

        
    }

    function errorState() {
        if (isError) {
            return (
                <div className="rounded-md bg-red-50 p-4">
                    <div className="flex">
                    <div className="flex-shrink-0">
                        <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">There was an error.</h3>
                        <div className="mt-2 text-sm text-red-700">
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Another portfolio with this name already exists. Please choose a unique name.</li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
            )
        }
    }

    if (createNew) {
        return (
            <div>
                <div className="bg-white overflow-hidden shadow-soft p-3 rounded-lg mb-4">
                    <div className="grid grid-cols-add">
                        <div>
                            <input
                                type="text"
                                name="portfolioname"
                                id="portfolioname"
                                value={portfolioName}
                                onChange={(e) => {setPortfolioName(e.target.value)}}
                                autoComplete="off"
                                placeholder="Portfolio Name"
                                className="block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-lg sm:text-lg border-white"
                            />
                        </div>

                        <div className="flex justify-end items-center">
                            <button onClick={tryAddPortfolio} type="button" className="inline-flex items-center px-5 py-2 border border-gray-300 text-normal leading-4 font-normal rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Create
                            </button>
                        </div>
                        
                    </div>
                    {errorState()}
                    
                </div>

            </div>
        )
    } else {
        return (
            <div className="flex justify-center bg-white shadow-soft items-center overflow-hidden rounded-xl">
                <span onClick={() => setCreateNew(!createNew)} className="font-normal p-4 text-xl text-gray-400">
                    Create New
                </span>
            </div>
        )
    }
    
}

export const PanelPortfolios = () => {
    const portfolios = useSelector(state => state.portfolios.userPortfolios.portfolios);

    return (
        <div className="pt-8">
            <div className="flex flex-row pb-4">
                <CollectionIcon className="-ml-1 mr-0.5 pr-3 text-semibold flex-shrink-0 self-center h-13 w-11 text-white"/>
                <h1 className="text-2xl font-bold text-white">Your Portfolios</h1>
            </div>

            <div className="max-w-full">
                {portfolios.map((portfolio, index) => (
                    <PortfolioCard key={index} portfolio={portfolio} />
                ))}
                
                {HandleInput()}
            </div>
        </div>
    )
}

const PortfolioCard = ({ portfolio }) => {
    const dispatch = useDispatch()

    function tryDeletePortfolio() {
        dispatch(deletePortfolioAction(portfolio.slug, portfolio.owner))
    }

    var changeType1 = 'increase'
    var changeType2 = 'increase'
    if (portfolio.dailyGain.percent < 0) {
        changeType1 = 'decrease'
    }
    if (portfolio.totalGain.percent < 0) {
        changeType2 = 'decrease'
    }

    function overlay() {
        if (portfolio.isEmpty) {
            return (
                <div className="w-full h-full bg-gradient-to-t from-white z-30 absolute flex flex-col justify-center items-center gap-3"> 
                    <h1 className="text-lg font-normal text-gray-600">You don't have any stocks in your portfolio.</h1>
                    
                    <Link to={`/dashboard/${portfolio.slug}`}>
                        <button type="button" className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Add Stock
                        </button>
                    </Link>
                </div>
            )
        }
    }
    

    return (
        <div className="flex flex-col bg-white overflow-hidden shadow-soft rounded-xl mb-6 relative">
            {overlay()}
            <div className="">
                <div className="px-4 pt-5 pb-3 sm:px-6">
                    <div className="flex flex-row justify-between z-50">
                        <h1 className="font-medium text-gray-400 text-xl">{portfolio.name}</h1>
                        <TrashIcon onClick={tryDeletePortfolio} className="text-gray-400 h-6 w-6 z-50"/>
                    </div>
                    
                    <h1 className="pt-2 font-bold text-gray-700 text-2xl">${portfolio.totalValue}</h1>
                </div>
                <div className="px-4 sm:px-6 pb-4 pt-0">
                    <div className="pb-2">
                        <div>
                            <h1 className="font-normal text-gray-400 text-lg">Performance</h1>
                        </div>
                    </div>
                    <div className="grid grid-cols-port-bot">
                        <div className="grid grid-rows-2 gap-y-3">
                            <div className="flex flex-row justify-between items-center">
                                    <p className="text-m font-normal text-gray-400">Daily Gain: </p>
                                    <div className="flex flex-row">
                                        <p className={changeType1 === 'increase' ? "text-green-500 font-medium text-m pr-3" : "text-red-500 font-medium text-m pr-3"}>{portfolio.dailyGain.total}</p>
                                        <div className={classNames(changeType1 === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                                                'inline-flex items-baseline px-2.5 py-0.5 rounded-lg text-sm font-medium md:mt-2 lg:mt-0' )}>
                                            { changeType1 === 'increase' ? 
                                            ( <ArrowSmUpIcon className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500" aria-hidden="true"/> ) : 
                                            ( <ArrowSmDownIcon className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500" aria-hidden="true"/> ) }

                                            <span className="sr-only">{changeType1 === 'increase' ? 'Increased' : 'Decreased'} </span>
                                            {portfolio.dailyGain.percent}%
                                        </div>
                                        
                                    </div>
                                    
                            </div>

                            <div className="flex flex-row justify-between items-center">
                                    <p className="text-m font-normal text-gray-400 content-center">Total Gain: </p>
                                    <div className="flex flex-row">
                                        <p className={changeType2 === 'increase' ? "text-green-500 font-medium text-m pr-3" : "text-red-500 font-medium text-m pr-3"}>{portfolio.totalGain.total}</p>
                                        <div className={classNames(changeType2 === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                                                'inline-flex items-baseline px-2.5 py-0.5 rounded-lg text-sm font-medium md:mt-2 lg:mt-0' )}>
                                            { changeType2 === 'increase' ? 
                                            ( <ArrowSmUpIcon className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500" aria-hidden="true"/> ) : 
                                            ( <ArrowSmDownIcon className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500" aria-hidden="true"/> ) }

                                            <span className="sr-only">{changeType2 === 'increase' ? 'Increased' : 'Decreased'} </span>
                                            {portfolio.totalGain.percent}%
                                        </div>
                                        
                                    </div>
                                    
                            </div>
                        </div>
                        {PortfolioChart({ portfolioHistory: portfolio.pastValues1mo, styleProps: { height: 65, width: '92%', paddingLeft: 20 } })}
                    </div>
                </div>
            </div>

            <Link to={`/dashboard/${portfolio.slug}`}>
                <div className="flex flex-row justify-end items-center px-4 pb-4 gap-2">
                    <h1 className="text-base font-normal text-gray-500">
                        Details
                    </h1>
                    <ArrowRightIcon className="text-gray-500 h-5 w-5"/>
                </div>
            </Link>

        </div>
        

    )
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}