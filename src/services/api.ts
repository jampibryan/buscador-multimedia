const URL_BASE_API = "https://images-api.nasa.gov";

// Función para obtener resultados multimedia desde la API
// Recibe el término de búsqueda (`consulta`) y la página (`pagina`) como parámetros

export const obtenerMultimedia = async (consulta: string, pagina: number = 1) => {
  try {
    const respuesta = await fetch(
      `${URL_BASE_API}/search?q=${consulta}&page=${pagina}`
    );
    
    // Verificamos si la respuesta HTTP fue exitosa

    if (!respuesta.ok) {
      throw new Error("Error al obtener los datos de la API");
    }
    const datos = await respuesta.json();
    return datos.collection.items;
  } catch (error) {
    console.error("Error en la API:", error);
    throw error;
  }
};
