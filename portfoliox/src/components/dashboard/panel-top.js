import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';
import { QuestionMarkCircleIcon } from '@heroicons/react/outline';
import { XCircleIcon } from '@heroicons/react/outline';
import { ArrowNarrowLeftIcon, ArrowNarrowRightIcon } from '@heroicons/react/solid'
import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { useSelector } from 'react-redux';
import { PortfolioChart } from '../chart';


export default function PanelTop() {
    return (
        <div>
            <div>
                <div className="flex flex-row">
                    <h1 className="text-3xl font-bold text-gray-600">Top Stocks</h1>
                </div>
                <div>
                    <h2 className="text-sm text-gray-500 pt-2 pb-4">
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
  var stocks = useSelector(state => state.topStocks.stocks)
  const [paginationCounter, setPaginationCounter] = useState(0)
  const [paginated_stocks, setPaginatedStocks] = useState(stocks.slice(0,5));

  const [open, setOpen] = useState(false);
  const [openStock, setOpenStock] = useState({})
  const [chartInterval, setChartInterval] = useState('1month');

  function paginateNext(e) {
    e.preventDefault()
    if (stocks.length > 5) {
      setPaginatedStocks(stocks.slice(5,))
      setPaginationCounter(paginationCounter + 1)
    }
  }

  function paginatePrev(e) {
    e.preventDefault()
    if (stocks.length > 5) {
      setPaginatedStocks(stocks.slice(0, 5))
      setPaginationCounter(paginationCounter - 1)
    }
  }

  function chartModes() {
    if (chartInterval === '1month') {
        return (
            <div>
                {PortfolioChart({ portfolioHistory: openStock.pastValues1mo, styleProps: { height: 115, width: '100%', paddingLeft: 0 } }) }
            </div>
        )
    } else if (chartInterval === '6month') {
        return (
            <div>
                {PortfolioChart({ portfolioHistory: openStock.pastValues6mo, styleProps: { height: 115, width: '100%', paddingLeft: 0 } }) }
            </div>
        )
    } else if (chartInterval === '1year') {
        return (
            <div>
                {PortfolioChart({ portfolioHistory: openStock.pastValues1yr, styleProps: { height: 115, width: '100%', paddingLeft: 0 } }) }
            </div>
        )
    }
  }

  function modalOpen(stock) {
    setOpenStock(stock)
    setOpen(true)
  }

  function stockModal() {
    if (Object.keys(openStock).length !== 0) {
      return (
        <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" static className="fixed z-10 inset-0 overflow-y-auto" open={open} onClose={setOpen}>
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
                  <div className="flex justify-between items-center">
                    <div className="px-4 py-5 sm:px-6">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">{openStock.ticker}</h3>
                          <p className="mt-1 max-w-2xl text-sm text-gray-500">Key Statistics</p>
                    </div>  
                    <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent px-4 py-2  text-base font-medium text-white  focus:outline-none sm:text-sm"
                        onClick={() => setOpen(false)}
                      >
                        <XCircleIcon className="w-8 h-8 text-gray-300" />
                      </button>                  
                  </div>

                  <div className="grid grid-cols-2">
                    <div>
                      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Shares Outstanding</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">{openStock.keyStats.sharesOutstanding}</dd>
                          </div>
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Avg. 10 Volume</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">{openStock.keyStats.avg10Volume}</dd>
                          </div>
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">TTM EPS</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">{openStock.keyStats.ttmEPS}</dd>
                          </div>
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">PE Ratio</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">{openStock.keyStats.peRatio}</dd>
                          </div>
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Beta</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">{openStock.keyStats.beta}</dd>
                          </div>
                        </dl>
                      </div>

                    </div>
                    
                    <div>
                      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                          <div className="py-4 sm:grid sm:grid-cols-6 sm:py-5 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 sm:col-span-3">Max Change %</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">{openStock.keyStats.maxChangePercent}</dd>
                          </div>
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 sm:col-span-3">Avg. 30 Volume</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">{openStock.keyStats.avg30Volume}</dd>
                          </div>
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 sm:col-span-3">Day 50 Moving Avg.</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">{openStock.keyStats.day50MovingAvg}</dd>
                          </div>
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 sm:col-span-3">Day 200 Moving Avg.</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">{openStock.keyStats.day200MovingAvg}</dd>
                          </div>
                          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 sm:col-span-3">Dividend Yield</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">{openStock.keyStats.dividendYield}</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-row justify-center gap-3 pt-8 pb-4">
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
                  {chartModes()}


                  <div>

                  </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      )
    }
  }


  return (
    <div className="flex flex-row w-full">
    
    <dl className="mt-2 grid grid-cols-1 w-full rounded-xl bg-white overflow-hidden shadow-soft divide-dashed divide-y divide-gray-200 md:grid-cols-top md:divide-y-0 md:divide-x">
      <div className="flex items-center justify-center">
        <a href="/#" onClick={(e) => paginatePrev(e)} className=" border-transparent pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
          <ArrowNarrowLeftIcon className={(paginationCounter === 0) ? "mr-3 h-5 w-5 text-gray-400 opacity-40 " : "mr-3 h-5 w-5 text-gray-400"} aria-hidden="true" />
        </a>
      </div>

      {paginated_stocks.map((item, index) => (
            <div onClick={() => modalOpen(item)} key={index} className="px-4 py-3 sm:p-4 flex flex-col">
                <dt className="text-lg font-semibold text-indigo-500 pb-px">{item.symbol}</dt>
                <dd>
                  <div className="text-sm font-normal text-gray-400 pb-1">
                      {truncate(item.companyName)}
                  </div>

                  <div className="mt-1 flex justify-between items-baseline md:block lg:flex">
                    
                    <div className="flex items-baseline text-xl font-semibold text-gray-700">
                      {item.latestPrice}
                    </div>

                    <div className={classNames( item.change > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800','inline-flex items-baseline px-2.5 py-0.5 rounded-lg text-sm font-medium md:mt-2 lg:mt-0' )}>
                      {item.change > 0 ? ( <ArrowSmUpIcon className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-green-500" aria-hidden="true"/>) : ( <ArrowSmDownIcon className="-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-red-500" aria-hidden="true" /> )}

                      <span className="sr-only">{item.change > 0 ? 'Increased' : 'Decreased'} by</span>
                      {item.change}
                    </div>
                  </div>
                </dd>
            </div>
        ))}
      <div className="flex items-center justify-center">
        <a href="/#" onClick={(e) => paginateNext(e)} className="border-transparent pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
          <ArrowNarrowRightIcon className={(paginationCounter === 1) ? "mr-3 h-5 w-5 text-gray-400 opacity-40" : "mr-3 h-5 w-5 text-gray-400"} aria-hidden="true" />
        </a>
      </div>
    </dl>
  </div>
  )
}

function truncate(str) {
  return str.length > 20 ? str.substring(0, 20) + "..." : str;
}

