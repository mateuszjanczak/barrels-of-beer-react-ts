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
        message: "",
        validation: []
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

        UserService.createUser(credentials).then(() => this.setState({error: false, message: "The account has been created.", validation: []})).catch(({message, validation}) => this.setState({error: true, message: message, validation: validation}))
    }

    render() {
        return (
            <Wrapper>
                {this.state.message && <div className={`w-100 alert ${this.state.error ? 'alert-danger' : 'alert-success'}`}>
                    {this.state.message}
                </div>}
                <Label>
                    <input placeholder="Username" className="form-control" name="username" value={this.state.username}
                           onChange={this.handleChange}/>
                </Label>
                {this.state.validation['username'] != null &&
                <div className="w-100 alert alert-danger">
                    {this.state.validation['username'].sort((a,b) => a.length - b.length).map((error) => <p>{error}</p>)}
                </div>}
                <Label>
                    <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password}
                           onChange={this.handleChange}/>
                </Label>
                {this.state.validation['password'] != null &&
                <div className="w-100 alert alert-danger">
                    {this.state.validation['password'].sort((a,b) => a.length - b.length).map((error) => <p>{error}</p>)}
                </div>}
                <button className="btn btn-outline-secondary" onClick={this.handleClick}>Create account</button>
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
  justify-self: start;
  border: 2px solid black;
  border-radius: 50px 20px;

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

export default Register;
