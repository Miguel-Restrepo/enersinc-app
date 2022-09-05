import React, { Component } from "react";

import { Drawer, Button } from "antd";
import "antd/dist/antd.css";
import "../../App.css";
import image from "../../assets/logo.png";
import image2 from "../../assets/graphs.png";
import { BrowserRouter as Router, Route, Link, NavLink, Routes } from "react-router-dom";
class Navbar extends Component {
  state = {
    current: "mail",
    visible: false
  };
  showDrawer = () => {
    this.setState({
      visible: true
    });
  };
  onClose = () => {
    this.setState({
      visible: false
    });
  };
  render() {
    return (
      <nav className="menuBar">

        <div className="logo">


          <NavLink
            className="navbar-item"
            activeClassName="is-active"
            to="/"
            exact
          >
            <img src={image} />
          </NavLink>



        </div>




        <NavLink
          Style="float: right; "
          className="navbar-item"
          activeClassName="is-active"
          to="/dashboard"
          exact
        >
          <img src={image2} />
        </NavLink>

      </nav>
    );
  }
}
export default Navbar;
