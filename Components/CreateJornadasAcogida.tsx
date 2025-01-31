import React, { useState } from 'react';
import { Visita } from '../Types/Visita'; // Assuming Visita is properly typed in the Types folder
import { Input, Button, Typography, Row, Col, message, Form, DatePicker, notification  } from 'antd';
import { backendUrl } from '../Global';
import { Jornada } from '../Types/Jornada';

export const CreateJornadasAcogida : React.FC = () => {

  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);

    const newJornada: Jornada = {
      valoracion: values.valoracion,
      fecha: values.fecha.format('YYYY-MM-DD'), 
      participantes: values.participantes,
    };
    try {
      const response = await fetch(`${backendUrl}/api/jornadas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJornada),
      });

      if (response.ok) {
        message.success('Jornada created successfully!');
      } else {
        message.error('There was an error creating the jornada. Please try again.');
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
          Create Jornada
        </Typography.Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Valoracion"
                name="valoracion"
                rules={[{ required: true, message: 'Please input the valoracion!' }]}
              >
               <Input type="number" />
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

