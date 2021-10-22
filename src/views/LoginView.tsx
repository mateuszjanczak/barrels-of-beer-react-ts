import React from "react";
import styled from "styled-components";
import AuthService from "../service/AuthService";

class LoginView extends React.Component {

    handleClick = () => {
        AuthService.login({
            username: "mateusz",
            password: "123456789"
        })
    }

    render() {
        return (
            <Wrapper className="container">
                <button onClick={this.handleClick}>Let me in</button>
            </Wrapper>
        );
    }
}

const Wrapper = styled.div`
  margin-bottom: 5rem;
`;

export default LoginView;