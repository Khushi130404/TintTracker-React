import React from "react";
import styles from "./Palette.module.css";

const Palette = ({ name, color1, color2, color3, color4 }) => {
  return (
    <div className={styles.paletteContainer}>
      <h2 className={styles.name}>{name}'s Palette</h2>
      <div className={styles.colorBox} style={{ backgroundColor: color1 }}>
        {color1}
      </div>
      <div className={styles.colorBox} style={{ backgroundColor: color2 }}>
        {color2}
      </div>
      <div className={styles.colorBox} style={{ backgroundColor: color3 }}>
        {color3}
      </div>
      <div className={styles.colorBox} style={{ backgroundColor: color4 }}>
        {color4}
      </div>
    </div>
  );
};

export default Palette;
