import { CollectionIcon } from '@heroicons/react/outline';
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';
import { Line } from 'react-chartjs-2';
import { TrashIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';

export default function PanelPortfolios() {
    const [createNew, setCreateNew] = useState(false)

    const createState = () => {
        if (createNew) {
            return (
                <div>
                    <div className="bg-white overflow-hidden shadow-soft rounded-lg mb-10">
                        <div className="px-4 pt-5 grid grid-cols-add pb-3 sm:px-6">
                            <div>
                                <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="username"
                                placeholder="Portfolio Name"
                                className="block p-4 w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-lg sm:text-lg border-white"
                            />
                            </div>

                            <div className="flex justify-end items-center">
                                <button type="button" className="inline-flex items-center px-6 py-5 border border-gray-300 text-normal leading-4 font-normal rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Create
                                </button>
                            </div>
                            
                        </div>
                        
                    </div>

                </div>
            )
        } else {
            return (
                <div className="flex justify-center items-center overflow-hidden rounded-lg border h-28">
                    <span onClick={() => setCreateNew(!createNew)} className="font-normal text-xl text-gray-400">
                        Create New
                    </span>
                </div>
            )
        }
    }
    return (
        <div className="pt-8">
            <div className="flex flex-row pb-4">
                <CollectionIcon className="-ml-1 mr-0.5 pr-3 text-semibold flex-shrink-0 self-center h-13 w-11 text-white"/>
                <h1 className="text-2xl font-bold text-white">Your Portfolios</h1>
            </div>

            <div className="max-w-full">
                {portfolios.map((portfolio, index) => (
                    <PortfolioCard portfolio={portfolio} />
                ))}
                
                {createState()}
            </div>
        </div>
    )
}

const PortfolioCard = ({ portfolio }) => {
    var changeType1 = 'increase'
    var changeType2 = 'increase'
    if (portfolio.dailyGain.percent < 0) {
        changeType1 = 'decrease'
    }
    if (portfolio.totalGain.percent < 0) {
        changeType2 = 'decrease'
    }
    return (
        <div className="bg-white overflow-hidden shadow-soft rounded-xl mb-10">
            <div className="px-4 pt-5 pb-3 sm:px-6">
                <div className="flex flex-row justify-between">
                    <h1 className="font-medium text-gray-400 text-xl">{portfolio.name}</h1>
                    <TrashIcon className="text-gray-400 h-6 w-6"/>
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
                                    <div className={classNames(changeType1 === 'increase' ? 'bg-red-100 text-green-800' : 'bg-red-100 text-red-800',
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
                    {PortfolioChart({ portfolioHistory: portfolio.past2Weeks })}
                </div>
            </div>
        </div>
    )
}

const PortfolioChart = (props) => {	
    const {portfolioHistory} = props;

    const data = (canvas) => {
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, 0, 80);
        gradient.addColorStop(0, 'rgba(106,126,219,0.7)');   
        gradient.addColorStop(0.2, 'rgba(106,126,219,0.25)');
        gradient.addColorStop(0.5, 'rgba(106,126,219,0)');

        return {
            labels: ["","","","","","","", "","","","","","",""],
            datasets: [
                {
                    fill: 'start',
                    radius: 0,
                    backgroundColor : gradient, // Put the gradient here as a fill color
                    borderColor : "#6A7EDB",
                    borderWidth: 2,
                    pointColor : "#fff",
                    lineTension: 0.4,
                    pointStrokeColor : "#6A7EDB",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "#6A7EDB",
                    data : portfolioHistory
                }
            ]
        }
    }


    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    display: false
                },
                type: 'logarithmic',
            },
        },
    };
    
	return (
        <div className="line-chart" style={{ height: 65, width: '92%', paddingLeft: 20 }}>
            <Line 
                data={data} 
                options={options}
            />
        </div>
	)
}

const portfolios = [
    { name: "Personal", stocks: 
        [
            {ticker: "TWTR", initialPrice: 44.09, numberOfShares: 9},
            {ticker: "AAPL", initialPrice: 112.79, numberOfShares: 4},
            {ticker: "NKE", initialPrice: 15.3, numberOfShares: 11}
        ],
        totalValue: "12,312.54",
        dailyGain: {total: 318.01, percent: -13.80},
        totalGain: {total: 1758.01, percent: +54.07},
        past2Weeks: [25.0,32.4,22.2,39.4,34.2,22.0,23.2, 25.0,32.4,22.2,39.4,34.2,22.0,23.2],
    },
    { name: "Personal Other", stocks: 
        [
            {ticker: "TWTR", initialPrice: 44.09, numberOfShares: 9},
            {ticker: "AAPL", initialPrice: 112.79, numberOfShares: 4},
            {ticker: "NKE", initialPrice: 15.3, numberOfShares: 11}
        ],
        totalValue: "12,312.54",
        dailyGain: {total: 318.01, percent: -13.80},
        totalGain: {total: 1758.01, percent: +54.07},
        past2Weeks: [125.0,132.4,122.2,172,93,130,123.2, 125.0,232.4,122.2,139.4,34.2,122.0,123.2],
    }
  ]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}