import React, { useState } from 'react';
import { DatePicker, Button, Table, message, Pagination,Modal   } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { backendUrl } from '../Global';
import { GetVisita } from '../Types/GetVisita';

export const GetActividades: React.FC = () => {
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [actividades, setActividades] = useState<GetVisita[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalParticipantes, setParticipantes] = useState(0);
  const { confirm } = Modal;

  const handleDelete = async (key: React.Key) => {
    try {
      // Make DELETE request to the backend
      const response = await fetch(`http://localhost:8080/api/actividades/${key}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Update the local state by filtering out the deleted item
        const newData = actividades.filter((item) => item.id !== key);
        setActividades(newData);
  
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


  
  const columns: ColumnsType<GetVisita> = [
    { title: 'ID', dataIndex: 'id', key: 'id',defaultSortOrder: 'ascend', sorter: (a:any, b:any) => a.id - b.id,  },
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre',  sorter: (a: any, b: any) => a.colegio.localeCompare(b.colegio),},
    { title: 'Fecha', dataIndex: 'fecha', key: 'fecha',
      sorter: (a: any, b: any) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
    },
    { title: `Participantes ( Total: ${totalParticipantes} )` , dataIndex: 'participantes', key: 'participantes',
      sorter: (a:any, b:any) => a.participantes - b.participantes, },
      {
        title: 'Action',
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
  
  const fetchActividades = async (page: number = 1, size: number = 20) => {

    if (!startDate || !endDate) {
      message.error('Por favor, seleccione ambas fechas.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${backendUrl}/api/actividades/fecha?startDate=${startDate.format('YYYY-MM-DD')}&endDate=${endDate.format('YYYY-MM-DD')}&page=${page}&size=${size}`
      );

      if (!response.ok) {
        throw new Error('Error al obtener actividades');
      }

      const data = await response.json();  // data will now contain { items, total }

      setActividades(data.items);  // Set the visits data
      setTotalItems(data.total);  // Set the total count
      const total = data.items.reduce((sum:any, item:any) => sum + (item.participantes || 0), 0);
      setParticipantes(total);
      
    } catch (error) {
      message.error('Error al obtener visitas.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaginationChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    setPageSize(pageSize || 20);
    fetchActividades(page, pageSize || 20);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Buscar Actividades entre Fechas</h2>
      <div style={{ marginBottom: '20px' }}>
        <DatePicker
          placeholder="Fecha de inicio"
          onChange={(date) => setStartDate(date)}
          style={{ marginRight: '10px' }}
        />
        <DatePicker
          placeholder="Fecha de fin"
          onChange={(date) => setEndDate(date)}
          style={{ marginRight: '10px' }}
        />
        <Button type="primary" onClick={() => fetchActividades(currentPage, pageSize)} loading={loading}>
          Buscar
        </Button>
      </div>
      <Table
        dataSource={actividades}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={false}
      />
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <Pagination
          total={totalItems}
          showTotal={(total) => `Total ${total} items`}
          defaultPageSize={20}
          defaultCurrent={1}
          current={currentPage}
          pageSize={pageSize}
          onChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};
