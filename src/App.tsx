import React, { useState } from "react";
import { obtenerMultimedia } from "./services/api";
import BarraBusqueda from "./components/BarraBusqueda/BarraBusqueda";
import GrillaResultados from "./components/GrillaResultados/GrillaResultados";
import styles from "./App.module.css";

interface Resultado {
  title: string;
  description: string;
  media_type: string;
  href: string;
}

const App: React.FC = () => {
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [pagina, setPagina] = useState(1);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [haBuscado, setHaBuscado] = useState(false);

  const manejarBusqueda = async (consulta: string) => {
    if (!consulta.trim()) {
      setError("Por favor, ingresa un término para buscar.");
      setResultados([]); // Limpia los resultados previos
      setHaBuscado(false); // Evita que se muestre "No hay ningún resultado."
      return;
    }

    setError(""); // Limpia cualquier error previo
    setHaBuscado(true); // Marca que se ha realizado una búsqueda

    try {
      setCargando(true);
      const datos = await obtenerMultimedia(consulta);
      const resultadosFormateados = datos.map((item: any) => ({
        title: item.data[0]?.title || "Sin título",
        description: item.data[0]?.description || "Sin descripción",
        media_type: item.data[0]?.media_type || "Desconocido",
        href:
          item.links?.find((link: any) => link.rel === "preview")?.href || "#",
      }));
      setResultados(resultadosFormateados);
      setPagina(1);
    } catch (error) {
      console.error("Error al buscar multimedia:", error);
      setError(
        "Ocurrió un error al obtener los resultados. Inténtalo nuevamente."
      );
    } finally {
      setCargando(false);
    }
  };

  const manejarPagina = (incremento: number) => {
    const nuevaPagina = pagina + incremento;
    if (nuevaPagina < 1 || nuevaPagina > Math.ceil(resultados.length / 6))
      return;
    setPagina(nuevaPagina);
  };

  const resultadosPaginados = resultados.slice((pagina - 1) * 6, pagina * 6);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Buscador de archivos multimedia</h1>
      </header>
      <BarraBusqueda onBuscar={manejarBusqueda} />

      {/* Mostrar mensaje de error */}
      {error && <p className={styles.error}>{error}</p>}

      {/* Mostrar mensaje "Cargando resultados" */}
      {cargando && <p className={styles.loading}>Cargando resultados...</p>}

      {/* Mostrar mensaje "No hay ningún resultado" solo después de buscar */}
      {haBuscado && !cargando && resultados.length === 0 && (
        <p className={styles.noResults}>No hay ningún resultado.</p>
      )}

      {/* Mostrar resultados */}
      {resultados.length > 0 && (
        <>
          <GrillaResultados resultados={resultadosPaginados} />
          <div className={styles.pagination}>
            <button
              onClick={() => manejarPagina(-1)}
              disabled={pagina === 1}
              className={`${styles.button} ${
                pagina === 1 ? styles.disabled : ""
              }`}
            >
              Anterior
            </button>
            <button
              onClick={() => manejarPagina(1)}
              disabled={pagina * 6 >= resultados.length}
              className={`${styles.button} ${
                pagina * 6 >= resultados.length ? styles.disabled : ""
              }`}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
