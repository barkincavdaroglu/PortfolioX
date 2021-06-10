import { NewspaperIcon } from '@heroicons/react/outline';
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'
import React, { useState } from 'react';

export default function NewsPanel() {
    // 12 news in total
    const newsCollection = [
        {
            title: 'Stock Market Crash: Experts Warn 30% Drop in S&P 500 and some other news...',
            related: 'MSFT, MRK, BMY',
            link: 'www.google.com'
        },
        {
            title: 'Stock Market Crash: Experts Warn 30% Drop in S&P 500 and some other news...',
            related: 'MSFT, MRK',
            link: 'www.google.com'
        },
        {
            title: 'Stock Market Crash: Experts Warn 30% Drop in S&P 500 and some other news...',
            related: 'MSFT, MRK, BMY',
            link: 'www.google.com'
        },
        {
            title: 'Some other news here that will blow your head off bitch',
            related: 'MSFT, MRK, BMY',
            link: 'www.google.com'
        },
        {
            title: 'Stock Market Crash: Experts Warn 30% Drop in S&P 500 and some other news...',
            related: 'MSFT, MRK',
            link: 'www.google.com'
        },
        {
            title: 'Stock Market Crash: Experts Warn 30% Drop in S&P 500 and some other news...',
            related: 'MSFT, MRK, BMY',
            link: 'www.google.com'
        },
        {
            title: 'Some other news here that will blow your head off bitch',
            related: 'MSFT, MRK, BMY',
            link: 'www.google.com'
        },
        {
            title: 'Stock Market Crash: Experts Warn 30% Drop in S&P 500 and some other news...',
            related: 'MSFT, MRK',
            link: 'www.google.com'
        },
        {
            title: 'Stock Market Crash: Experts Warn 30% Drop in S&P 500 and some other news...',
            related: 'MSFT, MRK, BMY',
            link: 'www.google.com'
        },
        {
            title: 'Some other news here that will blow your head off bitch',
            related: 'MSFT, MRK, BMY',
            link: 'www.google.com'
        },
        {
            title: 'Stock Market Crash: Experts Warn 30% Drop in S&P 500 and some other news...',
            related: 'MSFT, MRK',
            link: 'www.google.com'
        },
        {
            title: 'Stock Market Crash: Experts Warn 30% Drop in S&P 500 and some other news...',
            related: 'MSFT, MRK, BMY',
            link: 'www.google.com'
        }
    ]
    const [paginated_news, setPaginatedNews] = useState(newsCollection.slice(0,4));
    const [paginationCounter, setPagination] = useState(0)

    function paginateNext(e) {
        e.preventDefault()
        console.log(paginated_news, paginationCounter)
        if (paginationCounter < 2) {
            setPagination(paginationCounter + 1)
            setPaginatedNews(newsCollection.slice(4*paginationCounter, (4*paginationCounter + 4)))
            console.log(paginated_news, paginationCounter)
        }
    }

    function paginatePrev(e) {
        e.preventDefault()
        if (paginationCounter > 0) {
            setPagination(paginationCounter - 1)
            setPaginatedNews(newsCollection.slice(4*paginationCounter, 4*paginationCounter + 4))
        }
    }
    return (
        <div className="pt-8 md:ml-8">
            <div className="flex flex-row pb-4">
                <NewspaperIcon className="-ml-1 mr-0.5 pr-3 text-semibold flex-shrink-0 self-center h-13 w-11 text-white"/>
                <h1 className="text-2xl font-bold text-white">News</h1>
            </div>

            <div className="bg-white overflow-hidden shadow-soft rounded-xl divide-y divide-gray-200">
                <ul className="divide-y divide-gray-200">
                    {paginated_news.map((news) => (
                        <li key={news.id} className="px-6 py-4">
                            <div>
                                <h1 className="pt-2 font-medium text-gray-600 text-base">{news.title}</h1>

                                <div className="pt-2 flex flex-row justify-between items-center">
                                    <div className="flex flex-row items-center">
                                        <h1>Related: </h1>
                                        <h1 className="font-medium ml-4 text-indigo-500 text-base">{news.related}</h1>
                                    </div>
                                    <button type="button" className="inline-flex items-center px-2.5 py-1.5 border border-gray-300  text-xs font-normal rounded text-gray-500 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Read More
                                    </button>
                                </div>
                            </div>
                        </li>
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


