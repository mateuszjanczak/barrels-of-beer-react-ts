import React from "react";
import {NavLink} from "react-router-dom";
import {AppContext} from '../context/AppContext';
import {routes} from "../routes/Routes";

class Navbar extends React.Component {

    state = {
        visible: false
    }

    toggleNav = () => {
        this.setState({
            visible: !this.state.visible
        })
    }

    showNav = () => {
        this.setState({
            visible: true
        })
    }

    hideNav = () => {
        this.setState({
            visible: false
        })
    }

    render() {
        const renderLink = (isAuthenticated: boolean) => {
            return isAuthenticated ? (
                <NavLink to={routes.logout} className="nav-link active">Logout</NavLink>
            ) : (
                <NavLink to={routes.login} className="nav-link active">Login</NavLink>
            );
        };

        return (
            <div className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <NavLink to={routes.homepage} className="navbar-brand" href="#">Browar Trzy Korony</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation" onClick={this.toggleNav}>
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className={`collapse navbar-collapse ${this.state.visible ? "show" : ""} flex-grow-1`} id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <NavLink to={routes.taps} className="nav-link active" onClick={this.hideNav}>Taps</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={routes.events} className="nav-link active" onClick={this.hideNav}>Events</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={routes.ranking} className="nav-link active" onClick={this.hideNav}>Ranking</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={routes.statistics} className="nav-link active" onClick={this.hideNav}>Statistics</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className={`collapse navbar-collapse ${this.state.visible ? "show" : ""} flex-grow-0`} id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <NavLink to={routes.admin} className="nav-link active" onClick={this.hideNav}>Admin panel</NavLink>
                            </li>
                            <li className="nav-item">
                                <AppContext.Consumer>
                                    {({authenticated}) => (
                                        renderLink(authenticated)
                                    )}
                                </AppContext.Consumer>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;