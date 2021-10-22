import React, {Component} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AuthenticationService from "../service/AuthService";
import {routes} from "./Routes";

class AuthenticatedRoute extends Component<any, any> {

    render() {
        if(AuthenticationService.isLogged()) {
            return <Route {...this.props}/>
        } else {
            return <Redirect to={routes.login} />
        }
    }
}

export default AuthenticatedRoute