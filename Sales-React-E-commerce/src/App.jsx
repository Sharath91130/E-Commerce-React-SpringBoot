import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes';
import './assets/styles.css';
import Auth from "./Auth.jsx";
import CheckAuth from "./Auth.jsx";

function App() {
  return (

    <Router>
      <AppRoutes />
    </Router>

  );
}

export default App;
