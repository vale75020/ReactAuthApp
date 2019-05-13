import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    //console.log("handle change", event);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    //console.log("form submitted");
    const { email, password } = this.props;
    axios
      .post("http://localhost:3001/sessions", {
          
          user: {
            email: email,
            password: password
          }
        },
        { withCredential: true }
      )
      .then(response => {
        //console.log("login res", response);
        if (response.data.logged_in) {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log("login error", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div style={{padding:"20px"}}>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />
          <br />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
