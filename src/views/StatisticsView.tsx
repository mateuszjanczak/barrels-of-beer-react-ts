import React from "react";
import styled from "styled-components";
import StatisticsService from "../service/StatisticsService";
import {IStatistics} from "../model/response/IStatistics";
import StatisticsChart from "../components/StatisticsChart";
import AuthService from "../service/AuthService";

interface IProps {
}

interface IState {
    statistics: IStatistics[]
    from: string
    to: string
    interval: number
}

class StatisticsView extends React.Component<IProps, IState> {

    state = {
        statistics: [],
        from: "",
        to: "",
        interval: 0
    }

    fetchStatistics = (from: string, to: string, interval: number) => {
        StatisticsService.getStatistics(from, to, interval).then(statistics => this.setState({statistics})).catch(() => AuthService.refreshToken())
    }

    handleChange = (event: { target: { name: string; value: any; }; }) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        } as Pick<IState, keyof IState>);
    };

    handleClick = () => {
        let {from, to, interval} = this.state;
        from = from.replace('T', ' ');
        to = to.replace('T', ' ');
        this.fetchStatistics(from, to, interval);
    }

    render() {
        const {statistics} = this.state;

        return (
            <Wrapper className="container">
                <Heading>Statistics</Heading>

                <div className="container bg-light text-dark py-3 mb-5">
                    <div className="mb-3">
                        <label htmlFor="from" className="form-label">Start date</label>
                        <input type="datetime-local" className="form-control" id="from" name="from" onChange={this.handleChange}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="to" className="form-label">End date</label>
                        <input type="datetime-local" className="form-control" id="to" name="to" onChange={this.handleChange}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="counter" className="form-label">Interval (minute)</label>
                        <input type="number" className="form-control" id="interval" name="interval" onChange={this.handleChange}/>
                    </div>

                    <button className="btn btn-primary" onClick={this.handleClick}>Search</button>
                </div>

                {statistics.map((item: IStatistics) => (
                    <div className="container bg-light text-dark py-3 mb-5">
                        <h3>{item.name}</h3>
                        <StatisticsChart data={item}/>
                    </div>
                ))}
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
  margin-bottom: 5rem;
`;

const Heading = styled.h1`
  text-align: center;
  margin: 2rem 0;
`;

export default StatisticsView;