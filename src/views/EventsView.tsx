import React from "react";
import styled from "styled-components";
import EventsService from "../service/EventService";
import ActionEvent from "../components/ActionEvent";
import TemperatureEvent from "../components/TemperatureEvent";

class EventsView extends React.Component {

    state = {
        actionEvents: {
            content: [],
            totalPages: 0
        },
        temperatureEvents: {
            content: [],
            totalPages: 0
        }
    }

    componentDidMount() {
        this.fetchEvents()
    }

    fetchEvents = () => {
        this.fetchActionEvents(0)
        this.fetchTemperatureEvents(0)
    }

    fetchActionEvents = (page: number) => {
        EventsService.getActionEvents(page).then(actionEvents => this.setState({actionEvents}))
    }

    fetchTemperatureEvents = (page: number) => {
        EventsService.getTemperatureEvents(page).then(temperatureEvents => this.setState({temperatureEvents}))
    }

    handleChangePageActionEvents = (event, value) => {
        this.fetchActionEvents(value - 1);
    }

    handleChangePageTemperatureEvents = (event, value) => {
        this.fetchTemperatureEvents(value - 1);
    }

    render() {
        const {actionEvents, temperatureEvents} = this.state;

        return (
            <div className="container-fluid">
                <Heading>Events</Heading>
                <ActionEvent actionEvents={actionEvents} handleChangePage={this.handleChangePageActionEvents}/>
                <TemperatureEvent temperatureEvents={temperatureEvents} handleChangePage={this.handleChangePageTemperatureEvents}/>
            </div>
        );
    }
}

const Heading = styled.h1`
  text-align: center;
  margin: 2rem 0;
`;

export default EventsView;