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

  if (loading) return <p className={styles.loading}>Loading palettes...</p>;

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
