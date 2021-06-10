import { EyeIcon } from '@heroicons/react/outline';
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'
import React, { useState } from 'react';

export default function WatchList() {
    const watchlist = [
        { ticker: 'AAPL', name: 'Apple', stat: '28.81', previousStat: '70,946', change: '12%', changeType: 'increase' },
        { ticker: 'TESLA', name: 'Tesla', stat: '314.5', previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
        { ticker: 'BB', name: 'BlackBerry Limited', stat: '28.81', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
        { ticker: 'IBM', name: 'International Business Machine', stat: '15.65', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
        { ticker: 'AMC', name: 'AMC Entertainment Holdings, Inc.', stat: '28.81', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
        { ticker: 'AMC', name: 'Apple', stat: '28.81', previousStat: '70,946', change: '12%', changeType: 'increase' },
        { ticker: 'IBM', name: 'Tesla', stat: '314.5', previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
        { ticker: 'BB', name: 'BlackBerry Limited', stat: '28.81', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
        { ticker: 'TESLA', name: 'International Business Machine', stat: '15.65', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
        { ticker: 'AAPL', name: 'AMC Entertainment Holdings, Inc.', stat: '28.81', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
    ]

    const [paginatedWatchlist, setPaginatedWatchlist] = useState(watchlist.slice(0,4));
    const [paginationCounter, setPagination] = useState(0)

    function paginateNext(e) {
        e.preventDefault()
        console.log(paginatedWatchlist, paginationCounter)
        if (paginationCounter < 2) {
            setPagination(paginationCounter + 1)
            setPaginatedWatchlist(watchlist.slice(4*paginationCounter, (4*paginationCounter + 4)))
            console.log(paginatedWatchlist, paginationCounter)
        }
    }

    function paginatePrev(e) {
        e.preventDefault()
        if (paginationCounter > 0) {
            setPagination(paginationCounter - 1)
            setPaginatedWatchlist(watchlist.slice(4*paginationCounter, 4*paginationCounter + 4))
        }
    }

    return (
        <div className="pt-8 md:ml-8">
            <div className="flex flex-row pb-4">
                <EyeIcon className="-ml-1 mr-0.5 pr-3 text-semibold flex-shrink-0 self-center h-13 w-11 text-white"/>
                <h1 className="text-2xl font-bold text-white">Watchlist</h1>
            </div>

            <div className="bg-white overflow-hidden shadow-soft rounded-xl divide-y divide-gray-200">
                <ul className="divide-y divide-gray-200">
                    {paginatedWatchlist.map((item) => (
                        <div key={item.ticker} className="px-4 py-3 sm:p-4 flex flex-col">
                            <div className="flex flex-row justify-between">
                                <h1 className="text-lg font-semibold text-indigo-500 pb-px">{item.ticker}</h1>
                                <div className={classNames(item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800', 'inline-flex items-center px-2.5 py-0.5 rounded-lg text-sm font-medium md:mt-2 lg:mt-0')}>
                                        {item.changeType === 'increase' ? ( <ArrowSmUpIcon className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500" aria-hidden="true" />) : (
                                                                            <ArrowSmDownIcon className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500" aria-hidden="true"/> )}
                        
                                        <span className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                                        {item.change}
                                </div>
                            </div>
                            
                            <div className="flex pt-2 justify-between items-baseline md:block lg:flex">
                                <div className="text-sm font-normal text-gray-400 pb-1">
                                    {truncate(item.name)}
                                </div>
                    
                                <div>
                                    
                                    <div className="flex items-baseline text-m font-medium text-gray-600">
                                    {item.stat}
                                    
                                    </div>
                    
                                    
                                </div>
                            
                            </div>
                      </div>
                    ))}
                </ul>

                <div className="flex justify-center items-center pb-4 pt-4">
                    <div className="flex items-center justify-center">
                        <a onClick={(e) => paginatePrev(e)} className=" border-transparent inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                            <ArrowNarrowLeftIcon className={paginationCounter === 0 ? "mr-3 h-5 w-5 text-gray-300" : "mr-3 h-5 w-5 text-gray-500"} aria-hidden="true" />
                        </a>
                    </div>
                    <div className="flex items-center justify-center">
                        <a onClick={(e) => paginateNext(e)} className="border-transparent inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                            <ArrowNarrowRightIcon className={paginationCounter === 2 ? "mr-3 h-5 w-5 text-gray-300" : "mr-3 h-5 w-5 text-gray-500"} aria-hidden="true" />
                        </a>
                    </div>
                </div>
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