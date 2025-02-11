import React, { useState, useEffect } from 'react';
import { Input, Button, Typography, Row, Col, message, Form, DatePicker  } from 'antd';
import { backendUrl } from '../Global';
import { PresupuestoLaboratorio } from '../Types/PresupuestoLaboratorio';
import { useParams } from "react-router-dom";
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

export const EditPresupuestoLaboratorio : React.FC = () => {

    const [loading, setLoading] = useState(false);
    const [presupuesto, setPresupuesto] = useState<PresupuestoLaboratorio>();
    const [form] = Form.useForm(); // Create form instance
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        getPresupuestoById(id);
    }, []);

   const getPresupuestoById = async (id : any) => {

         try {
              const response = await fetch(`${backendUrl}/api/presupuesto-laboratorio/`+id);
        
              if (!response.ok) {
                throw new Error('Error al obtener presupuesto laboratorio');
              }
        
              const data = await response.json(); 
        
              setPresupuesto(data)
              form.setFieldsValue({
                presupuestoLaboratorios: data.presupuestoLaboratorios,
                presupuestoTotal: data.presupuestoTotal,
                fecha: data.fecha ? moment(data.fecha) : null, // Convert date to moment
              });
            } catch (error) {
              message.error('Error al obtener presupuesto laboratorio.');
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
    
          const response = await fetch(`${backendUrl}/api/presupuesto-laboratorio/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
          });
    
          if (!response.ok) {
            throw new Error('Error al actualizar presupuesto laboratorio');
          }
    
         message.success('Presupuesto actualizado correctamente');
        
    
        } catch (error) {
          message.error('Error al actualizar presupuesto laboratorio.');
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
          Edit Presupuesto
        </Typography.Title>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Presupuesto Laboratorios"
                name="presupuestoLaboratorios"
                rules={[{ required: true, message: 'Please input the presupuestoLaboratorios!' }]}
              >
                    <Input value={presupuesto?.presupuestoLaboratorios} type="number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Presupuesto Total"
                name="presupuestoTotal"
                rules={[{ required: true, message: 'Please input the number of presupuestoTotal!' }]}
              >
                <Input value={presupuesto?.presupuestoTotal} type="number" />
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
                <DatePicker value={presupuesto?.fecha}  style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
          Update Presupuesto
          </Button>
        </Form>
      </div>
    </div>
  );

};

