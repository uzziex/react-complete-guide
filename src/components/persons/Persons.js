import React, { PureComponent } from "react";
import Person from "./Person/Person";

class Persons extends PureComponent {
  // testing component update lifecycle methods
  // bcz of uninitialized state it is not recommended to use this lifecycle hook
  // static getDerivedStateFromProps(props, state) {
  //   console.log('[Persons.js] getDerivedStateFromProps..');
  //   return state;
  // }

  componentWillRecieveProps(props) {
    console.log("[Persons.js] componentWillRecieveprops..", props);
  }
  // if you are you chechking all properties then we cant use shouldComponentUpdate
  // instead we will use pure component
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("[Persons.js] shouldComponentUpdate");
  //   if (
  //     nextProps.persons !== this.props.persons ||
  //     nextProps.changed !== this.props.changed ||
  //     nextProps.clicked !== this.props.clicked
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("[Persons.js] getSnapshotBeforeUpdate");
    return { message: "Snapshot!" };
  }
  // componentWillUpdate() {}
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("[Persons.js] componentDidUpdate");
    console.log(snapshot);
  }
  componentWillUnmount() {
    console.log("[Persons.js] componentWillUnmount");
  }
  render() {
    console.log("[Persons.js] rendering..");
    return this.props.persons.map((person, index) => {
      return (
        <Person
          name={person.name}
          age={person.age}
          key={person.id}
          changed={(event) => this.props.changed(event, person.id)}
          click={() => this.props.clicked(index)}
          isAuth={this.props.isAuthenticated}
        />
      );
    });
  }
}

export default Persons;
