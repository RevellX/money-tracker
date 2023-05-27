import React, { useContext, useState } from "react";
import classes from "./StatsList.module.css";
import Card from "../UI/Card";
import DataContext from "../../store/data-context";
import StatsItem from "./StatsItem";
import Button from "../UI/Button";

const StatsList = () => {
  const [daysTimeSpan, setDaysTimeSpan] = useState(30);
  const appDataCtx = useContext(DataContext);

  let filteredExpenses = [];

  let filterDate = new Date();
  filterDate.setDate(filterDate.getDate() - daysTimeSpan);
  filteredExpenses = appDataCtx.expenses.filter((expense) => {
    return expense.date > filterDate;
  });

  let totalEarned = 0;
  let totalSpent = 0;

  for (let index = 0; index < filteredExpenses.length; index++) {
    if (filteredExpenses[index].isPositive)
      totalEarned += +filteredExpenses[index].amount;
    else totalSpent += +filteredExpenses[index].amount;
  }

  const totalBalance = totalEarned - totalSpent;

  const dailyEarned = totalEarned / daysTimeSpan;
  const monthlyEarned = dailyEarned * 30;
  const annuallyEarned = monthlyEarned * 12;

  return (
    <main className={`responsive-section ${classes.main}`}>
      <Card className={classes.main__inner}>
        <h3>Podsumowanie wydatków</h3>
        <div className={classes.actions}>
          <Button textColor='white'>1 Miesiąc</Button>
          <Button textColor='white'>3 Miesiące</Button>
          <Button textColor='white'>6 Miesięcy</Button>
        </div>
        <hr />
        <div className={classes.stats}>
          <StatsItem value={totalEarned} label='Przychody' />
          <StatsItem value={totalSpent} label='Wydatki' />
          <StatsItem value={totalBalance} label='Bilans' />
        </div>
        <hr />
        <div className={classes.stats}>
          <StatsItem value={dailyEarned.toFixed(2)} label='Dzienne' />
          <StatsItem
            value={monthlyEarned.toFixed(2)}
            label='Miesięczne'
          />
          <StatsItem
            value={annuallyEarned.toFixed(2)}
            label='Roczne'
          />
        </div>
      </Card>
    </main>
  );
};

export default StatsList;
