import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const withAuthentication = (WrappedComponent) => {
  return function WithAuthentication(props) {
    const history = useHistory();
    const [user, setUser] = useState(null);

    useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
          setUser(authUser);
        } else {
          setUser(null);
          history.push('/'); // Redirigir al usuario a la página de inicio de sesión si no está autenticado
        }
      });

      return () => {
        unsubscribe();
      };
    }, [history]);

    return user ? <WrappedComponent user={user} {...props} /> : null;
  };
};

export default withAuthentication;
