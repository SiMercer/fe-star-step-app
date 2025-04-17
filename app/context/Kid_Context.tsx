import React, { createContext, useContext, useState, ReactNode } from "react";

interface Kid {
  _id?: string;
  auth0Id: string;
  [key: string]: any;
}

interface UserContextType {
  kid: Kid | null;
  setKid: (user: Kid | null) => void;
}

const KidContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [kid, setKid] = useState<Kid | null>(null);
  const kidData = async () => {
    await getKidbyParent(parentId);
  };
  return (
    <KidContext.Provider value={{ kid, setKid }}>
      {children}
    </KidContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(KidContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
