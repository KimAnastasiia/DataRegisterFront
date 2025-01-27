import React, { useState } from 'react';
import { FormOutlined, SearchOutlined, BuildOutlined, FileAddOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
const MenuComponent: React.FC = () => {
  
  const [current, setCurrent] = useState('mail');

  type MenuItem = Required<MenuProps>['items'][number];

  const items: MenuItem[] = [
    {
      label: (
        <a href="/">
          Search
        </a>
      ),
      key: 'search',
      icon: <SearchOutlined />,
    },
    {
      label: (
        <a href="/craete">
          Add
        </a>
      ),
      key: 'addVisitas',
      icon: <FormOutlined />,
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
        <a href="/activities">
          Actividades
        </a>
      ),
      key: 'activities',
      icon: <BuildOutlined />,
    },
  ];
  
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default MenuComponent;