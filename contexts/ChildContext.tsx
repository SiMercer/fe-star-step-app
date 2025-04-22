import React, { createContext, useState, useContext, ReactNode } from "react";

export interface Child {
  _id: string;
  childName: string;

}

interface ChildContextType {
  selectedChild: Child | null;
  setSelectedChild: (child: Child) => void;
}

const ChildContext = createContext<ChildContextType | undefined>(undefined);

export const ChildProvider = ({ children }: { children: ReactNode }) => {
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);

  return (
    <ChildContext.Provider value={{ selectedChild, setSelectedChild }}>
      {children}
    </ChildContext.Provider>
  );
};

export const useChild = () => {
  const ctx = useContext(ChildContext);
  if (!ctx) throw new Error("useChild must be used within ChildProvider");
  return ctx;
};