import React, { useContext, useState } from "react";
import classes from "./ExpensesItem.module.css";
import DataContext from "../../store/data-context";
import ExpensesItemDetails from "./ExpensesItemDetails";

const ExpensesItem = (props) => {
  const appDataCtx = useContext(DataContext);
  const [detailsIsOpen, setDetailsIsOpen] = useState(false);

  const yearNow = props.date.getFullYear();
  const monthNow = ("00" + (props.date.getMonth() + 1)).slice(-2);
  const dayNow = props.date.getDate();
  const dateNowString = `${yearNow}-${monthNow}-${dayNow}`;
  const isPositive = props.isIncome;
  const currency = appDataCtx.settings.currency;

  const detailsOpenHandler = () => {
    setDetailsIsOpen(true);
  };

  const detailsCloseHandler = () => {
    setDetailsIsOpen(false);
  };

  return (
    <React.Fragment>
      {detailsIsOpen && (
        <ExpensesItemDetails
          id={props.id}
          name={props.name}
          amount={props.amount}
          date={props.date}
          onDetailsClose={detailsCloseHandler}
        />
      )}
      <div className={classes.item} onClick={detailsOpenHandler}>
        <div className={classes.name}>{props.name}</div>
        <div className={classes.date}>{dateNowString}</div>
        <div
          className={`${classes.amount} ${
            classes["c_" + (isPositive ? "green" : "red")]
          }`}
        >
          {isPositive ? "+ " : "- "}
          {`${props.amount} ${currency}`}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ExpensesItem;
