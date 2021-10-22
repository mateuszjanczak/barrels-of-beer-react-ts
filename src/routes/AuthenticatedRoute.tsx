import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthService from "../service/AuthService";
import {routes} from "./Routes";

class AuthenticatedRoute extends Component<any, any> {

    render() {
        if(AuthService.isLogged()) {
            return <Route {...this.props}/>
        } else {
            return <Redirect to={routes.login} />
        }
    }
}

export default AuthenticatedRoute