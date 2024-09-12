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
app.get('/estudiantes/:numeroCarnet', async (req, res) => {
  const { numeroCarnet } = req.params;
  try {
    const estudiante = await prisma.estudiante.findUnique({
      where: { numeroCarnet: BigInt(numeroCarnet) },
    });
    if (estudiante) {
      res.json(estudiante);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching student' });
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
    res.status(201).json(nuevoEstudiante);
  } catch (error) {
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
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting student' });
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
