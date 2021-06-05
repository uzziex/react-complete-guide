import React, { useEffect, useRef, useContext } from "react";
import classes from "./cockpit.css";
import AuthContext from "../../context/auth-context";

const cockpit = (props) => {
  const toggleBtnRef = useRef(null);
  const authContext = useContext(AuthContext);

  console.log(authContext.authenticated);
  // toggleBtnRef.current.click();
  // functional lifecycle hooks
  useEffect(() => {
    console.log("[cockpit.js] useEffect..");
    // you can send HTTP request here..
    // const timer = setTimeout(() => {
    //   alert("Saved data to cloud");
    // }, 1000);
    toggleBtnRef.current.click();
    return () => {
      // clearTimeout(timer);
      console.log("[Cockpit.js] cleanup work in useEffect");
    };
  }, []);
  useEffect(() => {
    console.log("[Cockpit.js] 2nd useEffect");
    return () => {
      console.log("[Cockpit.js] cleanup work in 2nd useEffect");
    };
  });

  const assignedClasses = [];
  let btnClass = "";
  if (props.showPersons) {
    btnClass = classes.Red;
  }
  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red); // classses is red now
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold); // classes will be red and bold now
  }

  return (
    <div className={classes.cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(" ")}>This is really working!</p>
      <button ref={toggleBtnRef} className={btnClass} onClick={props.clicked}>
        Toggle Person
      </button>
      
        <button onClick={authContext.login}>Log In</button>
      
    </div>
  );
};
export default React.memo(cockpit);
