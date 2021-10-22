import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import styled from "styled-components";
import {routes} from "./routes/Routes";
import GlobalStyle from "./theme/Theme";
import {AppContext} from './context/AppContext';
import Navbar from "./components/Navbar";
import TapsView from "./views/TapsView";
import CreateTapView from "./views/CreateTapView";
import EventsView from "./views/EventsView";
import AdminView from "./views/AdminView";
import RankingView from "./views/RankingView";
import SetTapView from "./views/SetTapView";
import StatisticsView from "./views/StatisticsView";
import AuthenticatedRoute from "./routes/AuthenticatedRoute";
import AuthService from "./service/AuthService";
import AuthView from "./views/AuthView";
import LogoutView from "./views/LogoutView";

class App extends React.Component {

    state = {
        authenticated: false,
        toggleAuthenticated: (isAuthenticated) => this._toggleAuthenticated(isAuthenticated)
    }

    _toggleAuthenticated = (isAuthenticated) => {
        this.setState({
            ...this.state,
            authenticated: isAuthenticated
        })
    }

    componentDidMount() {
        this._toggleAuthenticated(AuthService.isLogged());
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                <BrowserRouter>
                    <GlobalStyle/>
                    <Navbar/>
                    <Container>
                        <Switch>
                            <AuthenticatedRoute exact path={[routes.homepage, routes.taps]} component={TapsView}/>
                            <AuthenticatedRoute exact path={routes.createTap} component={CreateTapView}/>
                            <AuthenticatedRoute exact path={routes.events} component={EventsView}/>
                            <AuthenticatedRoute exact path={routes.admin} component={AdminView}/>
                            <AuthenticatedRoute exact path={routes.ranking} component={RankingView}/>
                            <AuthenticatedRoute exact path={routes.statistics} component={StatisticsView}/>
                            <Route exact path={routes.login} component={AuthView}/>
                            <AuthenticatedRoute path={routes.setTapId} component={SetTapView}/>
                            <AuthenticatedRoute path={routes.logout} component={LogoutView}/>
                        </Switch>
                    </Container>
                </BrowserRouter>
            </AppContext.Provider>
        );
    }
}

const Container = styled.div`

`;

export default App;
