import React from "react";
import styles from "./MainScreen.module.css";
import PaletteCollection from "./PaletteCollection";

const MainScreen = () => {
  return (
    <div className={styles.mainScreen}>
      <div className={styles.header}>Tint Tracker</div>
      <div className={styles.container}>
        <p className={styles.welcome}>
          Track your tints, monitor shades, and manage your palette
          effortlessly.
        </p>
        <PaletteCollection></PaletteCollection>
      </div>
    </div>
  );
};

export default MainScreen;
