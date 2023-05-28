import React, { useContext, useState } from "react";
import classes from "./ExpensesList.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ExpensesItem from "./ExpensesItem";
import DataContext from "../../store/data-context";

const ExpensesList = (props) => {
  const dataCtx = useContext(DataContext);
  const [dateSpanInput, setDateSpanInput] = useState("30");
  const [expenseTypeInput, setExpenseTypeInput] = useState("0");
  const [nameSearchInput, setNameSearchInput] = useState("");

  // Filter by name
  let filteredExpenses = dataCtx.expenses.filter((expense) => {
    if (nameSearchInput.length > 0) {
      return expense.name.includes(nameSearchInput);
    } else {
      return true;
    }
  });

  // Filter by date
  filteredExpenses = filteredExpenses.filter((expense) => {
    if (dateSpanInput !== "0") {
      let filterDate = new Date();
      filterDate.setDate(filterDate.getDate() - dateSpanInput);
      return expense.date > filterDate;
    } else {
      return true;
    }
  });
  // Filter by type
  filteredExpenses = filteredExpenses.filter((expense) => {
    if (expenseTypeInput !== "0") {
      if (expenseTypeInput === "2") {
        return expense.isPositive === true;
      }
      if (expenseTypeInput === "1") {
        return expense.isPositive === false;
      }
      return false;
    } else {
      return true;
    }
  });

  const nameSearchInputChangeHandler = (e) => {
    setNameSearchInput(e.target.value);
  };

  const dateSpanInputChangeHandler = (e) => {
    setDateSpanInput(e.target.value);
  };

  const expenseTypeInputChangeHandler = (e) => {
    setExpenseTypeInput(e.target.value);
  };

  const listContentsJsx =
    filteredExpenses.length > 0 ? (
      <div className={classes.list}>
        {filteredExpenses.map((expense) => {
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
      <h2>Nic nie znaleziono</h2>
    );

  return (
    <main className={`responsive-section ${classes.main}`}>
      <Card className={classes.filters}>
        <input
          type='text'
          placeholder='Wyszukaj po nazwie...'
          value={nameSearchInput}
          onChange={nameSearchInputChangeHandler}
        />
        <select
          defaultValue={dateSpanInput}
          onChange={dateSpanInputChangeHandler}
        >
          <option value='0'>Wszystko</option>
          <option value='30'>Ostatni 1 miesiąc</option>
          <option value='90'>Ostatnie 3 miesiące</option>
          <option value='180'>Ostatnie 6 miesięcy</option>
        </select>
        <select
          defaultValue={expenseTypeInput}
          onChange={expenseTypeInputChangeHandler}
        >
          <option value='0'>Wszystko</option>
          <option value='1'>Wydatki</option>
          <option value='2'>Przychody</option>
        </select>
      </Card>
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
