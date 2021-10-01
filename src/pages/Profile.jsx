import React, { useEffect, useState } from 'react';
import {
  Col, Container, Row, Table,
} from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useSession } from '../firebase/UserProvider';
import firestore from '../firebase/config';
import ShowCard from '../components/ShowCard';
import { selectShows } from '../features/shows/showsSlice';

const Profile = () => {
  const { user } = useSession();
  const params = useParams();
  const [userDocument, setUserDocument] = useState(null);
  const shows = useSelector(selectShows);

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
      <Row className="d-flex justify-content-center mb-4">
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

      <Row className="d-flex justify-content-center">
        <Col className="text-center">
          <h3>Your Favorites</h3>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center mb-4 text-center">
        {userDocument?.favorites?.length > 0
          ? userDocument.favorites.map((id) => {
            const show = shows.filter((item) => parseInt(item.id, 10) === parseInt(id, 10))[0];

            return (
              <Col className="me-2" key={id}>
                <Link to={`/show/${id}`} className="card__link">
                  <ShowCard name={show.name} image={show?.image?.medium} />
                </Link>
              </Col>
            );
          })
          : <div className="text-center">Nothing here yet :)</div>}
      </Row>

      <Row className="d-flex justify-content-center">
        <Col className="text-center">
          <h3>Your Likes</h3>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center mb-4">
        { userDocument.likes && userDocument.likes.length > 0
          ? userDocument.likes.map((el) => (
            <Col className="me-2" key={el}>
              <Link to={`/show/${el}`} className="card__link">
                <ShowCard
                  name={el}
                />
              </Link>
            </Col>
          ))
          : <div className="text-center">{'You don\'t liked any show yet :)'}</div>}
      </Row>
    </Container>
  );
};

export default Profile;
