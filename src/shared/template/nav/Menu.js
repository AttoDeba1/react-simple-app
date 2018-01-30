import React,{ Component} from 'react';
import NavbarHeader from "react-bootstrap/lib/NavbarHeader";
import Navbar from "react-bootstrap/lib/Navbar";
import NavDropdown from "react-bootstrap/lib/NavDropdown";
import MenuItem from "react-bootstrap/lib/MenuItem";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
//import MenuItem from "react-bootstrap/lib/MenuItem";

class Menu extends Component{
    render() {
        return (
          <Navbar  >
  <Navbar.Header>
    <Navbar.Brand>
      <a href="#brand"></a>
    </Navbar.Brand>
    <Navbar.Toggle />
  </Navbar.Header>
  <Navbar.Collapse>
    <Nav>
      <NavItem eventKey={1} href="#">
        Link
      </NavItem>
      <NavItem eventKey={2} href="#">
        Link
      </NavItem>
      <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
        <MenuItem eventKey={3.1}>Action</MenuItem>
        <MenuItem eventKey={3.2}>Another action</MenuItem>
        <MenuItem eventKey={3.3}>Something else here</MenuItem>
        <MenuItem divider />
        <MenuItem eventKey={3.3}>Separated link</MenuItem>
      </NavDropdown>
    </Nav>
    <Nav pullRight>
      <NavItem eventKey={1} href="#">
        Sign in
      </NavItem>
      <NavItem eventKey={2} href="#">
        Sign up
      </NavItem>
    </Nav>
  </Navbar.Collapse>
</Navbar>
        );
    }
}
export default Menu;
