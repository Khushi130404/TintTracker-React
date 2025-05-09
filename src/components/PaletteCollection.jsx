import React from "react";
import Palette from "./Palette";
import styles from "./PaletteCollection.module.css";

const PaletteCollection = () => {
  // Temporary palette records
  const palettes = [
    {
      palette_id: "p1",
      name: "Khushi",
      color1: "#FF4500",
      color2: "#FF8C00",
      color3: "#FFD700",
      color4: "#8B0000",
    },
    {
      palette_id: "p1",
      name: "Khushi",
      color1: "#FF4500",
      color2: "#FF8C00",
      color3: "#FFD700",
      color4: "#8B0000",
    },
    {
      palette_id: "p1",
      name: "Khushi",
      color1: "#FF4500",
      color2: "#FF8C00",
      color3: "#FFD700",
      color4: "#8B0000",
    },
    {
      palette_id: "p1",
      name: "Khushi",
      color1: "#FF4500",
      color2: "#FF8C00",
      color3: "#FFD700",
      color4: "#8B0000",
    },
    {
      palette_id: "p1",
      name: "Khushi",
      color1: "#FF4500",
      color2: "#FF8C00",
      color3: "#FFD700",
      color4: "#8B0000",
    },
    {
      palette_id: "p2",
      name: "Aarav",
      color1: "#4B0082",
      color2: "#800080",
      color3: "#9932CC",
      color4: "#DA70D6",
    },
    {
      palette_id: "p3",
      name: "Meera",
      color1: "#00CED1",
      color2: "#20B2AA",
      color3: "#48D1CC",
      color4: "#40E0D0",
    },
    {
      palette_id: "p4",
      name: "Rohan",
      color1: "#2E8B57",
      color2: "#3CB371",
      color3: "#66CDAA",
      color4: "#8FBC8F",
    },
  ];

  return (
    <div className={styles.collectionContainer}>
      <h1 className={styles.heading}>All Palettes</h1>
      <div className={styles.grid}>
        {palettes.map((palette) => (
          <Palette key={palette.palette_id} {...palette} />
        ))}
      </div>
    </div>
  );
};

export default PaletteCollection;
