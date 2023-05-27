import React, { useState } from "react";
import ExpensesList from "../Expenses/ExpensesList";
import ExpensesNewForm from "../Expenses/ExpensesNewForm";

const List = () => {
  const [formIsOpen, setFormIsOpen] = useState(false);

  const onFormOpenHandler = (isIncome = false) => {
    setFormIsOpen({ isIncome: isIncome });
  };

  const onFormCloseHandler = () => {
    setFormIsOpen(false);
  };

  return (
    <React.Fragment>
      {formIsOpen && (
        <ExpensesNewForm
          onFormClose={onFormCloseHandler}
          isIncome={formIsOpen.isIncome}
        />
      )}
      <ExpensesList onFormOpen={onFormOpenHandler} />
    </React.Fragment>
  );
};

export default List;
