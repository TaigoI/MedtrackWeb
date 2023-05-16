
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UsersRepository } from '../../modules/authentication/repositories/implementations/UsersRepository';
import { User } from '../../modules/authentication/entities/User';

interface Props {
  user: User | undefined;
  setUser: (_: User | undefined) => void;
}

const AuthenticationContext = createContext({} as Props);

const AuthenticationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const repo = new UsersRepository();
    (async () => {
      try {
        console.log('auth')
        await repo.authenticate({
          password: 'rui123',
          username: '56171542148'
        })
      } catch (err) {
        console.error(err)
      }

    })()
  }, [])

  return (
    <AuthenticationContext.Provider value={{
      user,setUser
    }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

function useAuthentication() {
  return useContext(AuthenticationContext);
}

export { useAuthentication, AuthenticationProvider };