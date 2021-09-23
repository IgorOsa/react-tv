import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import NotFoundPage from './pages/NotFoundPage';
// import Header from './components/Header';
import Hero from './components/Hero';
import ShowPage from './pages/ShowPage';

function App() {
  return (
    <Router>
      <div className="App bg-dark text-white">
        <Hero />
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/sign-in" component={SignInPage} />
          <Route path="/sign-up" component={SignUpPage} />
          <Route path="/show/:id" component={ShowPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
