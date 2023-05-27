import React, { useState } from "react";
import classes from "./App.module.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import List from "./components/Pages/List";
import Stats from "./components/Pages/Stats";

const App = () => {
  const [openedPage, setOpenedPage] = useState("LIST");

  const switchPageHandler = () => {
    setOpenedPage((prevState) => {
      return prevState === "LIST" ? "STATS" : "LIST";
    });
  };

  const mainContentJsx = openedPage === "LIST" ? <List /> : <Stats />;

  return (
    <div className={classes.app}>
      <Header
        openedPage={openedPage}
        onPageSwitch={switchPageHandler}
      />
      {mainContentJsx}
      <Footer />
    </div>
  );
};

export default App;
