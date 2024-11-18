import React, { useState } from 'react';
import { DatePicker, Button, Table, message, Pagination  } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { backendUrl } from '../Global';
import { GetVisita } from '../Types/GetVisita';

export const GetVisitasComponent: React.FC = () => {
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [visitas, setVisitas] = useState<GetVisita[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalParticipantes, setParticipantes] = useState(0);

  const columns: ColumnsType<GetVisita> = [
    { title: 'ID', dataIndex: 'id', key: 'id',defaultSortOrder: 'ascend', sorter: (a:any, b:any) => a.id - b.id,  },
    { title: 'Colegio', dataIndex: 'colegio', key: 'colegio',  sorter: (a: any, b: any) => a.colegio.localeCompare(b.colegio),},
    { title: 'Fecha', dataIndex: 'fecha', key: 'fecha',
      sorter: (a: any, b: any) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
    },
    { title: `Participantes ( Total: ${totalParticipantes} )` , dataIndex: 'participantes', key: 'participantes',
      sorter: (a:any, b:any) => a.participantes - b.participantes, },
  ];

  const fetchVisitas = async (page: number = 1, size: number = 20) => {
    if (!startDate || !endDate) {
      message.error('Por favor, seleccione ambas fechas.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${backendUrl}/api/visitas/fecha?startDate=${startDate.format('YYYY-MM-DD')}&endDate=${endDate.format('YYYY-MM-DD')}&page=${page}&size=${size}`
      );

      if (!response.ok) {
        throw new Error('Error al obtener visitas');
      }

      const data = await response.json();  // data will now contain { items, total }

      setVisitas(data.items);  // Set the visits data
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
    fetchVisitas(page, pageSize || 20);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Buscar Visitas entre Fechas</h2>
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
        <Button type="primary" onClick={() => fetchVisitas(currentPage, pageSize)} loading={loading}>
          Buscar
        </Button>
      </div>
      <Table
        dataSource={visitas}
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
