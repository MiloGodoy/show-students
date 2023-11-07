import { useState } from 'react';
import { useFetch } from './useFetch'
import './App.css'

function App() {
  const { data, loading, error } = useFetch("http://localhost:3000/dataview");
  const [estadoBtn, setEstadoBtn] = useState("")
  const [actualizado, setActualizado] = useState(false)
  const [updatedEstado, setUpdatedEstado] = useState("")

    const handleChange = async (event, id) => {
      try {
        const estado = event.target.value;
        setUpdatedEstado(estado)
        

        // Actualizar el estado local en función de tu lógica (En Revisión, Aprobado, Rechazado)
        console.log(estado, id)


          // Enviar una solicitud POST a la API para actualizar el estado
          await fetch(`http://localhost:3000/dataview/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ estado: estado }),
          });
          
          // Redirigir a una nueva página
          window.location.href = "/localhost:5173";
          setActualizado(true)
        
        
        } catch (error) {
          console.error("Error al actualizar el estado:", error);
        }
    };
    
    

  
  return (
    <div className='App'>
      <h1>Lista de Alumnos con solicitud de Préstamo Universitario</h1>
      <div className='card'>
        {error && <h2>Error: {error.message}</h2>}
        {loading && <h1>Loading...</h1>}
        {data && data.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Estado</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Fecha de Nacimiento</th>
                <th>Teléfono</th>
                <th>Correo Electrónico</th>
                <th>Dirección</th>
                <th>Ciudad</th>
                <th>Carrera</th>
                <th>Modalidad</th>
                <th>Turno</th>
                <th>Curso</th>
                <th>Costo Anual</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>        
                    <select
                      value={actualizado? updatedEstado : item.estado}
                      onChange={(event) => handleChange(event, item.formData.telefono)}
                    >
                      <option value="En Revisión">En Revisión</option>
                      <option value="Aprobado">Aprobado</option>
                      <option value="Rechazado">Rechazado</option>
                    </select>
                  </td>
                  <td>{item.formData.nombre}  </td>
                  <td>{item.formData.apellido}  </td>
                  <td>{item.formData.fechaNacimiento}  </td>
                  <td>{item.formData.telefono}  </td>
                  <td>{item.formData.correo}  </td>
                  <td>{item.formData.direccion}  </td>
                  <td>{item.formData.ciudad}  </td>
                  <td>{item.formData.carrera}  </td>
                  <td>{item.formData.modalidad}  </td>
                  <td>{item.formData.turno}  </td>
                  <td>{item.formData.curso}  </td>
                  <td>{item.numeroFormateado} Gs.  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App
