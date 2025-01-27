import React, { useState, useEffect } from 'react';
import { DatePicker, Button, Table, message, Pagination,Modal   } from 'antd';
import { Indice } from '../Types/Indice';
import type { ColumnsType } from 'antd/es/table';
import { backendUrl } from '../Global';
import { useNavigate } from 'react-router-dom';

export const ListOfIndices: React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [indices, setIndices] = useState<Indice[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        getIndices();
      }, []);

    const getIndices = async (page: number = 1, size: number = 20) => {

    setLoading(true);

    try {
      const response = await fetch(`${backendUrl}/api/indices`);

      if (!response.ok) {
        throw new Error('Error al obtener indices');
      }

      const data = await response.json();  // data will now contain { items, total }

      setIndices(data)
  
    } catch (error) {
      message.error('Error al obtener indices.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const columns: ColumnsType<Indice> = [

    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre',  sorter: (a: any, b: any) => a.nombre.localeCompare(b.nombre),},
    { title: 'Fecha de inicio', dataIndex: 'fecha_de_inicio', key: 'fecha_de_inicio',
      sorter: (a: any, b: any) => new Date(a.fecha_de_inicio).getTime() - new Date(b.fecha_de_inicio).getTime()
    },
    { title: 'Fecha de fin', dataIndex: 'fecha_de_fin', key: 'fecha_de_fin',
        sorter: (a: any, b: any) => new Date(a.fecha_de_fin).getTime() - new Date(b.fecha_de_fin).getTime()
    },
    {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (_, record) => (
          <a
            onClick={() => {
              //confirmDelete(record.id);
              navigate(`/statistic/${record.fecha_de_fin}/${record.fecha_de_inicio}`)
            }}
            style={{ color: 'red' }}
          >
            Details
          </a>
        ),
      },
  ];
    return (
        <div style={{ padding: '20px' }}>
            <h2>List of Indices</h2>
            <Table
                dataSource={indices}
                columns={columns}
                rowKey="id"
                loading={loading}
                pagination={false}
            />
        </div>
    )
}