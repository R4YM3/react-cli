import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import {getTimestamp} from '../helpers/time';
import {getBrowserName, getPlatformName} from '../helpers/client';

export interface IUser {
  as: string;
  city: string;
  country: string;
  countryCode: string;
  error: boolean;
  isp: string;
  lat: string;
  lon: string;
  org: string;
  pending: boolean;
  pristine: boolean;
  query: string;
  region: string;
  regionName: string;
  status: string;
  timezone: string;
  zip: string;
  created: number;
  platformName: string;
  browserName: string;
}

const defaultState = {
  as: '',
  city: '',
  country: '',
  countryCode: '',
  error: false,
  isp: '',
  lat: '',
  lon: '',
  org: '',
  pending: false,
  pristine: true,
  query: '',
  region: '',
  regionName: '',
  status: '',
  timezone: '',
  zip: '',
  created: 0,
  platformName: getPlatformName(),
  browserName: getBrowserName(),
};

type UserContextType = {
  user: IUser;
  setUser: (value: IUser) => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

type IProps = {
  children: React.ReactNode;
};

export const UserProvider = ({children}: IProps) => {
  const [user, setUser] = useState(defaultState)!;

  useEffect(
    () => {
      if (user.pristine) {

        try {
          axios('http://ip-api.com/json').then(response => {
            const {data} = response;
              console.log("DATA", data);
            setUser({
              ...user,
              ...data,
              error: false,
                pristine: false,
              pending: false,
              created: getTimestamp(),
            });
          });
        } catch (error) {
          setUser({
            ...user,
            error: true,
            pending: false,
            created: getTimestamp(),
          });
        }
      }
    },
    [user, setUser],
  );

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};
