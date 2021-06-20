import { Line } from 'react-chartjs-2';
import React from 'react';

export const PortfolioChart = (props) => {	
    const {portfolioHistory, styleProps} = props;

    var updated = []
    for (var i = 0, l=portfolioHistory.length; i < l; i++) {
        if (portfolioHistory[i] !== 0) {
            updated.push(portfolioHistory[i])
        }
    }

    const data = (canvas) => {
        const ctx = canvas.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, 0, 80);
        gradient.addColorStop(0, 'rgba(106,126,219,0.7)');   
        gradient.addColorStop(0.25, 'rgba(106,126,219,0.25)');
        gradient.addColorStop(0.75, 'rgba(106,126,219,0)');

        return {
            labels: new Array(updated.length).fill(""),
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
                    data : updated,
                    animation: false
                }
            ]
        }
    }


    const options = {
        maintainAspectRatio: false,
        showTooltips: true,
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
            },
        },
    };
	return (
        <div className="line-chart" style={styleProps}>
            <Line 
                data={data} 
                options={options}
            />
        </div>
	)
}

//export const PortfolioChart = React.memo(Chart);