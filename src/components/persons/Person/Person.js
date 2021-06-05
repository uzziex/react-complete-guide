import React, { Component } from "react";
import PropTypes from "prop-types";
import Auxiliary from "../../../hoc/Auxiliary";
import withClass from "../../../hoc/withClass";
import classes from "./person.css";
import AuthContext from '../../../context/auth-context';


class Person extends Component {
  
  static contextType = AuthContext;
  componentDidMount() {
    // this only works in class based components
    this.inputElement.focus();
    console.log(this.context.authenticated);
  }
  

  render() {
    console.log("[Person.js] rendering");
    return (
      <Auxiliary>
        
          {this.context.authenticated ? <p>Authenticated!</p> : <p>Please LOG IN</p>}
        

        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p key="a1">{this.props.children}</p>
        <input
          key="a2"
          ref={(inputEl) => {
            this.inputElement = inputEl;
          }}
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </Auxiliary>
    );
  }
  // const style = {
  //   '@media (min-width: 500px)': {
  //     width: '450px'
  //   }
  // }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
};

export default withClass(Person, classes.Person);
