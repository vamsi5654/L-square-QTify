import React, { useState, useEffect } from "react";
import axios from "axios";
import AlbumCard from "../card/AlbumCard";
import Carousel from "../Carousel/Carousel";
import styles from "./Section.module.css";

function Section({ title, apiEndpoint }) {
  const [albums, setAlbums] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(true); // ✅ Start with collapsed state

  useEffect(() => {
    axios.get(apiEndpoint)
      .then(response => setAlbums(response.data))
      .catch(error => console.error("Error fetching albums:", error));
  }, [apiEndpoint]);

  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <button 
          className={styles.button} 
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "Show All" : "Collapse"}
        </button>
      </div>

      {!isCollapsed ? ( // ✅ Show grid when expanded
        <div className={styles.grid}>
          {albums.map(album => (
            <AlbumCard 
              key={album.id}
              albumImage={album.image}
              albumName={album.title}
              follows={album.follows}
            />
          ))}
        </div>
      ) : ( // ✅ Show carousel when collapsed
        <Carousel 
          items={albums} 
          renderItem={(album) => (
            <AlbumCard 
              key={album.id}
              albumImage={album.image}
              albumName={album.title}
              follows={album.follows}
            />
          )}
        />
      )}
    </div>
  );
}

export default Section;
