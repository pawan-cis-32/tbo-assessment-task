import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
  
} from "react-router-dom";
import CalculationToDo from "./components/calculation-to-do";

function App() {
  return (
    <BrowserRouter>
    <Routes>
     
      <Route path="/" element={<CalculationToDo />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
