import { createContext, useContext, useState } from 'react';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [userData, setUserData] = useState(null); // null = show Mehak's portfolio

  return (
    <PortfolioContext.Provider value={{ userData, setUserData }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  return useContext(PortfolioContext);
}