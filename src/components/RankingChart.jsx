import React from "react";
import {Chart, registerables} from "chart.js";
Chart.register(...registerables)

class RankingChart extends React.Component {

    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    componentDidUpdate() {
        this.myChart.data.labels = [...this.props.data.map(item => item.barrelContent)];
        this.myChart.data.datasets[0].data = [...this.props.data.map(item => item.count / 1000)];
        this.myChart.update();
    }

    componentDidMount() {
        const labels = [...this.props.data.map(item => item.barrelContent)];

        const data = {
            labels: labels,
            datasets: [{
                label: 'L',
                data: this.props.data.map(item => item.count / 1000),
                backgroundColor: "#efa75e",
                borderWidth: 1
            }]
        };

        this.myChart = new Chart(this.chartRef.current, {
            type: 'bar',
            options: {
                animation: false,
                legend: false,
                scales: {
                    xAxes: [{
                        ticks: {
                            display: true
                        },
                        gridLines: {
                            display: true,
                            color: "#000000"
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: true,
                            color: "#000000"
                        },
                        ticks: {
                            beginAtZero: true,
                            suggestedMax: 1.5 * Math.max(...this.props.data.map(item => parseInt(item.count) / 1000))
                        }
                    }]
                }
            },
            data
        });
    }

    render() {
        return <canvas ref={this.chartRef} />;
    }
}

export default RankingChart;