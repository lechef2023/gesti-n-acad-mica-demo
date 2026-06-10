import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MisNotas from './pages/MisNotas';
import CargarNotas from './pages/CargarNotas';
import Solvencias from './pages/Solvencias';
import Reportes from './pages/Reportes';
import Estudiantes from './pages/Estudiantes';
import Estadisticas from './pages/Estadisticas';

function App() {
  const [user, setUser] = useState<any>(null);

  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Login setAuthUser={setUser} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="app-layout">
        <Sidebar user={user} />
        <div className="main-content">
          <Topbar user={user} logout={() => setUser(null)} />
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard user={user} />} />
              <Route path="/notas" element={<MisNotas user={user} />} />
              <Route path="/cargar-notas" element={<CargarNotas user={user} />} />
              <Route path="/solvencias" element={<Solvencias user={user} />} />
              <Route path="/reportes" element={<Reportes user={user} />} />
              <Route path="/estudiantes" element={<Estudiantes user={user} />} />
              <Route path="/estadisticas" element={<Estadisticas user={user} />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
