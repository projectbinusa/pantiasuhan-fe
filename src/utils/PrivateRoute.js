import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const FIVE_HOURS = 5 * 60 * 60 * 1000; // 5 jam dalam milidetik
      const timeout = setTimeout(() => {
        localStorage.removeItem('token');
        window.location.href = "/login";
      }, FIVE_HOURS);

      return () => clearTimeout(timeout); // Bersihkan timeout jika komponen di-unmount
    }
  }, [token]);

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
