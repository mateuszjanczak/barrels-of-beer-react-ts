import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import styled from "styled-components";
import {routes} from "./routes/Routes";
import GlobalStyle from "./theme/Theme";
import Navbar from "./components/Navbar";
import TapsView from "./views/TapsView";
import CreateTapView from "./views/CreateTapView";
import EventsView from "./views/EventsView";
import AdminView from "./views/AdminView";
import RankingView from "./views/RankingView";
import SetTapView from "./views/SetTapView";
import StatisticsView from "./views/StatisticsView";
import LoginView from "./views/LoginView";
import AuthenticatedRoute from "./routes/AuthenticatedRoute";

const App = () => (
    <BrowserRouter>
        <GlobalStyle />
        <Navbar />
        <Container>
            <Switch>
                <AuthenticatedRoute exact path={[routes.homepage, routes.taps]} component={TapsView}/>
                <AuthenticatedRoute exact path={routes.createTap} component={CreateTapView}/>
                <AuthenticatedRoute exact path={routes.events} component={EventsView}/>
                <AuthenticatedRoute exact path={routes.admin} component={AdminView}/>
                <AuthenticatedRoute exact path={routes.ranking} component={RankingView}/>
                <AuthenticatedRoute exact path={routes.statistics} component={StatisticsView}/>
                <Route exact path={routes.login} component={LoginView}/>
                <AuthenticatedRoute path={routes.setTapId} component={SetTapView}/>
            </Switch>
        </Container>
    </BrowserRouter>
);

const Container = styled.div`
    
`;

export default App;
