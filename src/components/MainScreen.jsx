import React from "react";
import styles from "./MainScreen.module.css";
import Palette from "./Palette";

const MainScreen = () => {
  return (
    <div className={styles.mainScreen}>
      <div className={styles.header}>Tint Tracker</div>
      <div className={styles.container}>
        <p className={styles.welcome}>
          Track your tints, monitor shades, and manage your palette
          effortlessly.
        </p>
        <Palette
          palette_id={1}
          name="Khushi"
          color1="#FF4500"
          color2="#FF8C00"
          color3="#FFD700"
          color4="#8B0000"
        />
      </div>
    </div>
  );
};

export default MainScreen;
