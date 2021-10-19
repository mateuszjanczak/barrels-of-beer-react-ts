import React from "react";
import {Redirect} from 'react-router-dom'
import {routes} from "../routes/Routes";
import TapService from "../service/TapService";
import {INewTap} from "../model/request/INewTap";

interface IProps {
}

interface IState {
    newTap: INewTap,
    redirect: boolean
}

class CreateTapView extends React.Component<IProps, IState> {

    state = {
        newTap: {
            tapId: 1
        },
        redirect: false
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
        TapService.createTap(newTap).then(() => this.setState({redirect: true}))
    }

    render() {
        const {newTap} = this.state;

        return (
            <div>
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">Tap ID</label>
                    <input type="number" className="form-control" id="tapId" name="tapId" value={newTap.tapId}
                           onChange={this.handleChange}/>
                </div>
                <button className="btn btn-primary" onClick={this.handleSubmit}>Add tap</button>
                {this.state.redirect && <Redirect to={routes.taps}/>}
            </div>
        );
    }
}

export default CreateTapView;