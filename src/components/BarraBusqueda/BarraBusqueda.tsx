import React, { useState } from "react";
import styles from "./BarraBusqueda.module.css"; // Importa los estilos del archivo CSS module

// Interfaz para definir las propiedades que recibe el componente
interface PropsBarraBusqueda {
  onBuscar: (consulta: string) => void; //Se ejecutará al buscar, recibe el término de búsqueda
}

// Componente funcional para la barra de búsqueda
const BarraBusqueda: React.FC<PropsBarraBusqueda> = ({ onBuscar }) => {
  const [textoBusqueda, setTextoBusqueda] = useState("");

  // Maneja la búsqueda cuando se presiona el botón
  const manejarBusqueda = () => {
    if (textoBusqueda.trim()) {
      onBuscar(textoBusqueda);
    }
  };

  /* Renderiza un campo de entrada 
    y un botón para realizar búsquedas con estilos aplicados */
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
