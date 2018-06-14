import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';
class HomeHeader extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
    this.logout = this.logout.bind(this);
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  logout(event) {
    event.preventDefault();
    axios
      .post('/user/logout')
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            emailid: null,
            fullname: null
          });
        }
      })
      .catch(error => {
        console.log('Logout error', error);
      });
  }

  render() {
    const loggedIn = this.props.loggedIn;
    console.log('navbar render, props: ');
    console.log(this.props);

    return (
      <div>
        <Navbar color="primary" dark expand="md">
          <NavbarBrand tag={Link} to="/">
            CtrlExam
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="" navbar>
              <NavItem>
                <NavLink tag={Link} to="/">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/About">
                  About
                </NavLink>
              </NavItem>
            </Nav>

            {loggedIn ? (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  Welcome {this.props.fullname}
                  <Link
                    to="#"
                    className="btn btn-link text-secondary"
                    onClick={this.logout}
                  >
                    <span className="text-secondary">logout</span>
                  </Link>
                </NavItem>
              </Nav>
            ) : (
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink tag={Link} to="/Login">
                    Log In
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/Signup">
                    Sign Up
                  </NavLink>
                </NavItem>
              </Nav>
            )}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
export default HomeHeader;
