import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ component: Component, ...rest }) => {
  // const token = localStorage.getItem('token');

  // useEffect(() => {
  //   if (token) {
  //     const FIVE_HOURS = 5 * 60 * 60 * 1000; // 5 jam dalam milidetik
  //     const timeout = setTimeout(() => {
  //       localStorage.removeItem('token');
  //       window.location.href = "/login";
  //     }, FIVE_HOURS);

  //     return () => clearTimeout(timeout);
  //   }
  // }, [token]);

  // return (
  //   <Route
  //     {...rest}
  //     render={(props) =>
  //       token ? <Component {...props} /> : <Redirect to="/login" />
  //     }
  //   />
  // );

  const isLoggedIn = localStorage.getItem("tokenpython");

  const isTokenValid = (token) => {
    if (!token) return false;

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn && isTokenValid(isLoggedIn) ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
