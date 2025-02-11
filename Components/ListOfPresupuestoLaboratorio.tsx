import React, { useState, useEffect } from 'react';
import { DatePicker, Button, Table, message, Pagination,Modal   } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { backendUrl } from '../Global';
import { useNavigate } from 'react-router-dom';
import { PresupuestoLaboratorio } from '../Types/PresupuestoLaboratorio';

export const ListOfPresupuestoLaboratorio: React.FC = () => {

    const { confirm } = Modal;
    const [loading, setLoading] = useState(false);
    const [presupuestos, setPresupuestos] = useState<PresupuestoLaboratorio[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getPresupuestos();
      }, []);

    const getPresupuestos = async () => {

    setLoading(true);

    try {
      const response = await fetch(`${backendUrl}/api/presupuesto-laboratorio`);

      if (!response.ok) {
        throw new Error('Error al obtener presupuestos laboratorios');
      }

      const data = await response.json(); 

      setPresupuestos(data)
  
    } catch (error) {
      message.error('Error al obtener presupuestos laboratorios.');
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
          const response = await fetch(`http://localhost:8080/api/presupuesto-laboratorio/${key}`, {
            method: 'DELETE',
          });
      
          if (response.ok) {
            // Update the local state by filtering out the deleted item
            const newData = presupuestos.filter((item) => item.id !== key);
            setPresupuestos(newData);
      
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
  const columns: ColumnsType<PresupuestoLaboratorio> = [

    { title: 'Presupuesto Total', dataIndex: 'presupuestoTotal', key: 'id'},
    { title: 'Presupuesto Laboratorios', dataIndex: 'presupuestoLaboratorios', key: 'id'},
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
              navigate('/presupuestoLaboratorio/'+record.id);
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
            <h2>List of Presupuesto laboratorio</h2>
            <Table
                dataSource={presupuestos}
                columns={columns}
                rowKey="id"
                loading={loading}
                pagination={false}
            />
        </div>
    )
}