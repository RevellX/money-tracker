import React, { useContext } from "react";
import classes from "./ExpensesList.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ExpensesItem from "./ExpensesItem";
import DataContext from "../../store/data-context";

const ExpensesList = (props) => {
  const dataCtx = useContext(DataContext);

  const expensesData = dataCtx.expenses;

  const listContentsJsx =
    expensesData.length > 0 ? (
      <div className={classes.list}>
        {expensesData.map((expense) => {
          return (
            <ExpensesItem
              key={expense.id}
              id={expense.id}
              name={expense.name}
              date={expense.date}
              amount={expense.amount}
              isIncome={expense.isPositive}
            />
          );
        })}
      </div>
    ) : (
      <h2>Brak wpisów w pamięci</h2>
    );

  return (
    <main className={`responsive-section ${classes.main}`}>
      <Card>{listContentsJsx}</Card>
      <div className={classes.actions}>
        <Button
          size='large'
          color='green'
          textColor='white'
          startIcon='plus'
          onClick={() => {
            props.onFormOpen(true);
          }}
        >
          Przychód
        </Button>
        <Button
          size='large'
          color='red'
          textColor='white'
          startIcon='minus'
          onClick={() => props.onFormOpen(false)}
        >
          Wydatek
        </Button>
      </div>
    </main>
  );
};

export default ExpensesList;
