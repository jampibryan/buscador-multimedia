import React from "react";
import styles from "./GrillaResultados.module.css"; // Importa los estilos del archivo CSS module

interface Resultado {
  title: string;
  description: string;
  media_type: string;
  href: string;
}

interface PropsGrillaResultados {
  resultados: Resultado[];
}

const GrillaResultados: React.FC<PropsGrillaResultados> = ({ resultados }) => {
  return (
    <div className={styles.gridContainer}>
      {resultados.map((resultado, index) => (
        <div key={index} className={styles.card}>
          <h3 className={styles.title}>
            {resultado.title || "Sin título"}
          </h3>

          {/* Manejo del tipo de medio */}
          {(resultado.media_type === "image" || resultado.media_type === "video") &&
          resultado.href !== "#" ? (
            <img
              src={resultado.href}
              alt={resultado.title}
              className={styles.image}
            />
          ) : resultado.media_type === "audio" ? (
            <div className={styles.audioPlaceholder}>
              🎧 Contenido de audio disponible
            </div>
          ) : (
            <p className={styles.noImage}>Imagen no disponible</p>
          )}

          <p className={styles.description}>
            {resultado.description?.slice(0, 300) || "Sin descripción"}...
          </p>

          <p className={styles.mediaType}>
            <strong>{resultado.media_type}</strong>
          </p>

          <a
            href={resultado.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Ver más
          </a>
        </div>
      ))}
    </div>
  );
};

export default GrillaResultados;
