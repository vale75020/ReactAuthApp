import React, { Component } from "react";
import axios from "axios";

export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
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
    const { email, password, password_confirmation } = this.props;
    axios
      .post("http://localhost:3001/registartions", {
          
          user: {
            email: email,
            password: password,
            password_confirmation: password_confirmation
          }
        },
        { withCredential: true }
      )
      .then(response => {
        console.log("registartion res", response);
      })
      .catch(error => {
        console.log("registration error", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
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
          <input
            type="password"
            name="password_confirmation"
            placeholder="password_confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />
          <br />
          <br />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}