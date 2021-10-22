import React from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import AuthService from "../service/AuthService";
import {routes} from "../routes/Routes";
import {AppContext} from "../context/AppContext";

class LogoutView extends React.Component<RouteComponentProps> {

    static contextType = AppContext;

    componentDidMount() {
        AuthService.logout();
        this.context.toggleAuthenticated(false);
        this.props.history.push(routes.login);
    }

    render() {
        return (
            <></>
        )
    }
}

export default withRouter(LogoutView);