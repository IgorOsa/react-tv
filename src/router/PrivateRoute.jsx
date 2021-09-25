/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSession } from '../firebase/UserProvider';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, isAdmin } = useSession();

  return (
    <Route
      {...rest}
      render={(props) => {
        const { id } = props.match.params;

        if (!!user && (user.uid === id || isAdmin)) {
          return <Component {...props} />;
        }
        return <Redirect to="/signin" />;
      }}
    />
  );
};

export default PrivateRoute;
