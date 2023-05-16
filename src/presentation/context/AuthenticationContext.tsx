
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../../modules/authentication/entities/User';
import { authenticateUserUseCase } from '../../modules/authentication/useCases/AuthenticateUserUseCase';

interface Props {
  user: User | undefined;
  setUser: (_: User | undefined) => void;
}

const AuthenticationContext = createContext({} as Props);

const AuthenticationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    (async () => {
      try {
        setUser(await authenticateUserUseCase.execute({
          password: 'rui123',
          username: '56171542148'
        }))
      } catch (err) {
        console.error(err)
      }
    })()
  }, [])

  return (
    <AuthenticationContext.Provider value={{
      user,
      setUser,
    }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

function useAuthentication() {
  return useContext(AuthenticationContext);
}

export { useAuthentication, AuthenticationProvider };