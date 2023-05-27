import React, { useContext, useState } from "react";
import { createPortal } from "react-dom";
import classes from "./ExpensesNewForm.module.css";
import Backdrop from "../UI/Backdrop";
import Card from "../UI/Card";
import Button from "../UI/Button";
import DataContext from "../../store/data-context";

const Form = (props) => {
  const appDataCtx = useContext(DataContext);

  const dateNow = new Date();
  const yearNow = dateNow.getFullYear();
  const monthNow = ("00" + (dateNow.getMonth() + 1)).slice(-2);
  const dayNow = dateNow.getDate();
  const dateNowString = `${yearNow}-${monthNow}-${dayNow}`;

  const [nameInput, setNameInput] = useState("");
  const [amountInput, setAmountInput] = useState("");
  const [dateInput, setDateInput] = useState(dateNowString);

  const nameInputChangeHandler = (e) => {
    setNameInput(e.target.value);
  };

  const amountInputChangeHandler = (e) => {
    setAmountInput(e.target.value);
  };

  const dateInputChangeHandler = (e) => {
    setDateInput(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    appDataCtx.addExpense({
      id: Math.floor(Math.random() * 10000000000000000),
      name: nameInput,
      date: new Date(dateInput),
      amount: amountInput,
      isPositive: props.isIncome,
    });

    props.onFormClose();
  };
  return (
    <React.Fragment>
      <Backdrop onClick={props.onFormClose} />
      <Card className={classes.form}>
        <div className={classes.header}>
          <h3>Nowy {props.isIncome ? "Przychód" : "Wydatek"}</h3>
        </div>
        <form
          autoComplete='off'
          id='expenseForm'
          className={classes.form__element}
          onSubmit={formSubmitHandler}
        >
          <label htmlFor='expenseName'>Nazwa:</label>
          <input
            id='expenseName'
            type='text'
            minLength='3'
            maxLength='50'
            value={nameInput}
            onChange={nameInputChangeHandler}
            required
          />
          <label htmlFor='expenseAmount'>Kwota:</label>
          <input
            id='expenseAmount'
            type='number'
            min='0.01'
            max='100000'
            step='0.01'
            required
            value={amountInput}
            onChange={amountInputChangeHandler}
          />
          <label htmlFor='expenseDate'>Data:</label>
          <input
            id='expenseDate'
            type='date'
            min='2020-01-01'
            max={dateNowString}
            value={dateInput}
            onChange={dateInputChangeHandler}
            required
          />
        </form>
        <div className={classes.actions}>
          <Button
            color='blue'
            startIcon='ban'
            textColor='white'
            onClick={props.onFormClose}
          >
            Anuluj
          </Button>
          <Button
            color='green'
            form='expenseForm'
            startIcon='plus'
            textColor='white'
            type='submit'
          >
            Dodaj
          </Button>
        </div>
      </Card>
    </React.Fragment>
  );
};

const ExpensesNewForm = (props) => {
  return createPortal(
    <Form
      onFormClose={props.onFormClose}
      isIncome={props.isIncome}
    />,
    document.getElementById("overlay")
  );
};

export default ExpensesNewForm;
