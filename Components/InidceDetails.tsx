import React, { useState, useEffect} from 'react';
import { message  } from 'antd';
import { backendUrl } from '../Global';
import { useParams } from "react-router-dom";


export const InidceDetails: React.FC = () => {

 const { endDate } = useParams()
 const { startDate } = useParams()

  const [totalVisitas, setTotalVisitas] = useState(0);
  const [totalParticipantes, setParticipantes] = useState(0);

  const [totalActividades, setTotalActividades] = useState(0);
  const [totalActividadesParticipantes, setTotalActividadesParticipantes] = useState(0);

  const [percentageParticipantes, setPercentageParticipantes] = useState(0);

 useEffect(() => {
    fetchVisitas();
    fetchActividades();
    fetchJornadas()
    }, []);
  
  const fetchVisitas = async () => {

    if (!startDate || !endDate) {
      message.error('Por favor, seleccione ambas fechas.');
      return;
    }

    try {
      const response = await fetch(
        `${backendUrl}/api/visitas/indice?startDate=${startDate}&endDate=${endDate}`
      );

      if (!response.ok) {
        throw new Error('Error al obtener visitas');
      }

      const data = await response.json();  // data will now contain { items, total }
      setTotalVisitas(data.totalVisitas)
      setParticipantes(data.totalParticipantes)
      
    } catch (error) {
      message.error('Error al obtener visitas.');
      console.error(error);
    } finally {

    }
  };
  const fetchJornadas = async () => {

    if (!startDate || !endDate) {
      message.error('Por favor, seleccione ambas fechas.');
      return;
    }

    try {
      const response = await fetch(
        `${backendUrl}/api/jornadas/indice?startDate=${startDate}&endDate=${endDate}`
      );

      if (!response.ok) {
        throw new Error('Error al obtener visitas');
      }

      const data = await response.json();  // data will now contain { items, total }
      setPercentageParticipantes(data.percentageParticipantes)
    } catch (error) {
      message.error('Error al obtener jornadas.');
      console.error(error);
    } finally {

    }
  };
  const fetchActividades = async () => {

    if (!startDate || !endDate) {
      message.error('Por favor, seleccione ambas fechas.');
      return;
    }

    try {
      const response = await fetch(
        `${backendUrl}/api/actividades/indice?startDate=${startDate}&endDate=${endDate}`
      );

      if (!response.ok) {
        throw new Error('Error al obtener actividades');
      }

      const data = await response.json();  // data will now contain { items, total }
    setTotalActividades(data.totalActividades)
    setTotalActividadesParticipantes(data.totalParticipantes)
    } catch (error) {
      message.error('Error al obtener actividades.');
      console.error(error);
    } finally {

    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Statistic of Visitas </h2>
        <h3>Total visitas: {totalVisitas}</h3>
        <h3>Total participantes: {totalParticipantes}</h3>

      <h2>Statistic of Actividades </h2>
        <h3>Total actividades: {totalActividades}</h3>
        <h3>Total participantes de actividades: {totalActividadesParticipantes}</h3>

      <h2>Statistic of Jornada Acogida </h2>
        <h3>Parcentage Participantes: {percentageParticipantes}%</h3>
    </div>
  );
};
