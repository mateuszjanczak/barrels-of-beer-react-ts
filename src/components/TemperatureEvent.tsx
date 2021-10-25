import React from "react";
import styled from "styled-components";
import {Pagination} from "@material-ui/lab";
import {ITemperatureEvent} from "../model/response/ITemperatureEvent";

type Props = {
    temperatureEvents: ITemperatureEvent
    handleChangePage: (event, page: number) => void
    handleDownload: () => string
}

class TemperatureEvent extends React.Component<Props> {

    render() {
        const {temperatureEvents, handleChangePage, handleDownload} = this.props;

        return (
            <>
                <Heading>Temperature</Heading>
                {temperatureEvents.content.length === 0 && <p className="text-center">No data</p>}
                <Container className="table-responsive bg-light">
                    <table className="table mb-0">
                        <thead>
                        {temperatureEvents.content.length > 0 &&
                        <tr>
                            <th scope="col">Temperature ID</th>
                            <th scope="col">Tap</th>
                            <th scope="col">Barrel content</th>
                            <th scope="col">Temperature</th>
                            <th scope="col">Date</th>
                        </tr>}
                        </thead>
                        <tbody>
                        {temperatureEvents.content.map(({id, tapId, barrelContent, temperature, date}) => (
                            <tr key={id}>
                                <th scope="row">{id}</th>
                                <td>{tapId}</td>
                                <td>{barrelContent}</td>
                                <td>{temperature} °C</td>
                                <td>{date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {temperatureEvents.content.length > 0 && <PaginationContainer>
                        <Pagination count={temperatureEvents.totalPages} color="primary" onChange={handleChangePage}/>
                    </PaginationContainer>}
                </Container>
                {temperatureEvents.content.length > 0 && <Nav>
                    <a className="btn btn-light" href={handleDownload()}>Export events</a>
                </Nav>}
            </>
        );
    }
}

const Heading = styled.h3``;

const Container = styled.div`
  margin-bottom: 2rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const Nav = styled.div`
  text-align: right;
  margin: 2rem 0;
  > * {
    margin: 0 0.5rem;
  }
`;

export default TemperatureEvent;