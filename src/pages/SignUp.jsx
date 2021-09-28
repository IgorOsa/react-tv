/* eslint-disable no-unused-vars */
import { useFormik } from 'formik';
import React, { useState } from 'react';
import {
  Col, Container, Form, Row, Button,
} from 'react-bootstrap';
import { signup } from '../firebase/auth';

const SignUpPage = (props) => {
  const [isLoading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      let newUser;
      setLoading(true);
      try {
        newUser = await signup(values);
        formik.resetForm();
      } catch (error) {
        alert(error.message);
      }
      // alert(JSON.stringify(values, null, 2));
      if (newUser) {
        // eslint-disable-next-line react/prop-types
        props.history.push(`/profile/${newUser.uid}`);
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
          <h2>Sign Up</h2>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col className="col-6">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Your name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <Form.Text className="text-muted">
                We`ll never share your email with anyone else.
              </Form.Text>
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

export default SignUpPage;
