import React, { useState } from "react";
import styles from "./Palette.module.css";

const Palette = ({ palette_id, name, color1, color2, color3, color4 }) => {
  const [copiedColor, setCopiedColor] = useState(null);

  const handleCopy = async (color) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 1000);
    } catch (err) {
      console.error("Failed to copy color:", err);
    }
  };

  const renderColorBox = (color) => (
    <div
      className={styles.colorBox}
      style={{ backgroundColor: color }}
      onClick={() => handleCopy(color)}
    >
      {copiedColor === color ? "Copied!" : color}
    </div>
  );

  return (
    <div
      className={styles.paletteContainer}
      style={{
        background: `linear-gradient(135deg, 
          rgba(${parseInt(color1.slice(1, 3), 16)}, ${parseInt(
          color1.slice(3, 5),
          16
        )}, ${parseInt(color1.slice(5, 7), 16)}, 0.15), 
          rgba(${parseInt(color2.slice(1, 3), 16)}, ${parseInt(
          color2.slice(3, 5),
          16
        )}, ${parseInt(color2.slice(5, 7), 16)}, 0.15), 
          rgba(${parseInt(color3.slice(1, 3), 16)}, ${parseInt(
          color3.slice(3, 5),
          16
        )}, ${parseInt(color3.slice(5, 7), 16)}, 0.15), 
          rgba(${parseInt(color4.slice(1, 3), 16)}, ${parseInt(
          color4.slice(3, 5),
          16
        )}, ${parseInt(color4.slice(5, 7), 16)}, 0.15))`,
      }}
    >
      <h2 className={styles.name}>{name}</h2>
      {renderColorBox(color1)}
      {renderColorBox(color2)}
      {renderColorBox(color3)}
      {renderColorBox(color4)}
    </div>
  );
};

export default Palette;
