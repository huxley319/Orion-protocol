import { createContext, useContext, useState, useEffect} from 'react';
import { useCoin } from './CoinContext';
import { useMultitap } from './MultiTapContext';
import { doc, getDoc, updateDoc, increment } from "@firebase/firestore";
import {db} from '../../database/firebase.js';
import { useNavigate } from 'react-router-dom';


const RechargingSpeedContext = createContext();

export const useRechargingSpeed = () => useContext(RechargingSpeedContext);

export const RechargingSpeedProvider = ({ children }) => {
  const navigate = useNavigate();
  const [rechargingSpeedLevel, setRechargingSpeedLevel] = useState(1);
  const { coinBalance, setCoinBalance } = useCoin();
  const { setShowRedAlert, setShowGreenAlert, setShowMaxLevelAlert } = useMultitap();

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const telegramUserId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
    if (telegramUserId) {
      setUserId(telegramUserId);
      fetchUserData(telegramUserId);
    }
  }, []);
  
  const fetchUserData = async (telegramUserId) => {
    try {
      const userDocRef = doc(db, 'users', telegramUserId.toString());
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setCoinBalance(userData.coinBalance);
        setRechargingSpeedLevel(userData.rechargingSpeedLevel || 1);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const updateDatabase = async (coins, newLevel) => {
    if (!userId) return;
  
    try {
      const userDocRef = doc(db, 'users', userId.toString());
      const updates = {
        coinBalance: increment(coins),
      };
      if (newLevel !== undefined) {
        updates.rechargingSpeedLevel = newLevel;
      }
      await updateDoc(userDocRef, updates);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  
  


  const upgradeRechargingSpeed = () => {
    const upgradeCost = 1000 * rechargingSpeedLevel;
    if (rechargingSpeedLevel < 10) {
      if (coinBalance >= upgradeCost) {
        const newBalance = coinBalance - upgradeCost;
        const newLevel = rechargingSpeedLevel + 1;
        setCoinBalance(newBalance);
        setRechargingSpeedLevel(newLevel);
        updateDatabase(-upgradeCost, newLevel);
        setShowGreenAlert(true); 
        setTimeout(() => {setShowGreenAlert(false), navigate('/')}, 2000); 
      } else {
        setShowRedAlert(true); 
        setTimeout(() => {setShowRedAlert(false), navigate('/')}, 2000); 
      }
    } else {
      setShowMaxLevelAlert(true); 
      setTimeout(() => {setShowMaxLevelAlert(false), navigate('/')}, 2000);
    }
  };

  

  return (
    <RechargingSpeedContext.Provider value={{ rechargingSpeedLevel, upgradeRechargingSpeed }}>
      {children}
    </RechargingSpeedContext.Provider>
  );
};
