import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../firebase/auth';
import { useSession } from '../firebase/UserProvider';
import './NavBar.scss';

const NavBar = () => {
  const history = useHistory();
  const { user } = useSession();

  const logoutUser = async () => {
    await logout();
    history.push('/signin');
  };

  return (
    <nav className="header__nav">
      <ul className="navbar">
        {!!user && (
        <Link to={`/profile/${user.uid}`}>
          <FontAwesomeIcon icon={faUserCircle} size="2x" className="d-flex me-2 color-red" />
        </Link>
        ) }
        {!user && <Link to="/signin"><li className="btn btn-primary btn-red">Sign In</li></Link>}
        {!!user && (
        <button type="button" className="btn btn-primary btn-red" onClick={logoutUser}>
          Logout
        </button>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
