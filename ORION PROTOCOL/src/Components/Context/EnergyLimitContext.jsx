import { createContext, useContext, useState, useEffect } from 'react';
import { useCoin } from './CoinContext';
import { useMultitap } from './MultiTapContext';
import { doc, getDoc, updateDoc, increment } from "@firebase/firestore";
import {db} from '../../database/firebase.js';
import { useNavigate } from 'react-router-dom';



const EnergyLimitContext = createContext();

export const useEnergyLimit = () => useContext(EnergyLimitContext);

export const EnergyLimitProvider = ({ children }) => {
  const navigate = useNavigate();
  const [energyLevel, setLevel] = useState(1);
  const { coinBalance, setCoinBalance } = useCoin();
  const {setShowRedAlert, setShowGreenAlert, setShowMaxLevelAlert } = useMultitap();
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
      setLevel(userData.energyLevel || 1);
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
      updates.energyLevel = newLevel;
    }
    await updateDoc(userDocRef, updates);
  } catch (error) {
    console.error("Error updating user data:", error);
  }
};

const upgradeEnergyLimit = () => {
  if (energyLevel < 10) { // Check if level is less than 10
    const cost = 1000 * energyLevel;
    if (coinBalance >= cost) {
      const newBalance = coinBalance - cost;
      const newLevel = energyLevel + 1;
      setCoinBalance(newBalance);
      setLevel(newLevel);
      updateDatabase(-cost, newLevel); // Update database with the deducted coins and new level
      setShowGreenAlert(true);
      setTimeout(() => {
        setShowGreenAlert(false),
        navigate('/')
      } , 1000);
    } else {
      setShowRedAlert(true);
      setTimeout(() => {setShowRedAlert(false), navigate('/')}, 1000);
    }
  } else {
    setShowMaxLevelAlert(true);
    setTimeout(() => {setShowMaxLevelAlert(false), navigate('/')}, 1000);
  }
};

  const energyLimit = 500 * energyLevel;

  return (
    <EnergyLimitContext.Provider value={{ energyLimit, energyLevel, upgradeEnergyLimit }}>
      {children}
    </EnergyLimitContext.Provider>
  );
};
