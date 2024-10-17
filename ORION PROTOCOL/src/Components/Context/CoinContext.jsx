import { createContext, useState, useContext } from 'react';

// Create a context for the coin balance
const CoinContext = createContext();

// Provider component to wrap the app and provide the coin balance state
export const CoinProvider = ({ children }) => {
  const [coinBalance, setCoinBalance] = useState(0);

  return (
    <CoinContext.Provider value={{ coinBalance, setCoinBalance }}>
      {children}
    </CoinContext.Provider>
  );
};

// Custom hook to use the CoinContext
export const useCoin = () => {
  return useContext(CoinContext);
};
