import React from 'react';
import './Hero.scss';
import { Link } from 'react-router-dom';
import HeroImage from '../assets/netflix-hero.jpg';
import Header from './Header';
import { useSession } from '../firebase/UserProvider';

const Hero = () => {
  const { user } = useSession();

  return (
    <div
      className="jumbotron jumbotron-fluid hero-image text-secondary text-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${HeroImage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Header />
      <div className="hero-card text-center">
        <h1 className="hero-card__header display-5 fw-bold text-white">Unlimited movies, TV shows, and more.</h1>
        <div className="col-lg-6 mx-auto">
          <p className="fs-5 mb-4 text-white">Watch anywhere. Cancel anytime.</p>
          {!user && <Link to="/signup" className="me-2"><li className="btn btn-primary btn-red">Sign Up</li></Link>}
        </div>
      </div>
    </div>
  );
};
export default Hero;
