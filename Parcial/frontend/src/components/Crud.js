// src/components/Crud.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Crud = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [newEstudiante, setNewEstudiante] = useState({
    numeroCarnet: '',
    nombre: '',
    apellido: '',
    correo: '',
    curso: '',
    numeroDocIdentidad: ''
  });
  const [editing, setEditing] = useState(null);

  // Fetch estudiantes from API
  useEffect(() => {
    axios.get('/api/estudiantes')
      .then(response => setEstudiantes(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Create new estudiante
  const handleCreate = () => {
    axios.post('api/estudiantes', newEstudiante)
      .then(response => {
        setEstudiantes([...estudiantes, response.data]);
        setNewEstudiante({
          numeroCarnet: '',
          nombre: '',
          apellido: '',
          correo: '',
          curso: '',
          numeroDocIdentidad: ''
        });
      })
      .catch(error => console.error('Error creating data:', error));
  };

  // Delete estudiante
  const handleDelete = (numeroCarnet) => {
    axios.delete(`/api/estudiantes/${numeroCarnet}`)
      .then(() => setEstudiantes(estudiantes.filter(est => est.numeroCarnet !== numeroCarnet)))
      .catch(error => console.error('Error deleting data:', error));
  };

  // Update estudiante
  const handleUpdate = () => {
    axios.put(`/api/estudiantes/${editing.numeroCarnet}`, editing)
      .then(response => {
        setEstudiantes(estudiantes.map(est =>
          est.numeroCarnet === response.data.numeroCarnet ? response.data : est
        ));
        setEditing(null);
      })
      .catch(error => console.error('Error updating data:', error));
  };

  return (
    <div>
      <h1>CRUD Estudiantes</h1>

      {/* Formulario para crear un nuevo estudiante */}
      <div>
        <h2>Agregar Estudiante</h2>
        <input
          type="text"
          placeholder="Número de Carnet"
          value={newEstudiante.numeroCarnet}
          onChange={(e) => setNewEstudiante({ ...newEstudiante, numeroCarnet: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nombre"
          value={newEstudiante.nombre}
          onChange={(e) => setNewEstudiante({ ...newEstudiante, nombre: e.target.value })}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={newEstudiante.apellido}
          onChange={(e) => setNewEstudiante({ ...newEstudiante, apellido: e.target.value })}
        />
        <input
          type="text"
          placeholder="Correo"
          value={newEstudiante.correo}
          onChange={(e) => setNewEstudiante({ ...newEstudiante, correo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Curso"
          value={newEstudiante.curso}
          onChange={(e) => setNewEstudiante({ ...newEstudiante, curso: e.target.value })}
        />
        <input
          type="text"
          placeholder="Número de Documento de Identidad"
          value={newEstudiante.numeroDocIdentidad}
          onChange={(e) => setNewEstudiante({ ...newEstudiante, numeroDocIdentidad: e.target.value })}
        />
        <button onClick={handleCreate}>Agregar</button>
      </div>

      {/* Lista de estudiantes */}
      <div>
        <h2>Lista de Estudiantes</h2>
        <ul>
          {estudiantes.map(est => (
            <li key={est.numeroCarnet}>
              {est.nombre} {est.apellido}
              <button onClick={() => handleDelete(est.numeroCarnet)}>Eliminar</button>
              <button onClick={() => setEditing(est)}>Editar</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Formulario para editar un estudiante */}
      {editing && (
        <div>
          <h2>Editar Estudiante</h2>
          <input
            type="text"
            placeholder="Número de Carnet"
            value={editing.numeroCarnet}
            disabled
          />
          <input
            type="text"
            placeholder="Nombre"
            value={editing.nombre}
            onChange={(e) => setEditing({ ...editing, nombre: e.target.value })}
          />
          <input
            type="text"
            placeholder="Apellido"
            value={editing.apellido}
            onChange={(e) => setEditing({ ...editing, apellido: e.target.value })}
          />
          <input
            type="text"
            placeholder="Correo"
            value={editing.correo}
            onChange={(e) => setEditing({ ...editing, correo: e.target.value })}
          />
          <input
            type="text"
            placeholder="Curso"
            value={editing.curso}
            onChange={(e) => setEditing({ ...editing, curso: e.target.value })}
          />
          <input
            type="text"
            placeholder="Número de Documento de Identidad"
            value={editing.numeroDocIdentidad}
            onChange={(e) => setEditing({ ...editing, numeroDocIdentidad: e.target.value })}
          />
          <button onClick={handleUpdate}>Actualizar</button>
          <button onClick={() => setEditing(null)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default Crud;
