
import  { createContext, useContext, useState, useEffect  } from 'react';
import {useMultitap} from './MultiTapContext'
import { useEnergyLimit } from './EnergyLimitContext';
import { useRechargingSpeed } from './RechargeContext';





const BoostContext = createContext();

export const useBoost = () => useContext(BoostContext);

export const BoostProvider = ({ children }) => {
  const {rechargingSpeedLevel} = useRechargingSpeed();
  const { energyLimit } = useEnergyLimit(); 
  const [counter, setCounter] = useState(energyLimit);
  const [boostActive, setBoostActive] = useState(false);
  const { level } = useMultitap();




  const applyBoost = () => {
    setCounter(energyLimit);
  };

  const tapBoost = () => {
    setBoostActive(true);

    setTimeout(() => {
      setBoostActive(false);
    }, 20000); // Boost active for 20 seconds
  };

  const decrementCounter = () => {
    setCounter(prevCounter => Math.max(0, prevCounter - level));
  };

  
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prevCounter => {
        if (prevCounter < energyLimit) {
          return Math.min(prevCounter + rechargingSpeedLevel, energyLimit);
        } else {
          clearInterval(interval);
          return prevCounter;
        }
      });
    }, 1000);
  
    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [counter, energyLimit, rechargingSpeedLevel]);
  
  

  useEffect(() => {
    setCounter(energyLimit); // Update the counter when the energy limit changes
  }, [energyLimit]);

  return (
    <BoostContext.Provider value={{ counter, applyBoost, tapBoost, boostActive, decrementCounter }}>
      {children}
    </BoostContext.Provider>
  );
};
