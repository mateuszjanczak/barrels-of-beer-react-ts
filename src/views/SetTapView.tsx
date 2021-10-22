import React from "react";
import {Redirect, RouteComponentProps} from "react-router-dom";
import styled from "styled-components";
import {ITapDetails} from "../model/request/ITapDetails";
import TapService from "../service/TapService";
import {routes} from "../routes/Routes";
import AuthService from "../service/AuthService";

interface IProps {
}

interface IState {
    tapId: number
    tapDetails: ITapDetails
    redirect: boolean
}

class SetTapView extends React.Component<IProps & RouteComponentProps, IState> {

    state = {
        tapId: 0,
        tapDetails: {
            contentType: "",
            capacity: 0
        },
        redirect: false
    }

    componentDidMount() {
        const {tapId} = this.props.match.params;
        this.setState({tapId})
        this.fetchTap(tapId)
    }

    handleChange = (event: { target: { name: string; value: any; }; }) => {
        const {name, value} = event.target;
        this.setState({
            tapDetails: {
                ...this.state.tapDetails,
                [name]: value
            }
        } as Pick<IState, keyof IState>);
    };

    handleSubmit = () => {
        const {tapId} = this.state;
        const {tapDetails} = this.state;
        TapService.setTap(tapId, tapDetails).then(() => this.setState({redirect: true})).catch(() => AuthService.refreshToken())

    }

    fetchTap = (id: number) => {
        TapService.getTap(id).then((tap) => this.setState({
            tapDetails: {
                contentType: tap.barrelContent,
                capacity: tap.capacity
            }
        })).catch(() => AuthService.refreshToken())
    }

    render() {
        const {tapId} = this.state;
        const {contentType, capacity} = this.state.tapDetails;


        return (
            <Wrapper className="container">
                <Heading>Set tap</Heading>

                <div className="mb-3">
                    <label htmlFor="id" className="form-label">Tap</label>
                    <input type="text" className="form-control" id="tapId" value={tapId} disabled/>
                </div>

                <div className="mb-3">
                    <label htmlFor="contentType" className="form-label">Content type</label>
                    <select className="form-select" id="contentType" name="contentType" value={contentType} onChange={this.handleChange}>
                        <option defaultChecked>Choose from the list</option>
                        <option value="CHMYZ_Pils">CHMYZ Pils</option>
                        <option value="GAZDA_Marcowe">GAZDA Marcowe</option>
                        <option value="KRASA_Weizen">KRASA Weizen</option>
                        <option value="UPIR_Dunkel">UPIR Dunkel</option>
                        <option value="KICARZ_Koźlak">KICARZ Koźlak</option>
                        <option value="KADUK_Podwójny_Koźlak">KADUK Podwójny Koźlak</option>
                        <option value="SĘDEK_IPA">SĘDEK IPA</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="capacity" className="form-label">Capacity [ml]</label>
                    <input type="number" className="form-control" id="capacity" name="capacity" value={capacity}
                           onChange={this.handleChange}/>
                </div>

                <button className="btn btn-light" onClick={this.handleSubmit}>Save</button>

                {this.state.redirect && <Redirect to={routes.taps}/>}
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

export default SetTapView;