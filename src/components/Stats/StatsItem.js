import React, { useContext } from "react";
import classes from "./StatsItem.module.css";
import DataContext from "../../store/data-context";

const StatsItem = (props) => {
  const appDataCtx = useContext(DataContext);

  const value = props.value ? props.value : "0";
  const label = props.label ? props.label : "Wartość";

  return (
    <div className={classes.item}>
      <span>
        {value} {appDataCtx.settings.currency}
      </span>
      <label>{label}</label>
    </div>
  );
};

export default StatsItem;
