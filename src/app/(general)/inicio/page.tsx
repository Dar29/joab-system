'use client';

import ButtonComponent from '@/src/components/ButtonComponent';
import { Typography, Row, Col, Card, Button } from 'antd';

const { Title, Paragraph } = Typography;

export default function Home() {
  const handleGoBack = () => {
    // Aquí irá la lógica para ver el video o redireccionar
  };

  return (
    <div>
      {/* Bienvenida al Sistema */}
      <Row justify="center" style={{ marginBottom: '30px', marginTop: '50px' }}>
        <Col xs={24} md={16} lg={12}>
          <Title level={2} style={{ textAlign: 'center' }}>
            Bienvenido a Farmacia Joab - Sistema de Gestión
          </Title>
          <Paragraph
            style={{
              textAlign: 'center',
              fontSize: '16px',
              backgroundColor: '#e6f7ff',
              padding: '16px 24px',
              borderRadius: '10px',
              border: '1px solid #91d5ff',
              marginTop: '20px',
              maxWidth: '85%',
              margin: '20px auto',
              lineHeight: '1.6',
              color: '#444',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            Joab Pharmacy System es un sistema diseñado para facilitar la gestión de inventarios, ventas, reportes y más. Todo lo que necesitas aprender, ahora al alcance de un clic.
          </Paragraph>
        </Col>
      </Row>

      {/* Cards con videos/tutoriales */}
      <Row gutter={[24, 24]} justify="center" style={{ margin: 30 }}>
        <Col xs={24} sm={12} md={8}>
          <Card
            title={<span style={{ fontSize: '16px' }}>Introducción al Sistema</span>}
            hoverable
            style={{ height: 320 }}
            cover={
              <img
                alt="Introducción al Sistema"
                src="https://cdn-icons-png.flaticon.com/512/3566/3566340.png"
                style={{ height: 140, objectFit: 'contain', padding: 8 }}
              />
            }
            actions={[
              <ButtonComponent
                key="intro"
                variant="outlined"
                color="primary"
                text="Ver Video"
                onClick={handleGoBack}
              />,
            ]}
          >
            <Paragraph style={{ fontSize: '14px', margin: 0 }}>
              Descubre cómo iniciar sesión y navegar por el sistema en este breve tutorial.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            title={<span style={{ fontSize: '16px' }}>Gestión de Inventarios</span>}
            hoverable
            style={{ height: 320 }}
            cover={
              <img
                alt="Gestión de Inventarios"
                src="https://cdn-icons-png.flaticon.com/512/4072/4072533.png"
                style={{ height: 140, objectFit: 'contain', padding: 8 }}
              />
            }
            actions={[
              <ButtonComponent
                key="inventario"
                variant="outlined"
                color="primary"
                text="Ver Video"
                onClick={handleGoBack}
              />,
            ]}
          >
            <Paragraph style={{ fontSize: '14px', margin: 0 }}>
              Aprende cómo gestionar productos e inventarios de manera fácil y rápida.
            </Paragraph>
          </Card>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <Card
            title={<span style={{ fontSize: '16px' }}>Generación de Reportes</span>}
            hoverable
            style={{ height: 320 }}
            cover={
              <img
                alt="Generación de Reportes"
                src="https://cdn-icons-png.flaticon.com/512/3791/3791527.png"
                style={{ height: 140, objectFit: 'contain', padding: 8 }}
              />
            }
            actions={[
              <ButtonComponent
                key="reportes"
                variant="outlined"
                color="primary"
                text="Ver Video"
                onClick={handleGoBack}
              />,
            ]}
          >
            <Paragraph style={{ fontSize: '14px', margin: 0 }}>
              En este tutorial, te enseñamos cómo generar reportes detallados de ventas y productos.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
