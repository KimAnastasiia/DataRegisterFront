import React, { useState, useEffect } from 'react';
import { Input, Button, Typography, Row, Col, message, Form, DatePicker  } from 'antd';
import { backendUrl } from '../Global';
import { PresupuestoLaboratorio } from '../Types/PresupuestoLaboratorio';
import { useParams } from "react-router-dom";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { InnovacionDocente } from '../Types/InnovacionDocente';

export const EditInnovacionDocente : React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [inovacion, setInovacion] = useState<InnovacionDocente>();
    const [form] = Form.useForm(); // Create form instance
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        getInnovacionById(id);
    }, []);

   const getInnovacionById = async (id : any) => {

         try {
              const response = await fetch(`${backendUrl}/api/innovacion-docente/`+id);
        
              if (!response.ok) {
                throw new Error('Error al obtener innovacion docente');
              }
        
              const data = await response.json(); 
        
              setInovacion(data)

              form.setFieldsValue({
                porcentajeProfesoresParticipantes: data.porcentajeProfesoresParticipantes,
                fecha: data.fecha ? moment(data.fecha) : null, // Convert date to moment
              });
            } catch (error) {
              message.error('Error al obtener innovacion docente.');
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
    
          const response = await fetch(`${backendUrl}/api/innovacion-docente/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
          });
    
          if (!response.ok) {
            throw new Error('Error al actualizar innovacion docente');
          }
    
         message.success('Presupuesto actualizado correctamente');
        
    
        } catch (error) {
          message.error('Error al actualizar innovacion docente.');
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
          Edit Innovacion docente
        </Typography.Title>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Porcentaje profesores participantes"
                name="porcentajeProfesoresParticipantes"
                rules={[{ required: true, message: 'Please input the porcentaje profesores participantes!' }]}
              >
                    <Input value={inovacion?.porcentajeProfesoresParticipantes} type="number" />
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
                <DatePicker value={inovacion?.fecha}  style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
          Update innovacion docente
          </Button>
        </Form>
      </div>
    </div>
  );

};

