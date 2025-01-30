import React, { useState, useEffect } from 'react';
import { DatePicker, Button, Table, message, Pagination,Modal   } from 'antd';
import { Indice } from '../Types/Indice';
import type { ColumnsType } from 'antd/es/table';
import { backendUrl } from '../Global';
import { useNavigate } from 'react-router-dom';

export const ListOfIndices: React.FC = () => {
  const { confirm } = Modal;
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
    const confirmDelete = (key: React.Key) => {
      confirm({
        title: 'Are you sure you want to delete this record?',
        content: 'This action cannot be undone.',
        okText: 'Yes, delete',
        okType: 'danger',
        cancelText: 'Cancel',
        onOk: () => {
          handleDelete(key); // Call delete function
        }
      });
    };
      const handleDelete = async (key: React.Key) => {
        try {
          // Make DELETE request to the backend
          const response = await fetch(`http://localhost:8080/api/indices/${key}`, {
            method: 'DELETE',
          });
      
          if (response.ok) {
            // Update the local state by filtering out the deleted item
            const newData = indices.filter((item) => item.id !== key);
            setIndices(newData);
      
            // Optional: Display a success message
            message.success('Record deleted successfully!');
          } else {
            // Handle failure response
            message.error('Failed to delete the record. Please try again.');
          }
        } catch (error) {
          // Handle network or other errors
          console.error('Error deleting record:', error);
          message.error('An error occurred while deleting the record.');
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
              navigate(`/statistic/${record.fecha_de_inicio}/${record.fecha_de_fin}`)
            }}
            
          >
            Details
          </a>
        ),
      },
      {
        title: '',
        dataIndex: '',
        key: 'x',
        render: (_, record) => (
          <a
            onClick={() => {
              confirmDelete(record.id);
            }}
            style={{ color: 'red' }}
          >
            Delete
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