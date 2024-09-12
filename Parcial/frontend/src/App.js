// src/App.js

import React from 'react';
import Crud from './components/Crud';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>CRUD Estudiantes</h1>
      </header>
      <main>
        <Crud />
      </main>
    </div>
  );
}

export default App;
