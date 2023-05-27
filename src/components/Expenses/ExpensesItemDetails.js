import React, { useContext, useState } from "react";
import { createPortal } from "react-dom";
import classes from "./ExpensesItemDetails.module.css";
import Backdrop from "../UI/Backdrop";
import Card from "../UI/Card";
import Button from "../UI/Button";
import DataContext from "../../store/data-context";

const Details = (props) => {
  const [isEdited, setIsEdited] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const appDataCtx = useContext(DataContext);

  const dateNow = new Date();
  const yearNow = dateNow.getFullYear();
  const monthNow = ("00" + (dateNow.getMonth() + 1)).slice(-2);
  const dayNow = dateNow.getDate();
  const dateNowString = `${yearNow}-${monthNow}-${dayNow}`;

  const year = props.date.getFullYear();
  const month = ("00" + (props.date.getMonth() + 1)).slice(-2);
  const day = props.date.getDate();
  const dateString = `${year}-${month}-${day}`;

  const [nameInput, setNameInput] = useState(props.name);
  const [amountInput, setAmountInput] = useState(props.amount);
  const [dateInput, setDateInput] = useState(dateString);

  const currency = appDataCtx.settings.currency;

  const nameInputChangeHandler = (e) => {
    setNameInput(e.target.value);
  };

  const amountInputChangeHandler = (e) => {
    setAmountInput(e.target.value);
  };

  const dateInputChangeHandler = (e) => {
    setDateInput(e.target.value);
  };

  const closeHandler = () => {
    props.onDetailsClose();
  };

  const openEditHandler = () => {
    setIsEdited(true);
  };

  const closeEditHandler = () => {
    setIsEdited(false);
  };

  const saveEditHandler = () => {
    appDataCtx.editExpense({
      id: props.id,
      name: nameInput,
      date: new Date(dateInput),
      amount: amountInput,
    });
    closeEditHandler();
  };

  const openDeleteHandler = () => {
    setIsDeleteOpen(true);
  };

  const closeDeleteHandler = () => {
    setIsDeleteOpen(false);
  };

  const deleteHandler = () => {
    appDataCtx.removeExpense(props.id);
    props.onDetailsClose();
  };

  return (
    <React.Fragment>
      <Backdrop onClick={props.onDetailsClose} />
      <Card className={classes.details}>
        <div className={classes.header}>
          <h3>Szczegóły</h3>
        </div>
        <div className={classes.details__inner}>
          {isDeleteOpen && (
            <div className={classes.delete__confirm}>
              <h3>Na pewno chcesz usunąć ten element?</h3>
              <div className={classes.actions}>
                <Button
                  color='red'
                  textColor='white'
                  onClick={closeDeleteHandler}
                >
                  Nie
                </Button>
                <Button
                  color='green'
                  textColor='white'
                  onClick={deleteHandler}
                >
                  Tak
                </Button>
              </div>
            </div>
          )}
          {!isDeleteOpen && (
            <React.Fragment>
              <label>Nazwa: </label>
              {isEdited && (
                <input
                  id='name'
                  type='text'
                  value={nameInput}
                  onChange={nameInputChangeHandler}
                />
              )}
              {!isEdited && <span>{props.name}</span>}
              <label>Kwota: </label>
              {isEdited && (
                <div>
                  <input
                    id='amount'
                    type='number'
                    value={amountInput}
                    onChange={amountInputChangeHandler}
                  />
                  <span>{currency}</span>
                </div>
              )}
              {!isEdited && (
                <span>
                  {props.amount} {currency}
                </span>
              )}
              <label>Data: </label>
              {isEdited && (
                <input
                  id='date'
                  type='date'
                  min='2020-01-01'
                  max={dateNowString}
                  value={dateInput}
                  onChange={dateInputChangeHandler}
                />
              )}
              {!isEdited && <span>{dateString}</span>}
            </React.Fragment>
          )}
        </div>
        {!isDeleteOpen && (
          <div className={classes.actions}>
            {isEdited && (
              <React.Fragment>
                <Button
                  onClick={closeEditHandler}
                  color='blue'
                  textColor='white'
                  startIcon='ban'
                >
                  Anuluj
                </Button>
                <Button
                  color='green'
                  textColor='white'
                  startIcon='floppy-o'
                  onClick={saveEditHandler}
                >
                  Zapisz
                </Button>
              </React.Fragment>
            )}
            {!isEdited && (
              <React.Fragment>
                <Button
                  color='blue'
                  textColor='white'
                  startIcon='ban'
                  onClick={closeHandler}
                >
                  Zamknij
                </Button>
                <Button
                  color='red'
                  textColor='white'
                  startIcon='trash'
                  onClick={openDeleteHandler}
                >
                  Usuń
                </Button>
                <Button
                  onClick={openEditHandler}
                  color='green'
                  textColor='white'
                  startIcon='pencil'
                >
                  Edytuj
                </Button>
              </React.Fragment>
            )}
          </div>
        )}
      </Card>
    </React.Fragment>
  );
};

const ExpensesItemDetails = (props) => {
  return createPortal(
    <Details
      onDetailsClose={props.onDetailsClose}
      id={props.id}
      name={props.name}
      amount={props.amount}
      date={props.date}
    />,
    document.getElementById("overlay")
  );
};

export default ExpensesItemDetails;
