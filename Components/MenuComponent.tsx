import React, { useState } from 'react';
import { FormOutlined, SearchOutlined, BookOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
const MenuComponent: React.FC = () => {
  
  const [current, setCurrent] = useState('mail');

  type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
    {
      label: "Visitas",
      key: 'visitas',
      children: [
        {
          label: (
            <a href="/">
              Search visitas
            </a>
          ),
          key: 'search',
          icon: <SearchOutlined />,
        },
        {
          label: (
            <a href="/craete">
              Create visita
            </a>
          ),
          key: 'addVisitas',
          icon: <FormOutlined />,
        },
      ],
    },
    {
      label: "Actividades",
      key: 'activities',
      children: [
        {
          label: (
            <a href="/activities">
              Search Actividades
            </a>
          ),
          key: 'activities',
          icon: <SearchOutlined />,
        },
        {
          label: (
            <a href="/craeteActividad">
              Create Actividades
            </a>
          ),
          key: 'createActivities',
          icon: <FormOutlined />,
        },
      ],
    },
    {
      label:"Jornada",
      key: 'jornada',
      children: [
        {
          label: (
            <a href="/listOfJornada">
              List of Jornada
            </a>
          ),
          key: 'listOfJornada',
          icon: <BookOutlined />,
        },
        {
          label: (
            <a href="/craeteJornada">
              Create Jornada
            </a>
          ),
          key: 'addJornada',
          icon: <FormOutlined />,
        },
      ],
    },
    {
      label:"Presupuesto Laboratorio",
      key: 'presupuesto-laboratorio',
      children: [
        {
          label: (
            <a href="/listOfPresupuesto">
              List of Presupuesto
            </a>
          ),
          key: 'listOfPresupuesto',
          icon: <BookOutlined />,
        },
        {
          label: (
            <a href="/craetePresupuestoLaboratorio">
              Create Presupuesto Laboratorio
            </a>
          ),
          key: 'addJornada',
          icon: <FormOutlined />,
        },
      ],
    },
    {
      label:"Orientaciones Curriculares",
      key: 'orientaciones-curriculares',
      children: [
        {
          label: (
            <a href="/listOfOrientacionesCurriculares">
              List of Orientaciones Curriculares
            </a>
          ),
          key: 'listOfOrientacionesCurriculares',
          icon: <BookOutlined />,
        },
        {
          label: (
            <a href="/craeteOrientacionesCurriculares">
              Create Orientaciones Curriculares
            </a>
          ),
          key: 'addOrientacionesCurriculares',
          icon: <FormOutlined />,
        },
      ],
    },
    {
      label:"Indices",
      key: 'indices',
      children: [
        {
          label: (
            <a href="/listOfIndices">
              List of Indices
            </a>
          ),
          key: 'listOfIndices',
          icon: <BookOutlined />,
        },
        {
          label: (
            <a href="/createIndice">
              Create Indice
            </a>
          ),
          key: 'addIndice',
          icon: <FormOutlined />,
        },
      ],
    },
  ];
  
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default MenuComponent;