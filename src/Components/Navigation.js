import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Collapse, NavbarToggler } from "reactstrap";
//import { Blog } from "./Blog";

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    console.log(this.props.state.articles);
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <Link className="navbar-brand" to="/">
          react-bootstrap-and-go
        </Link>
        <NavbarToggler right onClick={this.toggle} />

        {/*<div className="collapse navbar-collapse" id="navbarsExampleDefault">*/}
        <Collapse isOpen={this.state.isOpen} navbar>
          <ul className="navbar-nav mr-auto">
            <NavLink exact to="/" className="nav-link">
              <span>Home</span>
            </NavLink>
            <NavLink exact to="/about" className="nav-link">
              <span>About</span>
            </NavLink>
            <NavLink to="/blog" className="nav-link">
              <span>Blog</span>
            </NavLink>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
            <Button color="outline-success">Search</Button>
          </form>
        </Collapse>
      </nav>
    );
  }
}

export default Navigation;
