import React, { Component } from 'react';
import PageHeader from "react-bootstrap/lib/PageHeader";
import logo from '../../logos/logo.svg';
import Menu from "../nav/Menu";

class Header extends Component {
    render() {
      let appName= 'Geo-caching';
        return (
          <span>
            <PageHeader>  {appName} <small> Jouer pour le plaisir de jouer</small> </PageHeader>
            <Menu/>
          </span>

        );
    }
}
export default Header;
