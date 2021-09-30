import React, { useEffect, useState } from 'react';
import {
  Col, Container, Row, Table,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { faHeart, faStar } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fetchShowByIdAsync, selectCurrentShow } from '../features/shows/showsSlice';
import { useSession } from '../firebase/UserProvider';
import firestore from '../firebase/config';

const Show = ({ match }) => {
  const { user } = useSession();
  const { id } = match.params;
  const dispatch = useDispatch();
  const show = useSelector(selectCurrentShow);
  const [isLiked, setIsLiked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
    if (user && user.uid != null) {
      const docRef = firestore.collection('users').doc(user.uid);
      const unsubscribe = docRef.onSnapshot((doc) => {
        if (doc.exists) {
          const documentData = doc.data();
          const { favorites, likes } = documentData;
          if (likes.includes(id)) {
            setIsLiked(true);
          }
          if (favorites.includes(id)) {
            setIsStarred(true);
          }
        }
      });
      return unsubscribe;
    }
    return null;
  }, [user]);

  useEffect(() => {
    dispatch(fetchShowByIdAsync(id));
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
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
          src={show.image && show.image.original}
          alt={show.name}
        />
        <Col className="col-12 col-md-7 col-lg-7 col-xl-8">
          <p>{show && show.summary && show.summary.replace(/<\/?[^>]+(>|$)/g, '')}</p>
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
          <button type="button" onClick={handleLike} className="btn__like me-3" disabled={!user}>
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
          {user && user.uid
                && (
                <button type="button" onClick={handleStar} className="btn__star" disabled={!user}>
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
        </Col>
      </Row>
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
