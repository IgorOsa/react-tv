import React from 'react';
import { useFormik } from 'formik';
import {
  Col, Container, Form, Row, Button,
} from 'react-bootstrap';

const SignInPage = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Container className="pb-5">
      <Row>
        <Col className="text-center pt-4 pb-2">
          <h2>Sign In</h2>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col className="col-6">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInPage;
