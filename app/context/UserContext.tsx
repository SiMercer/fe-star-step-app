// import React, { createContext, useContext, useState, ReactNode } from "react";

// interface User {
//   _id?: string;
//   auth0Id: string;
//   [key: string]: any;
// }

// interface UserContextType {
//   user: User | null;
//   setUser: (user: User | null) => void;
// }

// const UserContext = createContext<UserContextType | undefined>(undefined);

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = (): UserContextType => {
//   const context = useContext(UserContext);
//   if (!context) throw new Error("useUser must be used within a UserProvider");
//   return context;
// };




import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);

type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);