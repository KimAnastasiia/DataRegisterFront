import React, { useState, useEffect } from 'react';
import { DatePicker, Button, Table, message, Pagination,Modal   } from 'antd';
import { Indice } from '../Types/Indice';
import type { ColumnsType } from 'antd/es/table';
import { backendUrl } from '../Global';
import { useNavigate } from 'react-router-dom';
import { Jornada } from '../Types/Jornada';

export const ListOfJornadasAcogida: React.FC = () => {

  const { confirm } = Modal;
    const [loading, setLoading] = useState(false);
    const [jornadas, setJornadas] = useState<Jornada[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getJornadas();
      }, []);

    const getJornadas = async () => {

    setLoading(true);

    try {
      const response = await fetch(`${backendUrl}/api/jornadas`);

      if (!response.ok) {
        throw new Error('Error al obtener jornadas');
      }

      const data = await response.json();  // data will now contain { items, total }

      setJornadas(data)
  
    } catch (error) {
      message.error('Error al obtener jornadas.');
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
          const response = await fetch(`http://localhost:8080/api/jornadas/${key}`, {
            method: 'DELETE',
          });
      
          if (response.ok) {
            // Update the local state by filtering out the deleted item
            const newData = jornadas.filter((item) => item.id !== key);
            setJornadas(newData);
      
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
  const columns: ColumnsType<Jornada> = [

    { title: 'Valoracion', dataIndex: 'valoracion', key: 'id'},
    { title: 'Participantes', dataIndex: 'participantes', key: 'id'},
    { title: 'Fecha', dataIndex: 'fecha', key: 'id',
      sorter: (a: any, b: any) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
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
            <h2>List of Jornadas Acogida</h2>
            <Table
                dataSource={jornadas}
                columns={columns}
                rowKey="id"
                loading={loading}
                pagination={false}
            />
        </div>
    )
}