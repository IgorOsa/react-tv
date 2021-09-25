/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Profile = () => {
//   const { user } = useSession();
  let user;

  return (
    <Container className="pb-5">
      <Row>
        <Col className="text-center pt-4 pb-2">
          <h2>Your profile </h2>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col className="col-6" />
      </Row>
    </Container>
  );
};

export default Profile;
