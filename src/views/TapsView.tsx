import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import TapService from "../service/TapService";
import {routes} from "../routes/Routes";
import Tap from "../components/Tap";
import {ITap} from "../model/response/ITap";

interface IProps {}

interface IState {
    taps: ITap[]
}

class TapsView extends React.Component<IProps, IState> {

    state = {
        taps: []
    }

    componentDidMount() {
        this.fetchTaps()
    }

    fetchTaps = () => {
        TapService.getTaps().then(taps => this.setState({taps}))
    }

    handleRefresh = () => {
        this.fetchTaps()
    }

    render() {
        return (
            <Wrapper className="container">
                <Heading>Browar Trzy Korony</Heading>

                <Nav>
                    <Link to={routes.createTap}>
                        <button type="button" className="btn btn-light">Add tap</button>
                    </Link>
                    <button type="button" className="btn btn-light" onClick={this.handleRefresh}>Refresh</button>
                </Nav>

                <Items>
                    {this.state.taps.map(tap => (<Tap tap={tap}/>))}
                </Items>
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

const Nav = styled.div`
  text-align: center;
  margin: 2rem 0;

  > * {
    margin: 0 0.5rem;
  }
`;

const Items = styled.div`
  display: grid;

  @media screen and (min-width: 810px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 1050px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 1290px) {
    grid-template-columns: repeat(4, 1fr);
  }

  grid-gap: 2rem;
`;

export default TapsView;