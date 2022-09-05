import React, { Component } from "react";
import { Menu } from "antd";

import { BrowserRouter as Router, Route, Link, NavLink, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Dashboard from "../Graphics/Dashboard";
class LeftMenu extends Component {
  render() {
    return (
      <>
        <Router>

              <NavLink
                className="navbar-item"
                activeClassName="is-active"
                to="/"
                exact
              >
                Home
              </NavLink>
              <NavLink
                className="navbar-item"
                activeClassName="is-active"
                to="/dashboard"
                exact
              >
                Dashboard
              </NavLink>
        </Router>
      </>
    );
  }
}
export default LeftMenu;
