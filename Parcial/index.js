const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

app.use(cors()); // Usa el middleware cors
app.use(express.json());

// Obtener todos los estudiantes
app.get('/estudiantes', async (req, res) => {
  try {
    const estudiantes = await prisma.estudiante.findMany();
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching students' });
  }
});

// Obtener un estudiante por número de carnet
app.get('/estudiantes', async (req, res) => {
  try {
    const estudiantes = await prisma.estudiante.findMany();
    res.json(estudiantes.map(est => ({
      numeroCarnet: est.numeroCarnet.toString(),
      nombre: est.nombre,
      apellido: est.apellido,
      correo: est.correo,
      curso: est.curso,
      numeroDocIdentidad: est.numeroDocIdentidad.toString(),
    })));
  } catch (error) {
    res.status(500).json({ error: 'Error fetching students' });
  }
});


// Crear un nuevo estudiante
app.post('/estudiantes', async (req, res) => {
  const { numeroCarnet, nombre, apellido, correo, curso, numeroDocIdentidad } = req.body;
  try {
    const nuevoEstudiante = await prisma.estudiante.create({
      data: {
        numeroCarnet: BigInt(numeroCarnet),
        nombre,
        apellido,
        correo,
        curso,
        numeroDocIdentidad: BigInt(numeroDocIdentidad),
      },
    });
    res.status(201).json({
      numeroCarnet: nuevoEstudiante.numeroCarnet.toString(),
      nombre: nuevoEstudiante.nombre,
      apellido: nuevoEstudiante.apellido,
      correo: nuevoEstudiante.correo,
      curso: nuevoEstudiante.curso,
      numeroDocIdentidad: nuevoEstudiante.numeroDocIdentidad.toString(),
    });
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Error creating student' });
  }
});



// Actualizar un estudiante existente
app.put('/estudiantes/:numeroCarnet', async (req, res) => {
  const { numeroCarnet } = req.params;
  const { nombre, apellido, correo, curso, numeroDocIdentidad } = req.body;
  try {
    const estudianteActualizado = await prisma.estudiante.update({
      where: { numeroCarnet: BigInt(numeroCarnet) },
      data: {
        nombre,
        apellido,
        correo,
        curso,
        numeroDocIdentidad: BigInt(numeroDocIdentidad),
      },
    });
    res.json(estudianteActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error updating student' });
  }
});

// Eliminar un estudiante por número de carnet
app.delete('/estudiantes/:numeroCarnet', async (req, res) => {
  const { numeroCarnet } = req.params;
  try {
    await prisma.estudiante.delete({
      where: { numeroCarnet: BigInt(numeroCarnet) },
    });
    res.status(204).end(); // No content
  } catch (error) {
    console.error('Error deleting student:', error); // Para depuración
    res.status(500).json({ error: 'Error deleting student' });
  }
});


app.listen(5000, () => {
  console.log('Server running on port 5000');
});
