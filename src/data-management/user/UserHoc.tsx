import React, {useEffect, useState} from 'react';
import {clearUser, getUserFromStorage} from '../StorageManagement';
import {IAppUser} from '../type';
import UserContext from './UserContext';

const dummyPromise = async () => {
  // to make the loading time more in sync, no spinners for a fraction of a second
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(1);
    }, 500);
  });
};
const UserWrapper: React.FC<{}> = ({children}): JSX.Element => {
  const [appUser, setAppUser] = useState<IAppUser | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const _getUser = async () => {
      const _user = await getUserFromStorage();
      setAppUser(_user);
    };
    Promise.all([dummyPromise(), _getUser()]).then(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData: appUser,
        clearUser: async () => {
          return clearUser();
        },
        setUser: async (_user: IAppUser) => {
          setAppUser(_user);
        },
        loading: isLoading,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserWrapper;
