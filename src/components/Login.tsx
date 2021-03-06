import React from "react";
import styled from "styled-components";
import AuthService from "../service/AuthService";
import {AppContext} from "../context/AppContext";

type Props = {
    toggleRedirect: () => void
}

class Login extends React.Component<Props> {

    static contextType = AppContext;

    state = {
        username: "",
        password: "",
        error: false,
        message: ""
    }

    handleChange = (event: { target: { name: string; value: any; }; }) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    };

    handleClick = () => {
        const {username, password} = this.state;
        this.userAuthorization(username, password);
    }

    userAuthorization = (username: string, password: string) => {
        const {toggleRedirect} = this.props;

        AuthService.login({
            username,
            password
        })
            .then(() => {
                this.context.toggleAuthenticated(true);
                toggleRedirect();
            })
            .catch(({message}) => this.setState({error: true, message: message}))
    }

    render() {
        return (
            <Wrapper>
                {this.state.error && <div className="w-100 alert alert-danger">
                    {this.state.message}
                </div>}
                <Label>
                    <input placeholder="Username" className="form-control" name="username" value={this.state.username}
                           onChange={this.handleChange}/>
                </Label>
                <Label>
                    <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password}
                           onChange={this.handleChange}/>
                </Label>
                <button className="btn btn-outline-secondary" onClick={this.handleClick}>Log in</button>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  display: grid;
  background: white;
  padding: 2.5rem 5rem;
  justify-items: center;
  align-self: start;
  justify-self: end;
  border: 2px solid black;
  border-radius: 20px 50px;

  @media (max-width: 992px) {
    justify-self: center;
  }

  @media (max-width: 575px) {
    justify-self: unset;
  }
`;

const Label = styled.div`
  margin: 1rem;
`;

export default Login;
