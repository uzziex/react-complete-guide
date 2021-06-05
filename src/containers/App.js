import React, { Component } from "react";
import classes from "./App.css";
import Persons from "../components/persons/Persons";
import Cockpit from "../components/cockpit/cockpit";
import withClass from "../hoc/withClass";
import Auxiliary from "../hoc/Auxiliary";
import AuthContext from "../context/auth-context";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js] constructor");
    // you can here initialize the state here as well if version of react doesnt support the below written state syntax
  }

  state = {
    persons: [
      { id: "00", name: "Usman", age: 20 },
      { id: "01", name: "Goher", age: 22 },
      { id: "10", name: "Cesur", age: 19 },
      { id: "12", name: "noor", age: 20 },
    ],
    otherState: "some other values",
    showPerson: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false,
  };

  // component creation lifecycle hooks in action below
  // static getDerivedStateFromProps (props, state) {
  //   console.log('[App.js] getDerivedStateFromProps',props);
  //   return state;
  // }
  componentWillMount() {
    console.log("[App.js] commponentWillMount");
  }
  componentDidMount() {
    console.log("[App.js] componentDidMount");
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("[App.js] shouldComponentUpdate.");
    return true;
  }
  componentDidUpdate() {
    console.log("[App.js] componentDidUpdate..");
  }
  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });

    const person = { ...this.state.persons[personIndex] };

    // another approach for this is
    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: prevState.changeCounter + 1,
      };
    });
  };

  deletePersonHandler = (personIndex) => {
    // const persons= this.state.persons.slice();
    // alternative to this approach is spread operator

    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonHandler = () => {
    const doesShow = this.state.showPerson;
    this.setState({ showPerson: !doesShow });
  };

  loginHandler = () => {
    this.setState({ authenticated: true });
  };

  render() {
    console.log("[App.js] render");
    let persons = null;

    if (this.state.showPerson) {
      persons = (
        <Persons
          persons={this.state.persons}
          clicked={this.deletePersonHandler}
          changed={this.nameChangeHandler}
          isAuthenticated={this.state.authenticated}
        />
      );
    }

    return (
      <Auxiliary>
        <button
          onClick={() => {
            this.setState({ showCockpit: false });
          }}
        >
          Remove Cockpit
        </button>
        <AuthContext.Provider
          value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler,
          }}
        >
          {this.state.showCockpit ? (
            <Cockpit
              title={this.props.appTitle}
              showPersons={this.state.showPerson}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonHandler}
            />
          ) : null}

          {persons}
        </AuthContext.Provider>
      </Auxiliary>
    );
  }
}

export default withClass(App, classes.App);
