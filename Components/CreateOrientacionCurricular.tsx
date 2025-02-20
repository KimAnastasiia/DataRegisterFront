import React, { useState } from 'react';
import { Input, Button, Typography, Row, Col, message, Form, DatePicker  } from 'antd';
import { backendUrl } from '../Global';
import { PresupuestoLaboratorio } from '../Types/PresupuestoLaboratorio';
import { OrientacionCurricular } from '../Types/OrientacionCurricular';
import { useNavigate } from 'react-router-dom';
export const CreateOrientacionCurricular : React.FC = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    setLoading(true);

    const newOrientacionCurricular: OrientacionCurricular = {
      numParticipantes: values.numParticipantes,
      fecha: values.fecha.format('YYYY-MM-DD'), // Assuming fecha is a moment.js Date object
      titulo: values.titulo,
    };
    try {
      const response = await fetch(`${backendUrl}/api/orientaciones`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrientacionCurricular),
      });

      if (response.ok) {
        message.success('Orientacion created successfully!');
      } else {
        message.error('There was an error creating the Orientacion. Please try again.');
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
          Create Orientacion
        </Typography.Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Titulo"
                name="titulo"
                rules={[{ required: true, message: 'Please input the titulo!' }]}
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Number of Participantes"
                name="numParticipantes"
                rules={[{ required: true, message: 'Please input the number of num of Participantes!' }]}
              >
                <Input type="number" />
              </Form.Item>
            </Col>
            
          </Row>

          <Row gutter={16}>
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

          <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );

};

