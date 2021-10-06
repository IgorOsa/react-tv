import React, { useEffect, useState } from 'react';
import {
  Col, Container, Row, Table,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { faHeart, faStar } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { useSession } from '../firebase/UserProvider';
import firestore from '../firebase/config';
import { useGetShowByIdQuery } from '../features/shows/showsAPI';
import Loader from '../components/Loader';
import {
  createShowDocumentAsync, updateShowDataAsync,
} from '../features/shows/showsSlice';

const Show = ({ match }) => {
  const dispatch = useDispatch();
  const { user } = useSession();
  const { id } = match.params;
  const [isLiked, setIsLiked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const { data: show, error, isLoading } = useGetShowByIdQuery(id);
  const [showDocument, setShowDocument] = useState(null);

  useEffect(() => {
    if (user && user.uid != null) {
      const docRef = firestore.collection('users').doc(user.uid);
      const unsubscribe = docRef.onSnapshot((doc) => {
        if (doc.exists) {
          const documentData = doc.data();
          const { favorites, likes } = documentData;
          if (likes?.includes(id)) {
            setIsLiked(true);
          }
          if (favorites?.includes(id)) {
            setIsStarred(true);
          }
        }
      });
      return unsubscribe;
    }
    return null;
  }, [user]);

  useEffect(async () => {
    const docRef = await firestore.collection('shows').doc(id);
    const unsubscribe = docRef.onSnapshot((doc) => {
      if (doc.exists) {
        const showData = doc.data();
        setShowDocument(showData);
      } else if (user && user.uid != null) {
        // No doc found, need to create
        dispatch(createShowDocumentAsync(id));
      }
    });
    return unsubscribe;
  }, [id]);

  const handleLike = async () => {
    if (user && user.uid != null) {
      setIsLiked(!isLiked);

      const docRef = firestore.collection('users').doc(user.uid);
      const userData = await docRef.get();
      let { likes } = userData.data();
      const updated = likes.filter((el) => el !== id);
      let likeUpdate = 0;

      if (!isLiked) {
        likeUpdate = showDocument.likes > 0 ? showDocument.likes + 1 : 1;
        likes = [id, ...updated];
      } else {
        likeUpdate = showDocument.likes > 0 ? showDocument.likes - 1 : 0;
        likes = updated;
      }

      await docRef.update({ likes });

      dispatch(updateShowDataAsync({ id, update: { likes: likeUpdate } }));
    }
  };

  const handleStar = async () => {
    if (user && user.uid != null) {
      setIsStarred(!isStarred);
      const docRef = firestore.collection('users').doc(user.uid);
      const userData = await docRef.get();
      let { favorites } = userData.data();
      const updatedFavs = favorites.filter((el) => el !== id);

      favorites = !isStarred ? [id, ...updatedFavs] : updatedFavs;

      await docRef.update({ favorites });
    }
  };

  return (
    <Container className="pb-5">
      {isLoading && <Loader /> }
      {error && 'Error' }
      {show && (
      <>
        <Row>
          <Col className="text-center pt-4 pb-2">
            <h2>
              {show.name}
            </h2>
          </Col>
        </Row>
        <Row>
          <img
            className="col-12 col-md-5 col-lg-4 col-xl-4 align-self-center mb-2"
            src={show?.image?.original}
            alt={show?.name}
          />
          <Col className="col-12 col-md-7 col-lg-7 col-xl-8">
            <p>{show?.summary?.replace(/<\/?[^>]+(>|$)/g, '')}</p>
            <h3>Show info</h3>
            <Table striped bordered hover variant="dark">
              <tbody>
                <tr>
                  <th>Type</th>
                  <td>{show?.type}</td>
                </tr>
                <tr>
                  <th>Language</th>
                  <td>{show?.language}</td>
                </tr>
                <tr>
                  <th>Genres</th>
                  <td>{show?.genres?.join(', ')}</td>
                </tr>
                <tr>
                  <th>Status</th>
                  <td>{show?.status}</td>
                </tr>
                <tr>
                  <th>Official site</th>
                  <td><a href={show?.officialSite} target="_blank" rel="noreferrer">{show?.officialSite}</a></td>
                </tr>
                <tr>
                  <th>Average rating</th>
                  <td>{show?.rating?.average}</td>
                </tr>
                <tr>
                  <th>Network</th>
                  <td>{show?.network?.name}</td>
                </tr>
              </tbody>
            </Table>
            <Row>
              <Col className="d-flex align-items-center">
                {user && user.uid
                && (
                <button type="button" onClick={handleStar} className="btn__star me-3" disabled={!user}>
                  { !isStarred
                    ? (
                      <FontAwesomeIcon
                        icon={faStar}
                        size="2x"
                        className="d-flex color-red"
                        alt="Like"
                        title="Add to Favorites"
                      />
                    )
                    : (
                      <FontAwesomeIcon
                        icon={faStarSolid}
                        size="2x"
                        className="d-flex color-red"
                        alt="UnLike"
                        title="Remove from Favorites"
                      />
                    )}
                </button>
                )}
                <button type="button" onClick={handleLike} className="btn__like me-2" disabled={!user}>
                  { !isLiked
                    ? (
                      <FontAwesomeIcon
                        icon={faHeart}
                        size="2x"
                        className="d-flex color-red"
                        alt="Like"
                        title={user ? 'Like' : 'Please, sign-in to like :)'}
                      />
                    )
                    : (
                      <FontAwesomeIcon
                        icon={faHeartSolid}
                        size="2x"
                        className="d-flex color-red"
                        alt="UnLike"
                        title="UnLike"
                      />
                    )}
                </button>
                <div className="me-2">{showDocument?.likes || 0}</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
      )}
    </Container>
  );
};

Show.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Show;
