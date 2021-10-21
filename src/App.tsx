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

const App = () => (
    <BrowserRouter>
        <GlobalStyle />
        <Navbar />
        <Container>
            <Switch>
                <Route exact path={[routes.homepage, routes.taps]} component={TapsView}/>
                <Route exact path={routes.createTap} component={CreateTapView}/>
                <Route exact path={routes.events} component={EventsView}/>
                <Route exact path={routes.admin} component={AdminView}/>
                <Route exact path={routes.ranking} component={RankingView}/>
                <Route exact path={routes.statistics} component={StatisticsView}/>
                <Route path={routes.setTapId} component={SetTapView}/>
            </Switch>
        </Container>
    </BrowserRouter>
);

const Container = styled.div`
    
`;

export default App;
