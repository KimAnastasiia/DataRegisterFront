import React, { useState } from 'react';
import { Visita } from '../Types/Visita'; // Assuming Visita is properly typed in the Types folder
import { Input, Button, Typography, Row, Col, message, Form, DatePicker, notification  } from 'antd';
import { backendUrl } from '../Global';
import { Actividad } from '../Types/Actividad';

export const CreateActividades : React.FC = () => {

  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);

    const newActividad: Actividad = {
      nombre: values.nombre,
      fecha: values.fecha.format('YYYY-MM-DD'), // Assuming fecha is a moment.js Date object
      participantes: values.participantes,
    };
    try {
      const response = await fetch(`${backendUrl}/api/actividades`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newActividad),
      });

      if (response.ok) {
        message.success('Actividad created successfully!');
      } else {
        message.error('There was an error creating the actividad. Please try again.');
      }
    } catch (error) {
      message.error('Unable to connect to the server. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ padding: '20px', width: '100%', maxWidth: '600px' }}>
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          Create Actividad
        </Typography.Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Nombre"
                name="nombre"
                rules={[{ required: true, message: 'Please input the nombre!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Fecha"
                name="fecha"
                rules={[{ required: true, message: 'Please select the date!' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Participantes"
                name="participantes"
                rules={[{ required: true, message: 'Please input the number of participants!' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );

};

