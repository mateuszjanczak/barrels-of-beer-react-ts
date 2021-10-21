import React from "react";
import styled from "styled-components";
import StatisticsService from "../service/StatisticsService";
import {IRanking} from "../model/response/IRanking";
import RankingChart from "../components/RankingChart";

interface IProps {
}

interface IState {
    ranking: IRanking[]
}

class RankingView extends React.Component<IProps, IState> {

    state = {
        ranking: []
    }

    componentDidMount() {
        this.fetchRanking()
    }

    fetchRanking = () => {
        StatisticsService.getRanking().then(ranking => this.setState({ranking}))
    }

    render() {
        const {ranking} = this.state;

        return (
            <Wrapper className="container">
                <Heading>Ranking</Heading>

                {ranking.length > 0 && <div className="container bg-light py-3">
                    <RankingChart data={ranking}/>
                </div>}
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

export default RankingView;