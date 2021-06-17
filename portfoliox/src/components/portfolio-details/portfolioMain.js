import { PlusIcon, XCircleIcon } from '@heroicons/react/outline';
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import StocksTable from './stocksTables';
import { PortfolioChart } from '../chart';
import { addToPortfolioAction } from '../../actions/portfolio';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export const PortfolioMain = ({portfolio}) => {
    return (
        <div className="pt-4">
            <div className="max-w-full">
                <PortfolioCard portfolio={portfolio}/>
            </div>
        </div>
    )   
}

const PortfolioCard = () => {
    const dispatch = useDispatch();
    const owner = useSelector(state => state.auth.user.id)
    const [addSymbol, setAddSymbol] = useState(false)
    const [ticker, setTicker] = useState('');
    const [shares, setShares] = useState('');
    const [initialPrice, setInitialPrice] = useState('');
    const [chartInterval, setChartInterval] = useState('1month');
    const portfolio = useSelector(state => state.portfolios.currentPortfolio);
    const [isError, setError] = useState(false)

    let slug = useParams();
    
    var changeType1 = 'increase'
    var changeType2 = 'increase'
    if (portfolio.dailyGain.percent < 0) {
        changeType1 = 'decrease'
    }
    if (portfolio.totalGain.percent < 0) {
        changeType2 = 'decrease'
    }

    function addSymbolEvent(e) {
        e.preventDefault()
        setAddSymbol(!addSymbol)
    }

    function tryAddSymbol() {
        var isErrorTmp = false
        if (portfolio.stocks.length !== 0) {
            for (var i = 0; i < portfolio.stocks.length; i++) {
                if (portfolio.stocks[i].ticker.toUpperCase() === ticker.toUpperCase()) {
                    isErrorTmp = true
                } else if (i === (portfolio.stocks.length - 1) && isErrorTmp === false) {
                    dispatch(addToPortfolioAction(slug.name, owner, { ticker: ticker.toUpperCase(), numberOfShares: shares, initialPrice: initialPrice}))
                    setAddSymbol(!addSymbol)
                }
            }
        } else {
            dispatch(addToPortfolioAction(slug.name, owner, { ticker: ticker.toUpperCase(), numberOfShares: shares, initialPrice: initialPrice}))
            setAddSymbol(!addSymbol)
        }

        setError(isErrorTmp)
        setShares('')
        setInitialPrice('')
        setTicker('')
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
                            <li>You have already added this stock to your portfolio. Please choose another stock.</li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>
            )
        }
    }

    function isAdding() {
        if (addSymbol) {
            return (
                <div>
                    <div className="flex flex-row gap-4 pb-4">
                        <div>
                            <label className="sr-only">Symbol</label>
                            <input
                                value={ticker} onChange={(e) => {setTicker(e.target.value)}}
                                type="text"
                                name="email"
                                autoComplete="off"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="Symbol"
                            />
                        </div>

                        <div>
                            <label className="sr-only">Shares</label>
                            <input
                                value={shares} onChange={(e) => {setShares(parseFloat(e.target.value))}}
                                type="number"
                                name="shares"
                                autoComplete="off"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="Shares"
                            />
                        </div>

                        <div>
                            <label className="sr-only">Cost / Share</label>
                            <input
                                value={initialPrice} onChange={(e) => {setInitialPrice(parseFloat(e.target.value))}}
                                type="number"
                                name="cost/share"
                                autoComplete="off"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                placeholder="Cost / Share"
                            />
                        </div>
                        
                        <button
                            onClick={tryAddSymbol}
                                type="button"
                                className="h-9 inline-flex items-center px-3 border border-transparent text-sm font-medium rounded shadow-sm text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Add to Portfolio
                        </button>
                    </div>
                    {errorState()}
                </div>
                
            )
        }
    }

    function chartModes() {
        if (chartInterval === '1month') {
            return (
                <div>
                    {PortfolioChart({ portfolioHistory: portfolio.pastValues1mo, styleProps: { height: 65, width: '100%', paddingLeft: 0 } }) }
                </div>
            )
        } else if (chartInterval === '6month') {
            return (
                <div>
                    {PortfolioChart({ portfolioHistory: portfolio.pastValues6mo, styleProps: { height: 65, width: '100%', paddingLeft: 0 } }) }
                </div>
            )
        } else if (chartInterval === '1year') {
            return (
                <div>
                    {PortfolioChart({ portfolioHistory: portfolio.pastValues1yr, styleProps: { height: 65, width: '100%', paddingLeft: 0 } }) }
                </div>
            )
        }
    }
    
    return (
        <div className="bg-white overflow-hidden shadow-soft mt-2 rounded-xl mb-6">
            <div className="px-4 pt-5 pb-3 sm:px-6">
                <h1 className="pt-2 font-bold text-gray-700 text-2xl">${portfolio.totalValue}</h1>
            </div>
            <div className="px-4 sm:px-6 pb-4 pt-0">
                <div className="pb-3">
                    <div className="flex flex-row justify-between">
                        <h1 className="font-normal text-gray-400 text-lg">Performance</h1>
                        <div className="flex flex-row justify-center gap-3">
                                <div onClick={() => setChartInterval('1month')} className={chartInterval === '1month' ? "bg-indigo-400 rounded-2xl px-4 py-1" : "px-4 py-1"}>
                                    <h1 className={chartInterval === '1month' ? "text-sm font-normal text-white" : "text-sm font-normal text-gray-400"}>1mo</h1>
                                </div>

                                <div onClick={() => setChartInterval('6month')} className={chartInterval === '6month' ? "bg-indigo-400 rounded-2xl px-4 py-1" : "px-4 py-1"}>
                                    <h1 className={chartInterval === '6month' ? "text-sm font-normal text-white" : "text-sm font-normal text-gray-400"}>6mo</h1>
                                </div>

                                <div onClick={() => setChartInterval('1year')} className={chartInterval === '1year' ? "bg-indigo-400 rounded-2xl px-4 py-1" : "px-4 py-1"}>
                                    <h1 className={chartInterval === '1year' ? "text-sm font-normal text-white" : "text-sm font-normal text-gray-400"}>1yr</h1>
                                </div>
                        </div>
                    </div>
                    
                </div>
                <div className="grid grid-cols-port-detailed-bot">

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
                    <div className="flex flex-col pl-8">

                        {chartModes()}
                    </div>
                </div>
            </div>
            <div className="px-4 pt-3 sm:px-6">
                <div className="px-4 py-3 border rounded-xl border-gray-200">
                    <div onClick={(e) => addSymbolEvent(e)} className="z-10 flex flex-row items-center">
                        <PlusIcon className={addSymbol ? "h-5 w-5 text-indigo-400" : "h-5 w-5 text-gray-400"} />
                        <h2 className={addSymbol ? "pl-1 text-base font-medium text-indigo-400" : "pl-1 text-base font-normal text-gray-400"}>Add Symbol</h2>
                    </div>
                    <div className="flex flex-row items-center pt-3 pb-1">
                        {isAdding()}
                    </div>

                </div>

            </div>
            
            <StocksTable stocks={portfolio.stocks}/>
        </div>
    )
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
