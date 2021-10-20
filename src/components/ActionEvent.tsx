import React from "react";
import styled from "styled-components";
import {IActionEvent} from "../model/response/IActionEvent";
import {Pagination} from "@material-ui/lab";

type Props = {
    actionEvents: IActionEvent
    handleChangePage: (event, page: number) => void
    handleDownload: () => string
}

class ActionEvent extends React.Component<Props> {

    render() {
        const {actionEvents, handleChangePage, handleDownload} = this.props;

        return (
            <>
                <Heading>Action</Heading>
                {actionEvents.content.length === 0 && <p className="text-center">No data</p>}

                <Container className="table-responsive bg-light">
                    <table className="table mb-0">
                        <thead>
                        {actionEvents.content.length > 0 &&
                        <tr>
                            <th scope="col">Action ID</th>
                            <th scope="col">Tap</th>
                            <th scope="col">Barrel content</th>
                            <th scope="col">Current level</th>
                            <th scope="col">Total usage</th>
                            <th scope="col">Single usage</th>
                            <th scope="col">Date</th>
                            <th scope="col">Action Type</th>
                        </tr>}
                        </thead>
                        <tbody>
                        {actionEvents.content.map(({id, tapId, barrelContent, currentLevel, totalUsage, singleUsage, date, logType}) => (
                            <tr key={id}>
                                <th scope="row">{id}</th>
                                <td>{tapId}</td>
                                <td>{barrelContent}</td>
                                <td>{currentLevel/1000} L</td>
                                <td>{totalUsage/1000} L</td>
                                <td>{singleUsage/1000} L</td>
                                <td>{date}</td>
                                <td>{logType}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {actionEvents.content.length > 0 && <PaginationContainer>
                        <Pagination count={actionEvents.totalPages} color="primary" onChange={handleChangePage}/>
                    </PaginationContainer>}
                </Container>
                {actionEvents.content.length > 0 && <Nav>
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

export default ActionEvent;