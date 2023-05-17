import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '../../modules/authentication/entities/User';
import { authenticateUserUseCase } from '../../modules/authentication/useCases/AuthenticateUserUseCase';
import { IAuthenticationDTO } from '../../modules/authentication/dtos/IAuthenticationDTO';
import { NavigateOptions, To } from 'react-router-dom';
import Cookies from 'js-cookie';

interface Props {
  user: User | undefined;
  setUser: (_: User | undefined) => void;
  authenticate: (params: IAuthenticationDTO, persist: boolean) => Promise<User>;
  logout: (navigate: (to: To, options?: NavigateOptions | undefined) => void) => void;
}

const AuthenticationContext = createContext({} as Props);

const AuthenticationProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User>();


  async function authenticate(params: IAuthenticationDTO, persist: boolean): Promise<User> {
    const _user = await authenticateUserUseCase.execute(params);
    setUser(_user);
    if (persist) {
      localStorage.setItem("user",JSON.stringify(_user));
    }
    return _user;
  }

  async function logout(navigate: (to: To, options?: NavigateOptions | undefined) => void) {
    setUser(undefined);
    Cookies.remove('accessToken');
    localStorage.removeItem('user')
    navigate('/');
  }

  function bootstrap() {
    if (window.location.href.match('app') && !user) {
      const rawUser = localStorage.getItem("user");
      console.log('rawUser ', rawUser)
      const accessToken = Cookies.get('accessToken');
      console.log('accessToken ', accessToken)
      if (!rawUser || !accessToken) return window.location.replace("/");
      setUser(JSON.parse(rawUser));
    } 
  }

  useEffect(() => {
    bootstrap();
  }, []);

  return (
    <AuthenticationContext.Provider value={{
      user,
      setUser,
      authenticate,
      logout
    }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

function useAuthentication() {
  return useContext(AuthenticationContext);
}

export { useAuthentication, AuthenticationProvider };