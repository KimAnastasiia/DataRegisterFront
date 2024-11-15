import React, { useState } from 'react';
import { FormOutlined, SearchOutlined, FolderAddOutlined } from '@ant-design/icons';
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
      key: 'app',
      icon: <FormOutlined />,
    }
  ];
  
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default MenuComponent;