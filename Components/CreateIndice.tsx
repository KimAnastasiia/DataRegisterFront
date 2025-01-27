import React, { useState } from 'react';
import { Input, Button, Typography, Row, Col, message, Form, DatePicker, notification  } from 'antd';
import { backendUrl } from '../Global';
import { Indice } from '../Types/Indice';

export const CreateIndice: React.FC = () => {

    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {

      setLoading(true);
  
      const newIndice: Indice = {

        fecha_de_fin: values.fecha_de_fin.format('YYYY-MM-DD'),
        fecha_de_inicio: values.fecha_de_inicio.format('YYYY-MM-DD'), // Assuming fecha is a moment.js Date object
        nombre: values.nombre,

      };

      try {
        const response = await fetch(`${backendUrl}/api/indices`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newIndice),
        });
  
        if (response.ok) {
          message.success('Indice created successfully!');
        } else {
          message.error('There was an error creating the indice. Please try again.');
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
            Create Indice
          </Typography.Title>
          <Form layout="vertical" onFinish={onFinish}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Fecha de inicio"
                  name="fecha_de_inicio"
                  rules={[{ required: true, message: 'Please input the Fecha de inicio   !' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Fecha de fin"
                  name="fecha_de_fin"
                  rules={[{ required: true, message: 'Please select the Fecha de fin!' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
            </Row>
  
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Nombre"
                  name="nombre"
                  rules={[{ required: true, message: 'Please input the nombre   !' }]}
                >
                  <Input />
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
  
}