import React, { useEffect, useState } from "react";

const DataContext = React.createContext({
  expenses: [],
  settings: {},
  addExpense: (expenseObject) => {},
  removeExpense: (expenseId) => {},
});

let DUMMY_DATA = [];

const itemAmount = 5;
const itemsWords = [
  "Paliwo",
  "Zakupy spożywcze",
  "Zakupy ubrania",
  "Mechanik",
  "Wypłata",
  "Łapówka",
  "Zakupy w internecie",
  "Zgubiona kasa",
  "Odsetki",
];

for (let i = 0; i < itemAmount; i++) {
  const isPositive = Math.random().toFixed(2) > 0.8;
  DUMMY_DATA.push({
    id: Math.floor(Math.random() * 10000000000),
    name: itemsWords[Math.floor(Math.random() * itemsWords.length)],
    date: new Date(),
    amount: (Math.random() * 100 + 0.01).toFixed(2),
    isPositive: isPositive,
  });
}

let INITIAL_SETTINGS = {
  currency: "PLN",
};

let INITIAL_DATA = DUMMY_DATA;

const localStorageExpensesString =
  localStorage.getItem("appDataExpenses");
const localStorageSettingsString =
  localStorage.getItem("appDataSettings");
if (localStorageExpensesString) {
  INITIAL_DATA = JSON.parse(localStorageExpensesString);
  INITIAL_DATA = INITIAL_DATA.map((expense) => {
    return {
      ...expense,
      date: new Date(expense.date),
    };
  });
}
if (localStorageSettingsString) {
  INITIAL_SETTINGS = JSON.parse(localStorageSettingsString);
}
export const DataContextProvider = (props) => {
  const [expenses, setExpenses] = useState(INITIAL_DATA);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);

  useEffect(() => {
    let copyExpenses = expenses;
    copyExpenses = copyExpenses.sort((a, b) => {
      return b.date - a.date;
    });
    localStorage.setItem(
      "appDataExpenses",
      JSON.stringify(copyExpenses)
    );
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("appDataSettings", JSON.stringify(settings));
  }, [settings]);

  const changeSettingsHandler = (settingsObject) => {
    setSettings((prevState) => {
      return { ...prevState, ...settingsObject };
    });
  };

  const addExpenseHandler = (expenseObject) => {
    setExpenses((prevState) => {
      return [expenseObject, ...prevState];
    });
  };

  const removeExpenseHandler = (expenseId) => {
    setExpenses((prevState) => {
      return prevState.filter(
        (prevExpense) => prevExpense.id !== expenseId
      );
    });
  };

  const editExpenseHandler = (expenseObject) => {
    setExpenses((prevState) => {
      return prevState.map((expense) => {
        if (expense.id !== expenseObject.id) return expense;
        else
          return {
            ...expense,
            ...expenseObject,
          };
      });
    });
  };

  return (
    <DataContext.Provider
      value={{
        expenses: expenses,
        settings: settings,
        changeSettings: changeSettingsHandler,
        addExpense: addExpenseHandler,
        removeExpense: removeExpenseHandler,
        editExpense: editExpenseHandler,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
