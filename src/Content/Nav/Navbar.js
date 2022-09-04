import React, { Component } from "react";
import LeftMenu from "./Menu";
import { Drawer, Button } from "antd";
import "antd/dist/antd.css";
import "../../App.css";
import image from "../../assets/logo.png";

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
            <img href="./" src={image} />
          
        </div>
        <div className="menuCon">
          <div className="leftMenu">
            <LeftMenu />
          </div>
        
          <Button className="barsMenu" type="primary" onClick={this.showDrawer}>
            <span className="barsBtn" />
          </Button>
          <Drawer
            title="Basic Drawer"
            placement="left"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <LeftMenu />
            
          </Drawer>
        </div>
      </nav>
    );
  }
}
export default Navbar;
