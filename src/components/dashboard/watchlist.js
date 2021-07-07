import { EyeIcon, XIcon } from '@heroicons/react/outline';
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWatchlistAction, addToWatchlistAction, deleteWatchlistAction } from '../../actions/watchlist';
import { searchTickerAction } from '../../actions/portfolio';

import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function WatchList() {
    const dispatch = useDispatch();
    const owner = useSelector(state => state.auth.user.id)
    var stats = useSelector(state => state.watchlist)

    const [createNew, setCreateNew] = useState(false)
    const [paginatedWatchlist, setPaginatedWatchlist] = useState([]);
    const [ticker, setTicker] = useState('');

    const searchResults = useSelector(state => state.search)
    const [tickerDropdownOpen, setTickerDropdownOpen] = useState(false)

    const loading = useSelector(state => state.watchlist.watchlistActionsLoading);

  
    useEffect(() => {
        function getWatchlist() {
            dispatch(getWatchlistAction(owner));
        };

        getWatchlist();
        setPaginatedWatchlist(stats.watchlist.slice(0,5))
    }, [JSON.stringify(stats.watchlist)]); // eslint-disable-line react-hooks/exhaustive-deps

    const [paginationCounter, setPagination] = useState(0)

    function paginateNext(e) {
        e.preventDefault()
        if (paginationCounter < (Math.ceil(stats.watchlist.length / 5) - 1)) {
            setPaginatedWatchlist(stats.watchlist.slice(5 * (paginationCounter + 1), (5 * (paginationCounter + 1) + 5)))
            setPagination(paginationCounter + 1)
        }
    }

    function paginatePrev(e) {
        e.preventDefault()
        if (paginationCounter > 0) {
            setPaginatedWatchlist(stats.watchlist.slice(5 * (paginationCounter - 1), 5 * (paginationCounter - 1) + 5))
            setPagination(paginationCounter - 1)
        }
    }

    function addToWatchList() {
       if (ticker) {
           dispatch(addToWatchlistAction(owner, ticker));
           setCreateNew(false);
           setTicker('');
       }
    }

    function tryDeleteFromWatchlist(symbol) {
        dispatch(deleteWatchlistAction(owner, symbol))
    }

    const createState = () => {
        if (createNew) {
            return (
                <div className="h-auto">
                    <div className="py-2 bg-white overflow-hidden rounded-lg">
                        <div className="grid grid-cols-add2 py-2 sm:px-6">
                            <div>
                                <input
                                    type="text"
                                    name="ticker"
                                    id="ticker"
                                    value={ticker}
                                    onChange={(e) => {searchForTicker(e.target.value)}}
                                    placeholder="Stock's Name"
                                    className="block p-2 w-11/12 pr-2 focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-lg sm:text-lg border-white"
                                />
                            </div>

                            <div className="flex flex-row justify-between items-center">
                                <button onClick={addToWatchList} type="button" className="inline-flex items-center px-4 py-3 border border-gray-300 text-normal leading-4 font-normal rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Add
                                </button>
                                <button onClick={() => setCreateNew(!createNew)} className="border-transparent inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                    <XIcon className={"mr-3 h-5 w-5 text-gray-300"} aria-hidden="true" />
                                </button>
                            </div>
                            
                        </div>
                        <div className="sm:px-6">
                            {StockDropdown()}    
                        </div>
                        
                    </div>
                    
                </div>
            )
        } else {
            return (
                <div className="flex justify-center items-center overflow-hidden rounded-lg border p-6">
                    <span onClick={() => setCreateNew(!createNew)} className="font-normal text-lg text-gray-400">
                        Add to Watchlist
                    </span>
                </div>
            )
        }
    }

    function searchForTicker(tickerToSearch) {
        setTicker(tickerToSearch)
        setTickerDropdownOpen(true)
        dispatch(searchTickerAction(tickerToSearch))
    }

    function closeDropdown(stock) {
        setTickerDropdownOpen(false)
        setTicker(stock)
    }

    function StockDropdown() {
        if (!searchResults.loading && tickerDropdownOpen && ticker !== '') {
            return (
                <div className="border-2 border-indigo-500 mt-2 max-h-48 w-full rounded-xl shadow-lg divide-y divide-indigo-200 divide-dashed bg-white overflow-auto z-100">
                    {searchResults.searchResults.map((stock) => (
                      <div onClick={() => closeDropdown(stock)} key={stock} className="p-2 z-100"> 
                          <p className="text-md font-normal text-gray-500">
                              {stock}
                          </p>
                      </div>  
                    ))}
                </div>
            )             
        }      
    }

    function loaderOverlay() {
        if (loading) {
            return (
                <div className="absolute inset-0 h-full w-full flex justify-center items-center z-50 bg-white opacity-50">
                    <PulseLoader color={'#754fff'} loading={(loading)} css={override} size={20} />
                </div>
            )
        }
    }

    return (
        <div className="pt-8 lg:ml-8">
            <div className="flex flex-row pb-4 justify-between items-center">
                <div className="flex flex-row">
                    <EyeIcon className="-ml-1 mr-0.5 pr-3 text-semibold flex-shrink-0 self-center h-13 w-11 text-white"/>
                    <h1 className="text-2xl font-bold text-white">Watchlist</h1>
                </div>
                <div className="flex h-full justify-center items-center">
                    <div className="flex items-center justify-center">
                        <button onClick={(e) => paginatePrev(e)} className=" border-transparent inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                            <ArrowNarrowLeftIcon className={(paginationCounter === 0) ? "mr-3 h-5 w-5 text-white opacity-40" : "mr-3 h-5 w-5 text-white"} aria-hidden="true" />
                        </button>
                    </div>
                    <div className="flex items-center justify-center">
                        <button onClick={(e) => paginateNext(e)} className="border-transparent inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                            <ArrowNarrowRightIcon className={(paginationCounter === (Math.ceil(stats.watchlist.length / 5) - 1)) ? "mr-3 h-5 w-5 text-white opacity-40" : ( (stats.watchlist.length < 5) ? "mr-3 h-5 w-5 text-white opacity-40" : "mr-3 h-5 w-5 text-white" )} aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="z-10 relative bg-white overflow-hidden shadow-soft rounded-xl divide-y divide-gray-200">
                <ul className="divide-y divide-gray-200">
                    {paginatedWatchlist.map((item) => (
                        <div key={item.ticker} className="grid grid-cols-watchlist">
                            <div className="pl-4 py-3 sm:p-4 flex flex-col">
                                <div className="flex flex-row justify-between">
                                    <h1 className="text-lg font-semibold text-indigo-500 pb-px">{item.ticker}</h1>
                                    <div className={classNames(item.change > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800', 'inline-flex items-center px-2.5 py-0.5 rounded-lg text-sm font-medium md:mt-2 lg:mt-0')}>
                                            {item.change > 0 ? ( <ArrowSmUpIcon className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500" aria-hidden="true" />) : (
                                                                 <ArrowSmDownIcon className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500" aria-hidden="true"/> )}
                            
                                            {item.change}
                                    </div>
                                </div>
                                
                                <div className="flex pt-2 justify-between items-baseline md:block lg:flex">
                                    <div className="text-sm font-normal text-gray-400 pb-1">
                                        {truncate(item.companyName)}
                                    </div>
                        
                                    <div>
                                        <div className="flex items-baseline text-m font-medium text-gray-600">
                                            {item.latestPrice}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center pt-4 pr-4 pb-3">
                                <div onClick={() => tryDeleteFromWatchlist(item.ticker)} className="text-gray-300 cursor-pointer flex items-center w-full h-full border-2 border-gray-200 rounded hover:bg-red-500 hover:text-white hover:border-red-500">
                                    <XIcon className="h-4 w-4"/> 
                                </div>
                                
                            </div>
                        </div>

                    ))}
                </ul>
                {loaderOverlay()}
                {createState()}
            </div>
        </div>
    )
}

function truncate(str) {
    return str.length > 20 ? str.substring(0, 20) + "..." : str;
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}