import React, { useState } from 'react';
import { Visita } from '../Types/Visita'; // Assuming Visita is properly typed in the Types folder
import { Input, Button, Typography, Row, Col, message, Form, DatePicker, notification  } from 'antd';
import { backendUrl } from '../Global';
import { Jornada } from '../Types/Jornada';
import { InnovacionDocente } from '../Types/InnovacionDocente';

export const CreateInnovacionDocente : React.FC = () => {

  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);

    const newInnovacion: InnovacionDocente = {
      porcentajeProfesoresParticipantes: values.porcentajeProfesoresParticipantes,
      fecha: values.fecha.format('YYYY-MM-DD'),
    };
    try {
      const response = await fetch(`${backendUrl}/api/innovacion-docente`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newInnovacion),
      });

      if (response.ok) {
        message.success('Innovacion docente created successfully!');
      } else {
        message.error('There was an error creating the innovacion docente. Please try again.');
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
          Create innovacion docente
        </Typography.Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Porcentaje Profesores Participantes"
                name="porcentajeProfesoresParticipantes"
                rules={[{ required: true, message: 'Please input the porcentaje profesores participantes!' }]}
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
          <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );

};

