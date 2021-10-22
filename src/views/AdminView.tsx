import React from "react";
import styled from "styled-components";
import {ITap} from "../model/response/ITap";
import TapService from "../service/TapService";
import AdminService from "../service/AdminService";
import {TableType} from "../model/TableType";
import AuthService from "../service/AuthService";

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
        TapService.getTaps().then(taps => this.setState({taps})).catch(() => AuthService.refreshToken())
    }

    handleEnableTap = (tapId: number) => {
        AdminService.enableTap(tapId).then(() => alert(`Tap ${tapId} enabled successfully`)).catch(() => AuthService.refreshToken())
    }

    handleDisableTap = (tapId: number) => {
        AdminService.disableTap(tapId).then(() => alert(`Tap ${tapId} disabled successfully`)).catch(() => AuthService.refreshToken())
    }

    handleRemoveTap = (tapId: number) => {
        const agreement = window.confirm(`Are you sure you want to remove tap ${tapId}?`);
        if (agreement) AdminService.removeTap(tapId).then(() => alert(`Tap ${tapId} removed successfully`)).then(() => this.fetchTaps()).catch(() => AuthService.refreshToken())
    }

    handleResetDatabase = (tableType: TableType) => {
        const agreement = window.confirm(`Are you sure you want to reset ${tableType} in database?`);
        if (agreement) AdminService.resetDatabase(tableType).then(() => alert(`Table ${tableType} deleted successfully`)).then(() => this.fetchTaps()).catch(() => AuthService.refreshToken())
    }

    render() {
        const {taps} = this.state;

        return (
            <Wrapper className="container">
                <Heading>Admin panel</Heading>

                <Component>
                    <h2>Tap management</h2>
                    <ul className="list-group">
                        {taps.length === 0 && <p>No data</p>}
                        {taps.map(({tapId}) => (
                            <li className="list-group-item list-group-item-info d-flex justify-content-between align-items-center">
                                <span>
                                    Tap ID {tapId}
                                </span>
                                <div className="d-flex gap-2">
                                    <button type="button" className="btn btn-success"
                                            onClick={() => this.handleEnableTap(tapId)}>Enable
                                    </button>
                                    <button type="button" className="btn btn-secondary"
                                            onClick={() => this.handleDisableTap(tapId)}>Disable
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={() => this.handleRemoveTap(tapId)}>Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Component>

                <Component>
                    <h2>Database</h2>
                    <ul className="list-group">
                        <li className="list-group-item list-group-item-info d-flex justify-content-between align-items-center">
                            <span>
                               Taps
                            </span>
                            <div className="d-flex gap-2">
                                <button type="button" className="btn btn-danger"
                                        onClick={() => this.handleResetDatabase(TableType.TAPS)}>Remove
                                </button>
                            </div>
                        </li>
                        <li className="list-group-item list-group-item-info d-flex justify-content-between align-items-center">
                            <span>
                                Action Events
                            </span>
                            <div className="d-flex gap-2">
                                <button type="button" className="btn btn-danger"
                                        onClick={() => this.handleResetDatabase(TableType.ACTION_EVENTS)}>Remove
                                </button>
                            </div>
                        </li>
                        <li className="list-group-item list-group-item-info d-flex justify-content-between align-items-center">
                            <span>
                                Temperature Events
                            </span>
                            <div className="d-flex gap-2">
                                <button type="button" className="btn btn-danger"
                                        onClick={() => this.handleResetDatabase(TableType.TEMPERATURE_EVENTS)}>Remove
                                </button>
                            </div>
                        </li>
                    </ul>
                </Component>
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

const Component = styled.div`
  margin-bottom: 2rem;

  > h2 {
    margin-bottom: 1rem;
  }
`;

export default AdminView;