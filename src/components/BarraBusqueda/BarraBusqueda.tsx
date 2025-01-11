import React, { useState } from "react";
import styles from "./BarraBusqueda.module.css"; // Importa los estilos del archivo CSS module

interface PropsBarraBusqueda {
  onBuscar: (consulta: string) => void;
}

const BarraBusqueda: React.FC<PropsBarraBusqueda> = ({ onBuscar }) => {
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const manejarBusqueda = () => {
    if (textoBusqueda.trim()) {
      onBuscar(textoBusqueda); // Llama a la función onBuscar si hay texto
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        value={textoBusqueda}
        onChange={(e) => setTextoBusqueda(e.target.value)}
        placeholder="Escribe aquí para buscar..."
        className={styles.input}
      />
      <button onClick={manejarBusqueda} className={styles.button}>
        Buscar
      </button>
    </div>
  );
};

export default BarraBusqueda;
