import React, { useState, useEffect } from 'react';
import { DatePicker, Button, Table, message, Pagination,Modal   } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { backendUrl } from '../Global';
import { useNavigate } from 'react-router-dom';
import { InnovacionDocente } from '../Types/InnovacionDocente';

export const ListOfInnovacionesDocentes: React.FC = () => {

    const { confirm } = Modal;
    const [loading, setLoading] = useState(false);
    const [innovaciones, setInnovaciones] = useState<InnovacionDocente[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getInnovaciones();
      }, []);

    const getInnovaciones = async () => {

    setLoading(true);

    try {
      const response = await fetch(`${backendUrl}/api/innovacion-docente`);

      if (!response.ok) {
        throw new Error('Error al obtener innovaciones docentes');
      }

      const data = await response.json(); 

      setInnovaciones(data)
  
    } catch (error) {
      message.error('Error al obtener innovaciones docentes.');
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
          handleDelete(key); 
        }
      });
    };
      const handleDelete = async (key: React.Key) => {
        try {
          // Make DELETE request to the backend
          const response = await fetch(`http://localhost:8080/api/innovacion-docente/${key}`, {
            method: 'DELETE',
          });
      
          if (response.ok) {
            // Update the local state by filtering out the deleted item
            const newData = innovaciones.filter((item) => item.id !== key);
            setInnovaciones(newData);
      
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
  const columns: ColumnsType<InnovacionDocente> = [

    { title: 'Porcentaje Profesores Participantes', dataIndex: 'porcentajeProfesoresParticipantes', key: 'id'},
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
      {
        title: '',
        dataIndex: '',
        key: 'x',
        render: (_, record) => (
          <a
            onClick={() => {
              navigate('/innovacion-docente/'+record.id);
            }}
            style={{ color: 'green' }}
          >
            Edit
          </a>
        ),
      },
  ];
    return (
        <div style={{ padding: '20px' }}>
            <h2>List of Innovaciones Docentes</h2>
            <Table
                dataSource={innovaciones}
                columns={columns}
                rowKey="id"
                loading={loading}
                pagination={false}
            />
        </div>
    )
}