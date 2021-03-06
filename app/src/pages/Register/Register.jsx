import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card, Col, Container, Image, Row,
} from 'react-bootstrap';

import FormLogin from './components/Form/Form';

import regImg from '../../assets/img/reg.jpg';

import useAuth from '../../hooks/useAuth';
import routes from '../../routes/routes';

const Register = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { homePage, signupPath } = routes;

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12" md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col className="col-12 d-flex align-items-center justify-content-center" md={6}>
                <Image className="rounded-circle" src={regImg} alt="Enter" />
              </Col>
              <FormLogin
                auth={auth}
                signupPath={signupPath}
                navigate={navigate}
                redirectPath={homePage()}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
