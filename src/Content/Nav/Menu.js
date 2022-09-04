import React, { Component } from "react";
import { Menu } from "antd";
import { Outlet, Link } from "react-router-dom";
class LeftMenu extends Component {
  render() {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <a href="./">Home</a>
          
        </Menu.Item>
        <Menu.Item key="dashboard">
          <a href="/dashboard">Dashboard</a>
        </Menu.Item>
      </Menu>
    );
  }
}
export default LeftMenu;
