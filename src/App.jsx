import React, { Suspense, useEffect, useState } from 'react';
import './firebase/config';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
import Footer from './components/Footer';
import Loader from './components/Loader';
import { selectIsLoadingSearch } from './features/search/searchSlice';
import { fetchShowsAsync, selectIsLoadingShows } from './features/shows/showsSlice';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const isLoadingSearch = useSelector(selectIsLoadingSearch);
  const isLoadingShows = useSelector(selectIsLoadingShows);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchShowsAsync());
  }, []);

  useEffect(() => {
    if (!isLoadingSearch && !isLoadingShows) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [isLoadingSearch, isLoadingShows]);

  return (
    <UserProvider>
      <Router>
        <Suspense fallback={<Loader />}>
          <div className="App bg-dark text-white">
            {isLoading && <Loader /> }
            <Hero />
            <main className="main">
              <Switch>
                <Route path="/" component={Home} exact />
                <PrivateRoute exact path="/profile/:id" component={Profile} />
                <ProfileRedirect exact path="/signup" component={SignUpPage} />
                <ProfileRedirect exact path="/signin" component={SignInPage} />
                <Route path="/show/:id" component={Show} />
                <Route component={NotFound} />
              </Switch>
            </main>
            <Footer />
          </div>
        </Suspense>
      </Router>
    </UserProvider>
  );
}

export default App;
