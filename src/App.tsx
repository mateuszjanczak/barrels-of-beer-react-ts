import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import styled from "styled-components";
import {routes} from "./routes/Routes";
import CreateTapView from "./views/CreateTapView";
import EventsView from "./views/EventsView";
import SetTapView from "./views/SetTapView";
import TapsView from "./views/TapsView";
import GlobalStyle from "./theme/Theme";

const App = () => (
    <BrowserRouter>
        <GlobalStyle />
        <Container>
            <Switch>
                <Route exact path={[routes.homepage, routes.taps]} component={TapsView}/>
                <Route exact path={routes.createTap} component={CreateTapView}/>
                <Route exact path={routes.events} component={EventsView}/>
                <Route path={routes.setTapId} component={SetTapView}/>
            </Switch>
        </Container>
    </BrowserRouter>
);

const Container = styled.div`
    
`;

export default App;
