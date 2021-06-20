import { PortfolioChart } from '../chart';
import { XIcon, XCircleIcon } from '@heroicons/react/outline';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromPortfolioAction } from '../../actions/portfolio';
import { useParams } from 'react-router-dom';

export default function StocksTable() {
  const dispatch = useDispatch();
  const owner = useSelector(state => state.auth.user.id);
  const stocks = useSelector(state => state.portfolios.currentPortfolio.stocks);
  const [open, setOpen] = useState(false);
  const [openStock, setOpenStock] = useState({})
  let slug = useParams();
  const [chartInterval, setChartInterval] = useState('1month');

  function tryDeleteSymbol(ticker) {
    dispatch(deleteFromPortfolioAction(slug.name, owner, ticker))
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
              <div className="inline-block align-bottom bg-white rounded-xl px-8 pt-5 pb-4 text-left overflow-hidden shadow-soft transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:px-10 sm:pt-4 sm:pb-8">
                  <div className="flex justify-between items-center">
                    <div className="px-4 py-5 sm:px-6">
                          <h3 className="text-xl leading-6 font-medium text-gray-900">{openStock.ticker}</h3>
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

                  <div className="grid grid-cols-2 border divide-x divide-gray-200 border-gray-200 rounded-lg">
                    <div>
                      <div className="py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                          <div className="sm:grid sm:grid-cols-2 sm:gap-4">
                            <dt className="px-4 py-4 sm:py-5 w-full h-full bg-gray-100 text-sm font-medium text-gray-500">Shares Outstanding</dt>
                            <dd className="px-4 py-4 sm:py-5 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">{openStock.keyStats.sharesOutstanding}</dd>
                          </div>
                          <div className="sm:grid sm:grid-cols-2 sm:gap-4">
                            <dt className="px-4 py-4 sm:py-5 w-full h-full bg-gray-100 text-sm font-medium text-gray-500">Avg. 10 Volume</dt>
                            <dd className="px-4 py-4 sm:py-5 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">{openStock.keyStats.avg10Volume}</dd>
                          </div>
                          <div className="sm:grid sm:grid-cols-2 sm:gap-4">
                            <dt className="px-4 py-4 sm:py-5 w-full h-full bg-gray-100 text-sm font-medium text-gray-500">TTM EPS</dt>
                            <dd className="px-4 py-4 sm:py-5 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">{openStock.keyStats.ttmEPS}</dd>
                          </div>
                          <div className="sm:grid sm:grid-cols-2 sm:gap-4">
                            <dt className="px-4 py-4 sm:py-5 w-full h-full bg-gray-100 text-sm font-medium text-gray-500">PE Ratio</dt>
                            <dd className="px-4 py-4 sm:py-5 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">{openStock.keyStats.peRatio.toFixed(8)}</dd>
                          </div>
                          <div className="sm:grid sm:grid-cols-2 sm:gap-4">
                            <dt className="px-4 py-4 sm:py-5 w-full h-full bg-gray-100 text-sm font-medium text-gray-500">Beta</dt>
                            <dd className="px-4 py-4 sm:py-5 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-1">{openStock.keyStats.beta.toFixed(8)}</dd>
                          </div>
                        </dl>
                      </div>

                    </div>
                    
                    <div>
                      <div className="py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200">
                          <div className="sm:grid sm:grid-cols-6 sm:gap-4">
                            <dt className="px-4 py-4 sm:py-5 text-sm font-medium w-full h-full bg-gray-100 text-gray-500 sm:col-span-3">Max Change %</dt>
                            <dd className="px-4 py-4 sm:py-5 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">{openStock.keyStats.maxChangePercent.toFixed(8)}</dd>
                          </div>
                          <div className="sm:grid sm:grid-cols-6 sm:gap-4">
                            <dt className="px-4 py-4 sm:py-5 text-sm font-medium text-gray-500 bg-gray-100 sm:col-span-3">Avg. 30 Volume</dt>
                            <dd className="px-4 py-4 sm:py-5 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">{openStock.keyStats.avg30Volume}</dd>
                          </div>
                          <div className="sm:grid sm:grid-cols-6 sm:gap-4">
                            <dt className="px-4 py-4 sm:py-5 text-sm font-medium text-gray-500 bg-gray-100 sm:col-span-3">Day 50 Moving Avg.</dt>
                            <dd className="px-4 py-4 sm:py-5 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">{openStock.keyStats.day50MovingAvg}</dd>
                          </div>
                          <div className="sm:grid sm:grid-cols-6 sm:gap-4">
                            <dt className="px-4 py-4 sm:py-5 text-sm font-medium text-gray-500 bg-gray-100 sm:col-span-3">Day 200 Moving Avg.</dt>
                            <dd className="px-4 py-4 sm:py-5 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">{openStock.keyStats.day200MovingAvg}</dd>
                          </div>
                          <div className="sm:grid sm:grid-cols-6 sm:gap-4">
                            <dt className="px-4 py-4 sm:py-5 text-sm font-medium text-gray-500 bg-gray-100 sm:col-span-3">Dividend Yield</dt>
                            <dd className="px-4 py-4 sm:py-5 mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">{openStock.keyStats.dividendYield.toFixed(8)}</dd>
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
      <div>
        {stockModal()}
        <div className="flex flex-col px-6 pb-6 pt-3">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                        Last Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                        Change
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                        Volume
                      </th>
                      {/*<th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                        Shares
                      </th>*/}

                      <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 tracking-wider">
                        Day Chart
                      </th>

                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                        Shares
                      </th>

                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                        
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {stocks.map((stock) => (
                      
                      <tr key={stock.ticker}>
                        <td onClick={() => modalOpen(stock)} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 cursor-pointer">{stock.ticker.toUpperCase()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stock.latestPrice}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stock.change}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stock.latestVolume}</td>
                        <td className="px-2 py-1 text-sm text-gray-500">
                            <div className="flex flex-row justify-center items-center">
                                {PortfolioChart({ portfolioHistory: stock.pastValues, styleProps: { height: 65, width: '70%' } } )}
                            </div>
                            
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stock.numberOfShares}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"> 
                          <XIcon onClick={() => tryDeleteSymbol(stock.ticker)} className="h-5 w-5" /> 
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="pt-4 text-xs text-gray-400 font-light">Note that the API this app uses may return wrong and/or incomplete data—such as previous close price and historical prices—for some stocks, which in turn may cause irregularities in updating portfolio statistics and the charts. If you suspect this may be the case, removing the stock from your portfolio will trigger an update of portfolio statistics. </p>
            </div>
          </div>
        </div>        
      </div>
      
    )
  }

