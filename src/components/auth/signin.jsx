import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

import '../../assets/css/components/auth/signin.css';

class Signin extends Component {

  constructor() {
    super();
    this.state = {
      open: false,
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const username = data.get('username');
    const password = data.get('password');

    this.props.signinUser({ username, password }, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorMessage) {
      this.setState({
        open: true
      })
    }
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  render() {
    return (
      <div className="signin">
        <div className="container">
          <form className="signin-form" onSubmit={this.handleFormSubmit}>
            <div className="row">
              <div className="col-12">
                <TextField
                  fullWidth={true}
                  name="username"
                  hintText="Enter your Username"
                  floatingLabelText="Username"
                />
              </div>
              <div className="col-12">
                <TextField
                  fullWidth={true}
                  name="password"
                  type="password"
                  hintText="Enter your Password"
                  floatingLabelText="Password"
                />
              </div>
              <div className="col-12">
                <RaisedButton
                  className="signin-form-button"
                  type="submit"
                  label="Signin"
                  primary={true}
                />
              </div>
            </div>
          </form>
          <Snackbar
            open={this.state.open}
            message={`opss!! ${this.props.errorMessage}`}
            autoHideDuration={4000}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(Signin);
