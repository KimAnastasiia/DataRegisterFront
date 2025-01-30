import React from 'react';
import './App.css';
import { Route, Routes, Link } from "react-router-dom"
import { CreateVisita } from './Components/CreateVisitaComponent';
import MenuComponent from './Components/MenuComponent';
import { GetVisitasComponent } from './Components/GetVisitasComponent';
import { GetActividades } from './Components/GetActividades';
import { CreateIndice } from './Components/CreateIndice';
import { ListOfIndices } from './Components/ListOfIndices';
import { InidceDetails } from './Components/InidceDetails';
import { CreateActividades } from './Components/CreateActividades';
function App() {
  return (
    <div className="App">
      <MenuComponent/>

      <Routes>
        <Route path="/craete" element={<CreateVisita/>}/>
        <Route path="/" element={<GetVisitasComponent/>}/>
        <Route path="/activities" element={<GetActividades/>}/>
        <Route path="/craeteActividad" element={<CreateActividades/>}/>
        <Route path="/craeteIndice" element={<CreateIndice/>}/>
        <Route path="/listOfIndices" element={<ListOfIndices/>}/>
        <Route path="/statistic/:startDate/:endDate" element={<InidceDetails/>}/>
      </Routes>
    </div>
  )
}

export default App;
