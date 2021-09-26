/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import {
  Col, Container, Row, Table,
} from 'react-bootstrap';
import { useSession } from '../firebase/UserProvider';

const Profile = () => {
  const { user } = useSession();

  return (
    <Container className="pb-5">
      <Row>
        <Col className="text-center pt-4 pb-2">
          <h2>Your profile </h2>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col className="col-6">
          <Table striped bordered hover variant="dark">
            <tbody>
              <tr>
                <td>id</td>
                <td>{user.uid}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{user.displayName}</td>
              </tr>
              <tr>
                <td>email</td>
                <td>{user.email}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
