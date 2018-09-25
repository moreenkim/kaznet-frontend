// Renders the header
import React, { Component } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Container,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import * as userSelectors from "../../store/users/reducer";
import * as userActions from "../../store/users/actions";

import profile_image from "../../images/profile.png";
import "./Header.css";

export class Header extends Component {
  componentDidMount() {
    this.props.fetchLoggedInUser();
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleUser = this.toggleUser.bind(this);
    this.state = {
      dropDownOpen: false,
      userDropDownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropDownOpen: !prevState.dropDownOpen
    }));
  }

  toggleUser() {
    this.setState(prevState => ({
      userDropDownOpen: !prevState.userDropDownOpen
    }));
  }

  render() {
    const path = this.props.location.pathname;

    return (
      <header>
        <Container fluid>
          <Navbar light color="white" expand="md">
            <Link to="/" className="navbar-brand logo">
              KAZNET
            </Link>
            <NavbarToggler />
            <Collapse navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink
                    to="/tasks"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Tasks
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="/clients"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Clients
                  </NavLink>
                </NavItem>
                <NavItem>
                  <Dropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={this.toggle}
                  >
                    <DropdownToggle
                      caret
                      tag="span"
                      className={
                        path === "/locations" || path === "/locationtypes"
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      Locations
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>
                        <NavLink
                          to="/locations"
                          className="nav-link"
                          activeClassName="active"
                        >
                          Locations
                        </NavLink>
                      </DropdownItem>
                      <DropdownItem>
                        <NavLink
                          to="/locationtypes"
                          className="nav-link"
                          activeClassName="active"
                        >
                          Location Types
                        </NavLink>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavItem>
                <NavItem>
                  <NavLink
                    to="/users"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Users
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <Dropdown
                    isOpen={this.state.userDropDownOpen}
                    toggle={this.toggleUser}
                    size="sm"
                  >
                    <DropdownToggle tag="span" className="toggle-user">
                      <img
                        src={
                          this.props.getCurrentUser &&
                          this.props.getCurrentUser.attributes &&
                          this.props.getCurrentUser.attributes.metadata.gravatar
                            ? this.props.getCurrentUser.attributes.metadata
                                .gravatar
                            : profile_image
                        }
                        className="img-fluid rounded-circle userprofile-img"
                        alt="profile"
                      />
                    </DropdownToggle>
                    {console.log(this.props.getCurrentUser)}
                    {this.props.getCurrentUser &&
                      this.props.getCurrentUser.id && (
                        <DropdownMenu right>
                          <DropdownItem>
                            <NavLink
                              to={`/users/${this.props.getCurrentUser.id}`}
                              className="nav-link"
                              activeClassName="active"
                            >
                              View Profile
                            </NavLink>
                          </DropdownItem>
                          <DropdownItem>
                            <a href="/accounts/logout" className="nav-link">
                              Log Out
                            </a>
                          </DropdownItem>
                        </DropdownMenu>
                      )}
                  </Dropdown>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </Container>
      </header>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    getCurrentUser: userSelectors.getCurrentUser(state)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fetchLoggedInUser: userActions.fetchLoggedInUser
    },
    dispatch
  );
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
