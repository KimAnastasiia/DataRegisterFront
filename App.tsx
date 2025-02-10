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
import { CreateJornadasAcogida } from './Components/CreateJornadasAcogida';
import { ListOfJornadasAcogida } from './Components/ListOfJornadasAcogida';
import { ListOfPresupuestoLaboratorio } from './Components/ListOfPresupuestoLaboratorio';
import { CreatePresupuestoLoaboratorio } from './Components/CreatePresupuestoLoaboratorio';
function App() {
  return (
    <div className="App">
      <MenuComponent/>

      <Routes>
        <Route path="/craete" element={<CreateVisita/>}/>
        <Route path="/" element={<GetVisitasComponent/>}/>
        <Route path="/activities" element={<GetActividades/>}/>
        <Route path="/craeteActividad" element={<CreateActividades/>}/>
        <Route path="/listOfJornada" element={<ListOfJornadasAcogida/>}/>
        <Route path="/createIndice" element={<CreateIndice/>}/>
        <Route path="/listOfIndices" element={<ListOfIndices/>}/>
        <Route path="/statistic/:startDate/:endDate" element={<InidceDetails/>}/>
        <Route path="/listOfPresupuesto" element={<ListOfPresupuestoLaboratorio/>}/>
        <Route path="/craetePresupuestoLaboratorio" element={<CreatePresupuestoLoaboratorio/>}/>
      </Routes>
    </div>
  )
}

export default App;
