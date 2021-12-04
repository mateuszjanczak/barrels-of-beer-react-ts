import React from "react";
import styled from "styled-components";
import EventsService from "../service/EventService";
import ActionEvent from "../components/ActionEvent";
import TemperatureEvent from "../components/TemperatureEvent";
import DocumentService from "../service/DocumentService";
import AuthService from "../service/AuthService";

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
        EventsService.getActionEvents(page).then(actionEvents => this.setState({actionEvents})).catch(() => AuthService.refreshToken())
    }

    fetchTemperatureEvents = (page: number) => {
        EventsService.getTemperatureEvents(page).then(temperatureEvents => this.setState({temperatureEvents})).catch(() => AuthService.refreshToken())
    }

    handleChangePageActionEvents = (event, value) => {
        this.fetchActionEvents(value - 1);
    }

    handleChangePageTemperatureEvents = (event, value) => {
        this.fetchTemperatureEvents(value - 1);
    }

    handleDownloadActionEvents = () => {
        return DocumentService.downloadActionEventsURL()
    }

    handleDownloadTemperatureEvents = () => {
        return DocumentService.downloadTemperatureEventsURL()
    }

    render() {
        const {actionEvents, temperatureEvents} = this.state;

        return (
            <div className="container-fluid">
                <Heading>Events</Heading>
                <ActionEvent actionEvents={actionEvents} handleChangePage={this.handleChangePageActionEvents}
                             handleDownload={this.handleDownloadActionEvents}/>
                <TemperatureEvent temperatureEvents={temperatureEvents} handleChangePage={this.handleChangePageTemperatureEvents}
                                  handleDownload={this.handleDownloadTemperatureEvents}/>
            </div>
        );
    }
}

const Heading = styled.h1`
  text-align: center;
  margin: 2rem 0;
`;

export default EventsView;