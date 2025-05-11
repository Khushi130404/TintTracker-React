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
  const [isEditing, setIsEditing] = useState(false);

  const [editedName, setEditedName] = useState(name);
  const [editedColors, setEditedColors] = useState([
    color1,
    color2,
    color3,
    color4,
  ]);

  const lumas = editedColors.map(calculateLuma);
  const darkestColor = editedColors[lumas.indexOf(Math.min(...lumas))];

  const handleCopy = async (color) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 1000);
    } catch (err) {
      console.error("Failed to copy color:", err);
    }
  };

  const renderColorBox = (color, index, editable = false) => (
    <div
      key={index}
      className={styles.colorBox}
      style={{ backgroundColor: color }}
      onClick={(e) => {
        e.stopPropagation();
        if (!editable) handleCopy(color);
      }}
    >
      {editable ? (
        <input
          type="color"
          value={color}
          onChange={(e) => {
            const newColors = [...editedColors];
            newColors[index] = e.target.value;
            setEditedColors(newColors);
          }}
        />
      ) : copiedColor === color ? (
        "Copied!"
      ) : (
        color
      )}
    </div>
  );

  const handleUpdateSubmit = () => {
    onUpdate(palette_id, editedName, ...editedColors);
    setIsEditing(false);
    setShowPopup(false);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setIsEditing(false);
    setEditedName(name);
    setEditedColors([color1, color2, color3, color4]);
  };

  return (
    <>
      <div
        className={styles.paletteContainer}
        style={{
          background: `linear-gradient(135deg,
            rgba(${parseInt(editedColors[0].slice(1, 3), 16)}, ${parseInt(
            editedColors[0].slice(3, 5),
            16
          )}, ${parseInt(editedColors[0].slice(5, 7), 16)}, 0.15),
            rgba(${parseInt(editedColors[1].slice(1, 3), 16)}, ${parseInt(
            editedColors[1].slice(3, 5),
            16
          )}, ${parseInt(editedColors[1].slice(5, 7), 16)}, 0.15),
            rgba(${parseInt(editedColors[2].slice(1, 3), 16)}, ${parseInt(
            editedColors[2].slice(3, 5),
            16
          )}, ${parseInt(editedColors[2].slice(5, 7), 16)}, 0.15),
            rgba(${parseInt(editedColors[3].slice(1, 3), 16)}, ${parseInt(
            editedColors[3].slice(3, 5),
            16
          )}, ${parseInt(editedColors[3].slice(5, 7), 16)}, 0.15))`,
        }}
        onClick={togglePopup}
      >
        <h2 className={styles.name} style={{ color: darkestColor }}>
          {name}
        </h2>
        {editedColors.map((color, index) => renderColorBox(color, index))}
      </div>

      {showPopup && (
        <div className={styles.popupOverlay} onClick={togglePopup}>
          <div
            className={styles.popupContent}
            onClick={(e) => e.stopPropagation()}
          >
            {!isEditing ? (
              <>
                <h2 className={styles.name} style={{ color: darkestColor }}>
                  {name}
                </h2>
                {editedColors.map((color, index) =>
                  renderColorBox(color, index)
                )}
                <div className={styles.buttonGroup}>
                  <button
                    className={styles.updateButton}
                    onClick={() => setIsEditing(true)}
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
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className={styles.nameInput}
                />
                {editedColors.map((color, index) =>
                  renderColorBox(color, index, true)
                )}
                <div className={styles.buttonGroup}>
                  <button
                    className={styles.updateButton}
                    onClick={handleUpdateSubmit}
                  >
                    Update
                  </button>
                  <button
                    className={styles.cancelButton}
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
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
