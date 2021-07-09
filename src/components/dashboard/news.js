import { NewspaperIcon } from '@heroicons/react/outline';
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";

export default function NewsPanel() {
    var news = useSelector(state => state.news.news)
    const [paginated_news, setPaginatedNews] = useState(news.slice(0,4));
    const [paginationCounter, setPagination] = useState(0)

    function paginateNext(e) {
        e.preventDefault()
        if (paginationCounter < 1) {
            setPaginatedNews(news.slice(4*(paginationCounter + 1), (4* (paginationCounter + 1) + 4)))
            setPagination(paginationCounter + 1)
        }
    }

    function paginatePrev(e) {
        e.preventDefault()
        if (paginationCounter > 0) {
            setPaginatedNews(news.slice(4* (paginationCounter - 1), 4* (paginationCounter - 1) + 4))
            setPagination(paginationCounter - 1)
        }
    }

        return (
            <div className="pt-8 lg:ml-8">
                <div className="flex flex-row pb-4 justify-between items-center">
                    <div className="flex flex-row">
                        <NewspaperIcon className="-ml-1 mr-0.5 pr-3 text-semibold flex-shrink-0 self-center h-13 w-11 text-white"/>
                        <h1 className="text-2xl font-bold text-white">News</h1>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="flex items-center justify-center">
                            <a href="/#" onClick={(e) => paginatePrev(e)} className=" border-transparent inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                                <ArrowNarrowLeftIcon className={paginationCounter === 0 ? "mr-3 h-5 w-5 text-white opacity-40" : "mr-3 h-5 w-5 text-white"} aria-hidden="true" />
                            </a>
                        </div>
                        <div className="flex items-center justify-center">
                            <a href="/#" onClick={(e) => paginateNext(e)} className="border-transparent inline-flex items-center text-sm font-medium text-white hover:text-gray-700 hover:border-gray-300">
                                <ArrowNarrowRightIcon className={paginationCounter === 1 ? "mr-3 h-5 w-5 text-white opacity-40" : "mr-3 h-5 w-5 text-white"} aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow-soft rounded-xl divide-y divide-gray-200">
                    <ul className="divide-y divide-gray-200">
                        {paginated_news.map((news, index) => (
                            <li key={index} className="px-6 py-4">
                                <div>
                                    <h1 className="font-semibold text-gray-800 text-sm">{news.news[0].source}</h1>
                                    <h1 className="pt-2 font-medium text-gray-600 text-base">{truncate(news.news[0].headline, 60)}</h1>

                                    <div className="pt-2 flex flex-row justify-between items-center">
                                        <div className="flex flex-row items-center">
                                            <h1>Related: </h1>
                                            <h1 className="font-medium ml-4 text-indigo-500 text-base">{truncate(news.news[0].related, 20)}</h1>
                                        </div>
                                        <Link to={{ pathname: news.news[0].url }} target="_blank"> 
                                            <button type="button" className="inline-flex items-center px-2.5 py-1.5 border border-gray-300  text-xs font-normal rounded text-gray-500 bg-white focus:outline-none hover:bg-indigo-500 hover:text-white">
                                                Read More
                                            </button>
                                        </Link>


                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    
                </div>
            </div>
        )
}


function truncate(str, lt) {
    return str.length > lt ? str.substring(0, lt) + "..." : str;
  }