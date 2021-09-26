import React, { useEffect, useState } from 'react';
import {
  Col, Container, Row, Table,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useSession } from '../firebase/UserProvider';
import firestore from '../firebase/config';

const Profile = () => {
  const { user } = useSession();
  const params = useParams();
  const [userDocument, setUserDocument] = useState(null);

  useEffect(() => {
    const docRef = firestore.collection('users').doc(params.id);
    const unsubscribe = docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const documentData = doc.data();
        setUserDocument(documentData);
      }
    });
    return unsubscribe;
  }, [user.uid, params.id]);

  if (!userDocument) {
    return null;
  }

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
                <td>Id</td>
                <td>{userDocument.uid}</td>
              </tr>
              <tr>
                <td>Name</td>
                <td>{userDocument.name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{userDocument.email}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
