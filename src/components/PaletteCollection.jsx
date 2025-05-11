import React, { useEffect, useState } from "react";
import Palette from "./Palette";
import styles from "./PaletteCollection.module.css";
import { getAllPalettes } from "../service/paletteService";

const PaletteCollection = () => {
  const [palettes, setPalettes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPalettes = async () => {
      try {
        const data = await getAllPalettes();
        setPalettes(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch palettes:", error);
      }
    };

    fetchPalettes();
  }, []);

  const handleUpdate = (id, name, color1, color2, color3, color4) => {
    setPalettes((prevPalettes) =>
      prevPalettes.map((p) =>
        p.palette_id === id ? { ...p, name, color1, color2, color3, color4 } : p
      )
    );
  };

  const handleDelete = (id) => {
    setPalettes((prevPalettes) =>
      prevPalettes.filter((p) => p.palette_id !== id)
    );
  };

  if (loading) return <p className={styles.loading}>Loading palettes...</p>;

  return (
    <div className={styles.collectionContainer}>
      <h1 className={styles.heading}>All Palettes</h1>
      <div className={styles.grid}>
        {palettes.map((palette) => (
          <Palette
            key={palette.palette_id}
            {...palette}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default PaletteCollection;
