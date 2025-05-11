import React, { useState } from "react";
import styles from "./Palette.module.css";
import { deletePalette } from "../service/paletteService";

const calculateLuma = (color) => {
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const Palette = ({
  palette_id,
  name,
  color1,
  color2,
  color3,
  color4,
  onDelete,
  onUpdate,
}) => {
  const [copiedColor, setCopiedColor] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const colors = [color1, color2, color3, color4];
  const lumas = colors.map(calculateLuma);
  const darkestColor = colors[lumas.indexOf(Math.min(...lumas))];

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
      onClick={(e) => {
        e.stopPropagation();
        handleCopy(color);
      }}
    >
      {copiedColor === color ? "Copied!" : color}
    </div>
  );

  const togglePopup = () => setShowPopup(!showPopup);

  return (
    <>
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
        onClick={togglePopup}
      >
        <h2 className={styles.name} style={{ color: darkestColor }}>
          {name}
        </h2>
        {colors.map(renderColorBox)}
      </div>

      {showPopup && (
        <div className={styles.popupOverlay} onClick={togglePopup}>
          <div
            className={styles.popupContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles.name} style={{ color: darkestColor }}>
              {name}
            </h2>
            {colors.map(renderColorBox)}

            <div className={styles.buttonGroup}>
              <button
                className={styles.updateButton}
                onClick={() => {
                  togglePopup();
                  onUpdate(palette_id);
                }}
              >
                Update
              </button>

              <button
                className={styles.deleteButton}
                onClick={() => setShowConfirmDelete(true)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showConfirmDelete && (
        <div
          className={styles.popupOverlay}
          onClick={() => setShowConfirmDelete(false)}
        >
          <div
            className={styles.confirmDeletePopup}
            onClick={(e) => e.stopPropagation()}
          >
            <p>Are you sure you want to delete this palette?</p>
            <div className={styles.buttonGroup}>
              <button
                className={styles.confirmButton}
                onClick={async () => {
                  try {
                    await deletePalette(palette_id);
                    onDelete(palette_id);
                    setShowConfirmDelete(false);
                    setShowPopup(false);
                  } catch (error) {
                    console.error("Failed to delete palette:", error);
                  }
                }}
              >
                Yes, Delete
              </button>

              <button
                className={styles.cancelButton}
                onClick={() => setShowConfirmDelete(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Palette;
