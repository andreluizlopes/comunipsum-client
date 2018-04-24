import React, {Component} from "react";
import { withRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Home from '../home/home';
import About from '../about';

import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Signin from '../../components/auth/signin';
import RequireAuth from '../../components/auth/require_auth';

import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import IconAdd from 'material-ui/svg-icons/content/add';

import '../../assets/css/containers/app/index.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleSignoutUser = this.handleSignoutUser.bind(this);
    this.handleOpenLeftMenu = this.handleOpenLeftMenu.bind(this);
    this.handleCloseLeftMenu = this.handleCloseLeftMenu.bind(this);
  }

  handleSignoutUser() {
    this.handleCloseLeftMenu();
    this.props.signoutUser();
  }

  handleOpenLeftMenu(event) {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleCloseLeftMenu() {
    this.setState({
      open: false,
    });
  };

  renderLinks() {
    if (this.props.authenticated) {
      return (
        <Menu>
          <Link to="/"><MenuItem onClick={this.handleCloseLeftMenu} primaryText="Home"></MenuItem></Link>
          <Link to="/about-us"><MenuItem onClick={this.handleCloseLeftMenu} primaryText="About"></MenuItem></Link>
          <MenuItem onClick={this.handleSignoutUser} primaryText="Sair"></MenuItem>
        </Menu>
      );
    }
    return (
      <Menu>
        <Link to="/signin"><MenuItem onClick={this.handleCloseLeftMenu} primaryText="Entrar"></MenuItem></Link>
      </Menu>
    );
  }

  render() {
    return (
      <div className="app-price">
        <Header />

        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          {this.renderLinks()}
        </Drawer>

        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/about" component={About} />
        </main>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default withRouter(connect(mapStateToProps, actions)(App));
