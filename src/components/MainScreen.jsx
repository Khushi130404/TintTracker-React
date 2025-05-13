import React, { useState } from "react";
import styles from "./MainScreen.module.css";
import PaletteCollection from "./PaletteCollection";
import { insertPalette } from "../service/paletteService";

const MainScreen = () => {
  const [showForm, setShowForm] = useState(false);
  const [paletteName, setPaletteName] = useState("");
  const [colors, setColors] = useState(["", "", "", ""]);

  const handleColorChange = (index, value) => {
    const updatedColors = [...colors];
    updatedColors[index] = value;
    setColors(updatedColors);
  };

  const handleAddSubmit = async () => {
    const payload = {
      name: paletteName,
      color1: colors[0],
      color2: colors[1],
      color3: colors[2],
      color4: colors[3],
    };

    try {
      await insertPalette(payload);
      setShowForm(false);
      setPaletteName("");
      setColors(["", "", "", ""]);
      // Optionally: Refresh palettes in PaletteCollection if it's dynamic
    } catch (error) {
      console.error("Error inserting palette:", error);
    }
  };

  return (
    <div className={styles.mainScreen}>
      <div className={styles.header}>Tint Tracker</div>
      <div className={styles.container}>
        <p className={styles.welcome}>
          Track your tints, monitor shades, and manage your palette
          effortlessly.
        </p>
        <img
          src="/add.svg"
          className={styles.addButton}
          onClick={() => setShowForm(true)}
          alt="Add Palette"
        />

        {showForm && (
          <div className={styles.formContainer}>
            <input
              type="text"
              value={paletteName}
              onChange={(e) => setPaletteName(e.target.value)}
              placeholder="Enter palette name"
              className={styles.nameInput}
            />
            {colors.map((color, index) => (
              <input
                key={index}
                type="color"
                value={color}
                onChange={(e) => handleColorChange(index, e.target.value)}
                className={styles.colorPicker}
              />
            ))}
            <div className={styles.buttonGroup}>
              <button className={styles.updateButton} onClick={handleAddSubmit}>
                Add
              </button>
              <button
                className={styles.cancelButton}
                onClick={() => {
                  setShowForm(false);
                  setPaletteName("");
                  setColors(["", "", "", ""]);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <PaletteCollection />
      </div>
    </div>
  );
};

export default MainScreen;
