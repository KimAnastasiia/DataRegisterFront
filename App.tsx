import React from 'react';
import './App.css';
import { Route, Routes, Link } from "react-router-dom"
import { CreateVisita } from './Components/CreateVisitaComponent';
import MenuComponent from './Components/MenuComponent';
import { GetVisitasComponent } from './Components/GetVisitasComponent';
import { GetActividades } from './Components/GetActividades';
function App() {
  return (
    <div className="App">
      <MenuComponent/>

      <Routes>
        <Route path="/craete" element={<CreateVisita/>}/>
        <Route path="/" element={<GetVisitasComponent/>}/>
        <Route path="/activities" element={<GetActividades/>}/>
      </Routes>
    </div>
  )
}

export default App;
