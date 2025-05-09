import React from "react";
import styles from "./MainScreen.module.css";

const MainScreen = () => {
  return (
    <div className={styles.mainScreen}>
      <div className={styles.header}>Tint Tracker</div>
      <div className={styles.container}>
        {/* <h1 className={styles.title}>
          ✨ Welcome to Your Tint Tracker Dashboard ✨
        </h1> */}
        <p className={styles.welcome}>
          Track your tints, monitor shades, and manage your palette
          effortlessly.
        </p>
      </div>
    </div>
  );
};

export default MainScreen;
