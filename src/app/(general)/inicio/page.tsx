'use client';

import ButtonComponent from '@/src/components/ButtonComponent';
import { Typography, Row, Col, Image, Card, Button } from 'antd';

const { Title, Paragraph } = Typography;

export default function Home() {
  const handleGoBack = () => {
  };
  return (
    <div>
      {/* Bienvenida al Sistema */}
      <Row justify="center" style={{ marginBottom: '70px' , marginTop: '50px'}}>
        <Col xs={24} md={16} lg={12}>
          <Title level={2} style={{ textAlign: 'center' }}>
            Bienvenido a Farmacia Joab - Sistema de Gestión
          </Title>
          <Paragraph style={{
        textAlign: 'center',
        fontSize: '16px',
        backgroundColor: 'rgba(240, 248, 255, 2)',  // Azul pálido con opacidad 0.7
        padding: '10px',
        borderRadius: '8px',
        marginTop: '20px', // Añade margen en la parte superior para separarlo de la imagen
        position: 'relative', // Asegura que el texto se posicione correctamente
        zIndex: 2, // Asegura que el texto esté sobre la imagen
        maxWidth: '80%', // Limita el ancho del parrafo
        margin: '20px auto',
        lineHeight: '1.5'
      }}>
            Joab Pharmacy System es un sistema diseñado para facilitar la gestión de inventarios, ventas, reportes y más. Todo lo que necesitas aprender, ahora al alcance de un clic.
          </Paragraph>
        </Col>
      </Row>

      <Row gutter={[24, 24]} justify="center" style={{margin:50}}>
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Introducción al Sistema"
            hoverable
            cover={<img alt="Introducción al Sistema" src="/tutorial1.png" />}
            actions={[
              <ButtonComponent variant="contained" color="primary" text="Ver Video" onClick={handleGoBack} />
            ]}
          >
            <Paragraph>Descubre cómo iniciar sesión y navegar por el sistema en este breve tutorial.</Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Gestión de Inventarios"
            hoverable
            cover={<img alt="Gestión de Inventarios" src="/tutorial2.png" />}
            actions={[
              <ButtonComponent variant="contained" color="primary" text="Ver Video" onClick={handleGoBack} />
            ]}
          >
            <Paragraph>Aprende cómo gestionar productos e inventarios de manera fácil y rápida.</Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            title="Generación de Reportes"
            hoverable
            cover={<img alt="Generación de Reportes" src="/tutorial3.png" />}
            actions={[
              <ButtonComponent variant="contained" color="primary" text="Ver Video" onClick={handleGoBack} />
            ]}
          >
            <Paragraph>En este tutorial, te enseñamos cómo generar reportes detallados de ventas y productos.</Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
