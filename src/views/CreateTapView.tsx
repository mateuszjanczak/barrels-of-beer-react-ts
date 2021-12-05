import React from "react";
import {Redirect} from "react-router-dom";
import styled from "styled-components";
import {routes} from "../routes/Routes";
import TapService from "../service/TapService";
import {INewTap} from "../model/request/INewTap";
import AuthService from "../service/AuthService";

interface IProps {
}

interface IState {
    newTap: INewTap
    redirect: boolean
    error: boolean
    message: string
    validation: string[]
}

class CreateTapView extends React.Component<IProps, IState> {

    state = {
        newTap: {
            tapId: 1
        },
        redirect: false,
        error: false,
        message: "",
        validation: []
    }

    handleChange = (event: { target: { name: string; value: any; }; }) => {
        const {name, value} = event.target;
        this.setState({
            newTap: {
                [name]: value
            }
        } as Pick<IState, keyof IState>);
    };

    handleSubmit = () => {
        const {newTap} = this.state;
        TapService.createTap(newTap).then(() => this.setState({redirect: true})).catch(({message, validation}) => {this.setState({error: true, message: message, validation: validation}); AuthService.refreshToken();})
    }

    render() {
        const {newTap} = this.state;

        return (
            <Wrapper className="container">
                <Heading>Create tap</Heading>

                {this.state.error && <div className="w-100 alert alert-danger">
                    {this.state.message}
                </div>}

                <div className="mb-3">
                    <Label htmlFor="id" className="form-label">Tap ID
                        <input type="number" className="form-control" id="tapId" name="tapId" value={newTap.tapId}
                               onChange={this.handleChange}/>
                    </Label>
                    {this.state.validation !== undefined && this.state.validation['tapId'] != null &&
                    <div className="w-100 alert alert-danger">
                        {this.state.validation['tapId'].sort((a,b) => a.length - b.length).map((error) => <p>{error}</p>)}
                    </div>}
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

const Label = styled.div`
  margin: 1rem 0;
`;

export default CreateTapView;
