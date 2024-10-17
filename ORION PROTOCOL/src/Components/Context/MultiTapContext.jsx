import { createContext, useContext, useState, useEffect } from 'react';
import { useCoin } from './CoinContext';
import { doc, getDoc, updateDoc, increment } from "@firebase/firestore";
import {db} from '../../database/firebase.js';
import { useNavigate } from 'react-router-dom';


const MultitapContext = createContext();

export const useMultitap = () => useContext(MultitapContext);

export const MultitapProvider = ({ children }) => {
  const navigate = useNavigate();
  const [level, setLevel] = useState(1);
  const { coinBalance, setCoinBalance } = useCoin();
  const [showRedAlert, setShowRedAlert] = useState(false);
  const [showMaxLevelAlert, setShowMaxLevelAlert] = useState(false);
  const [showGreenAlert, setShowGreenAlert] = useState(false);
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
        setLevel(userData.level || 1);
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
        updates.level = newLevel;
      }
      await updateDoc(userDocRef, updates);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };
  

  const upgradeMultitap = () => {
    if (level < 10) { 
      const cost = 1000 * level;
      if (coinBalance >= cost) {
        const newBalance = coinBalance - cost;
        const newLevel = level + 1;
        setCoinBalance(newBalance);
        setLevel(newLevel);
        updateDatabase(-cost, newLevel); 
        setShowGreenAlert(true);
        setTimeout(() => {setShowGreenAlert(false), navigate('/')}, 1000);
      } else {
        setShowRedAlert(true);
        setTimeout(() => {setShowRedAlert(false), navigate('/')}, 2000);
      }
    } else {
      setShowMaxLevelAlert(true);
      setTimeout(() => {
        setShowMaxLevelAlert(false),
        navigate('/')
      }, 2000); // Hide the alert after 3 seconds
    }
  };

  return (
    <MultitapContext.Provider value={{ level, upgradeMultitap, showRedAlert, showMaxLevelAlert, showGreenAlert, setShowRedAlert, setShowGreenAlert, setShowMaxLevelAlert}}>
      {children}
    </MultitapContext.Provider>
  );
};
