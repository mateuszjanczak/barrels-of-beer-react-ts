import React from "react";
import {RouteComponentProps, withRouter, Link} from "react-router-dom";
import styled from "styled-components";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBeer, faDatabase, faThermometerHalf} from '@fortawesome/free-solid-svg-icons'
import BarrelImg from '../assets/barrel.png';
import {ITap} from "../model/response/ITap";
import {routes} from "../routes/Routes";

type Props = {
    tap: ITap
}

class Tap extends React.Component<Props & RouteComponentProps> {

    handleSetTap = (tapId) => {
        const {history} = this.props;
        history.push(`${routes.setTap}/${tapId}`)
    }

    render() {
        const {tap} = this.props;
        const {tapId, barrelContent, currentLevel, capacity, temperature} = tap;
        const percent = isNaN(currentLevel / capacity) ? 0 : currentLevel / capacity;

        return (
            <Wrapper>
                <Details>
                    <H3>Tap {tapId}</H3>
                    <H4>{barrelContent}</H4>
                </Details>

                <Container>
                    <GrayImg src={BarrelImg} alt={"Gray barrel"}/>
                    <ColorImg percent={percent} src={BarrelImg} alt={"Color barrel"}/>
                    <Status>
                        <Paragraph>
                            <FontAwesomeIcon icon={faThermometerHalf}/> {temperature} °C
                        </Paragraph>
                        <Paragraph>
                            <FontAwesomeIcon icon={faBeer}/> {(capacity - currentLevel) / 1000} L
                        </Paragraph>
                        <Paragraph>
                            <FontAwesomeIcon icon={faDatabase}/> {currentLevel / 1000} / {capacity / 1000} L
                        </Paragraph>
                    </Status>
                </Container>

                <Nav>
                    <Link to={`${routes.setTap}/${tapId}`}>
                        <button type="button" className="btn btn-light">Set tap</button>
                    </Link>
                </Nav>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div``;

const Details = styled.div`
  text-align: center;
`;

const H3 = styled.h3``;

const H4 = styled.h4``;

const Container = styled.div`
  position: relative;
  height: 300px;
`;

const Nav = styled.div`
  text-align: center;
  margin-top: 1rem;

  > button {
    margin: 0 0.5rem;
  }
`;

const GrayImg = styled.img`
  position: absolute;
  width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: grayscale(100%);
`;

const ColorImg = styled.img`
  position: absolute;
  width: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  clip: rect(calc(300px - (300px * ${props => props.percent})), 300px, 300px, 0px);
  z-index: 100;
`;

const Status = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 200;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  text-shadow: 2px 2px 8px #000000;
`;

const Paragraph = styled.p``;

export default withRouter(Tap);