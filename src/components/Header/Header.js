import React from "react";
import Button from "../UI/Button";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <div className={`responsive-section ${classes.navigation}`}>
        <h2>Money Planner</h2>
        <div className={classes.navigation__actions}>
          <Button
            size='medium'
            color='blue'
            textColor='white'
            startIcon={
              props.openedPage === "LIST" ? "list" : "bar-chart"
            }
            onClick={props.onPageSwitch}
          >
            {props.openedPage === "LIST" ? "Statystyki" : "Lista"}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
