import React, { useState, useEffect } from 'react';
import { Input, Button, Typography, Row, Col, message, Form, DatePicker  } from 'antd';
import { backendUrl } from '../Global';
import { PresupuestoLaboratorio } from '../Types/PresupuestoLaboratorio';
import { useParams } from "react-router-dom";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { OrientacionCurricular } from '../Types/OrientacionCurricular';

export const EditOrientacionCurricular : React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [orientacion, setOrientacion] = useState<OrientacionCurricular>();
    const [form] = Form.useForm(); // Create form instance
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
      getOrientacionCurricularById(id);
    }, []);

   const getOrientacionCurricularById = async (id : any) => {

         try {
              const response = await fetch(`${backendUrl}/api/orientaciones/`+id);
        
              if (!response.ok) {
                throw new Error('Error al obtener Orientacion Curricular');
              }
        
              const data = await response.json(); 
        
              setOrientacion(data)

              form.setFieldsValue({
                titulo: data.titulo,
                numParticipantes: data.numParticipantes,
                fecha: data.fecha ? moment(data.fecha) : null, // Convert date to moment
              });

            } catch (error) {
              message.error('Error al obtener Orientacion Curricular.');
              console.error(error);
            } finally {
              setLoading(false);
            }
    };

    const onFinish = async (values: any) => {
        try {
          setLoading(true);
    
          // Convert fecha (DatePicker) to ISO format before sending
          const updatedData = {
            ...values,
            fecha: values.fecha ? values.fecha.toISOString() : null,
          };
    
          const response = await fetch(`${backendUrl}/api/orientaciones/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
          });
    
          if (!response.ok) {
            throw new Error('Error al actualizar Orientacion Curricular');
          }
    
         message.success('Orientacion Curricular actualizado correctamente');
        
    
        } catch (error) {
          message.error('Error al actualizar Orientacion Curricular.');
          console.error(error);
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
          Edit Orientacion Curricular
        </Typography.Title>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="titulo"
                name="titulo"
                rules={[{ required: true, message: 'Please input titulo!' }]}
              >
                <Input value={orientacion?.titulo}  />
              </Form.Item>
            </Col>
            <Col span={12}>
            
              <Form.Item
                label="Number of Participantes"
                name="numParticipantes"
                rules={[{ required: true, message: 'Please input the number of participantes!' }]}
              >
                <Input value={orientacion?.numParticipantes} type="number" />
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
                <DatePicker value={orientacion?.fecha}  style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
          Update Orientacion Curricular
          </Button>
        </Form>
      </div>
    </div>
  );

};

