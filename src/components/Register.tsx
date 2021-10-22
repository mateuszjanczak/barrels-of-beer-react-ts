import React from "react";
import styled from "styled-components";
import {AppContext} from "../context/AppContext";
import UserService from "../service/UserService";

class Register extends React.Component {

    static contextType = AppContext;

    state = {
        username: "",
        password: "",
        error: false,
        errorMsg: ""
    }

    handleChange = (event: { target: { name: string; value: any; }; }) => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    };

    handleClick = () => {
        const {username, password} = this.state;

        const credentials = {
            username,
            password
        }

        UserService.createUser(credentials).catch(() => this.setState({error: true, errorMsg: "Error"}))
    }

    render() {
        return (
            <Wrapper>
                {this.state.error && <Error>{this.state.errorMsg}</Error>}
                <Label>
                    <input placeholder="Username" className="form-control" name="username" value={this.state.username}
                           onChange={this.handleChange}/>
                </Label>
                <Label>
                    <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password}
                           onChange={this.handleChange}/>
                </Label>
                <button className="btn btn-outline-dark" onClick={this.handleClick}>Create account</button>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  display: grid;
  border: 1px solid #333;
  background: linear-gradient(0deg, rgba(255, 255, 200, 1) 20%, rgba(255, 255, 225, 1) 100%);
  padding: 2.5rem 5rem;
  justify-items: center;
  align-self: start;
  justify-self: start;

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

const Error = styled.div`
  width: 30rem;
  padding: 0.25rem 1rem;
  background: #F39191;
  border: 1px solid #24292e;
`;

export default Register;