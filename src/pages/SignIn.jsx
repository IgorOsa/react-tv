/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useFormik } from 'formik';
import {
  Col, Container, Form, Row, Button,
} from 'react-bootstrap';
import { login } from '../firebase/auth';

const SignInPage = (props) => {
  const [isLoading, setLoading] = useState(false);

  const routeOnLogin = async (user) => {
    props.history.push(`/profile/${user.uid}`);
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (data) => {
      let user;
      setLoading(true);
      try {
        user = await login(data);
        formik.resetForm();
      } catch (error) {
        console.log(error);
      }

      if (user) {
        routeOnLogin(user);
      } else {
        setLoading(false);
      }
    },
  });

  const loaderStyle = `${isLoading ? 'spinner-border spinner-border-sm ms-2' : ''}`;

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

            <Button variant="primary" className="btn-red" type="submit" style={{ width: '5rem' }} disabled={isLoading}>
              Submit
            </Button>
            <div className={loaderStyle} role="status" aria-hidden="true" />
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignInPage;
