import React, { useState } from 'react';
import { FormOutlined, SearchOutlined, BuildOutlined, FileAddOutlined, BookOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
const MenuComponent: React.FC = () => {
  
  const [current, setCurrent] = useState('mail');

  type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
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
          Add visita
        </a>
      ),
      key: 'addVisitas',
      icon: <FormOutlined />,
    },
    {
      label: (
        <a href="/activities">
          Actividades
        </a>
      ),
      key: 'activities',
      icon: <BuildOutlined />,
    },
    {
      label: (
        <a href="/craeteIndice">
          Create Indice
        </a>
      ),
      key: 'addIndice',
      icon: <FileAddOutlined />,
    },
    {
      label: (
        <a href="/listOfIndices">
          Get Indices
        </a>
      ),
      key: 'listOfIndices',
      icon: <BookOutlined />,
    },
  ];
  
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default MenuComponent;