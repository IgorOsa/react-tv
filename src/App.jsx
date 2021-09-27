import React from 'react';
import './firebase/config';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import NotFound from './pages/NotFound';
import Hero from './components/Hero';
import Show from './pages/Show';
import Profile from './pages/Profile';
import { UserProvider } from './firebase/UserProvider';
import PrivateRoute from './router/PrivateRoute';
import ProfileRedirect from './router/ProfileRedirect';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App bg-dark text-white">
          <Hero />
          <Switch>
            <Route path="/" component={Home} exact />
            <PrivateRoute exact path="/profile/:id" component={Profile} />
            <ProfileRedirect exact path="/signup" component={SignUpPage} />
            <ProfileRedirect exact path="/signin" component={SignInPage} />
            <Route path="/show/:id" component={Show} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
