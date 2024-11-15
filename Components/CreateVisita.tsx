import React, { useState } from 'react';
import { Visita } from '../Types/Visita'; // Assuming Visita is properly typed in the Types folder
import { Input, Button, Typography, Row, Col, Form, DatePicker, notification  } from 'antd';
import { backendUrl } from '../Global';

export const CreateVisita : React.FC = () => {

  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);

    const newVisita: Visita = {
      colegio: values.colegio,
      fecha: values.fecha.format('YYYY-MM-DD'), // Assuming fecha is a moment.js Date object
      participantes: values.participantes,
    };
    try {
      const response = await fetch(`${backendUrl}/api/visitas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newVisita),
      });

      if (response.ok) {
        notification.success({
          message: 'Success',
          description: 'Visita created successfully!',
        });
      } else {
        notification.error({
          message: 'Error',
          description: 'There was an error creating the visita. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error creating visita:', error);
      notification.error({
        message: 'Network Error',
        description: 'Unable to connect to the server. Please check your connection.',
      });
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
          Create Visita
        </Typography.Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Colegio"
                name="colegio"
                rules={[{ required: true, message: 'Please input the colegio!' }]}
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

