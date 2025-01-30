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
            <a href="/craeteIndice">
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