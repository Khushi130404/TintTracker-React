import React, { useState } from "react";
import styles from "./MainScreen.module.css";
import PaletteCollection from "./PaletteCollection";
import { insertPalette } from "../service/paletteService";

const MainScreen = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [paletteName, setPaletteName] = useState("");
  const [colors, setColors] = useState([
    "#000000",
    "#000000",
    "#000000",
    "#000000",
  ]);

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
      setShowPopup(false);
      setPaletteName("");
      setColors(["#000000", "#000000", "#000000", "#000000"]);
    } catch (error) {
      console.error("Error inserting palette:", error);
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
    setPaletteName("");
    setColors(["#000000", "#000000", "#000000", "#000000"]);
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
          onClick={() => setShowPopup(true)}
          alt="Add Palette"
        />

        {/* Popup Modal */}
        {showPopup && (
          <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
              <h3>Add New Palette</h3>
              <input
                type="text"
                placeholder="Enter palette name"
                value={paletteName}
                onChange={(e) => setPaletteName(e.target.value)}
                className={styles.nameInput}
              />
              <div className={styles.colorInputs}>
                {colors.map((color, index) => (
                  <input
                    key={index}
                    type="color"
                    value={color}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                    className={styles.colorPicker}
                  />
                ))}
              </div>
              <div className={styles.buttonGroup}>
                <button
                  className={styles.updateButton}
                  onClick={handleAddSubmit}
                >
                  Add
                </button>
                <button className={styles.cancelButton} onClick={handleCancel}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <PaletteCollection />
      </div>
    </div>
  );
};

export default MainScreen;
