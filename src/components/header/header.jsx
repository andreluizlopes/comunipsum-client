import React, { Component } from 'react';

import '../../assets/css/components/header/header.css';

class Header extends Component {

  render() {
    return (
      <div className="header">
        <div className="header-links">
          <div className="container">
            <a href="/about" className="header-links-item">About</a>
            <a href="https://github.com/" className="header-links-item">Github</a>
          </div>
        </div>
        <div className="header-main">
          <div className="container">
            <h1>comunipsum</h1>
            <div className="logo">&#9773;</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;