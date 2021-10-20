import React from "react";
import styled from "styled-components";
import {ITap} from "../model/response/ITap";
import TapService from "../service/TapService";
import AdminService from "../service/AdminService";

interface IProps {
}

interface IState {
    taps: ITap[]
}

class AdminView extends React.Component<IProps, IState> {

    state = {
        taps: []
    }

    componentDidMount() {
        this.fetchTaps()
    }

    fetchTaps = () => {
        TapService.getTaps().then(taps => this.setState({taps}))
    }

    handleEnableTap = (tapId: number) => {
        AdminService.enableTap(tapId).then(() => alert(`Tap ${tapId} enabled successfully`))
    }

    handleDisableTap = (tapId: number) => {
        AdminService.disableTap(tapId).then(() => alert(`Tap ${tapId} disabled successfully`))
    }

    render() {
        const {taps} = this.state;

        return (
            <Wrapper className="container">
                <Heading>Admin panel</Heading>

                <Instruction>
                    <h2>Tap management</h2>
                    <ul className="list-group">
                        {taps.length === 0 && <p>No data</p>}
                        {taps.map(({tapId}) => (
                            <li className="list-group-item list-group-item-info d-flex justify-content-between align-items-center">
                                <span>
                                    Tap ID {tapId}
                                </span>
                                <div className="d-flex gap-2">
                                    <button type="button" className="btn btn-outline-success"
                                            onClick={() => this.handleEnableTap(tapId)}>Enable</button>
                                    <button type="button" className="btn btn-outline-secondary"
                                            onClick={() => this.handleDisableTap(tapId)}>Disable</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Instruction>
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

const Instruction = styled.div`
  margin-bottom: 2rem;
  > h2 {
    margin-bottom: 1rem;
  }
`;

export default AdminView;