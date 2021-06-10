import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';
import { QuestionMarkCircleIcon } from '@heroicons/react/outline';
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'
import React, { useState } from 'react';

export default function PanelTop() {
    return (
        <div>
            <div>
                <div className="flex flex-row">
                    <h1 className="text-3xl font-bold text-white">Top Stocks</h1>
                    <QuestionMarkCircleIcon className="-ml-1 mr-0.5 pl-4 flex-shrink-0 self-center h-10 w-10 text-white"/>
                </div>
                <div>
                    <h2 className="text-sm text-white pt-2 pb-4">
                        Right Now
                    </h2>
                </div>
            </div>
            <StocksList />
        </div>
    )
}


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function StocksList() {
  const stats = [
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
  const [paginated_stocks, setPaginatedStocks] = useState(stats.slice(0,5));

  function paginateNext(e) {
    e.preventDefault()
    setPaginatedStocks(stats.slice(5,))
  }

  function paginatePrev(e) {
    e.preventDefault()
    setPaginatedStocks(stats.slice(0, 5))
  }

  return (
    <div className="flex flex-row w-full">
      
      <dl className="mt-2 grid grid-cols-1 w-full rounded-xl bg-white overflow-hidden shadow-soft divide-dashed divide-y divide-gray-200 md:grid-cols-top md:divide-y-0 md:divide-x">
        <div className="flex items-center justify-center">
          <a onClick={(e) => paginatePrev(e)} className=" border-transparent pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
            <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          </a>
        </div>
        {paginated_stocks.map((item) => (
          <div key={item.ticker} className="px-4 py-3 sm:p-4 flex flex-col">
            <dt className="text-lg font-semibold text-indigo-500 pb-px">{item.ticker}</dt>
            <dd>
              <div className="text-sm font-normal text-gray-400 pb-1">
                  {truncate(item.name)}
              </div>

              <div className="mt-1 flex justify-between items-baseline md:block lg:flex">
                
                <div className="flex items-baseline text-xl font-semibold text-gray-700">
                  {item.stat}
                  
                </div>

                <div
                  className={classNames(
                    item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                    'inline-flex items-baseline px-2.5 py-0.5 rounded-lg text-sm font-medium md:mt-2 lg:mt-0'
                  )}
                >
                  {item.changeType === 'increase' ? (
                    <ArrowSmUpIcon
                      className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500"
                      aria-hidden="true"
                    />
                  ) : (
                    <ArrowSmDownIcon
                      className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500"
                      aria-hidden="true"
                    />
                  )}

                  <span className="sr-only">{item.changeType === 'increase' ? 'Increased' : 'Decreased'} by</span>
                  {item.change}
                </div>
              </div>
              
            </dd>
          </div>
        ))}
        <div className="flex items-center justify-center">
          <a onClick={(e) => paginateNext(e)} className="border-transparent pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
            <ArrowNarrowRightIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          </a>
        </div>
      </dl>
    </div>
  )
}

function truncate(str) {
  return str.length > 20 ? str.substring(0, 20) + "..." : str;
}