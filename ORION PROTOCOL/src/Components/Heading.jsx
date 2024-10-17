import { useCoin } from "./Context/CoinContext";
import { useBoost } from "./Context/BoostContext";
import mainlogo from '../assets/logo-main.png'
import fast from "../assets/fast.png";
import token from "../assets/token.png";
import { useState, useEffect } from "react";
import '../App.css';
import { FaTimesCircle } from 'react-icons/fa';
import { useMultitap } from "./Context/MultiTapContext";
import { useEnergyLimit } from "./Context/EnergyLimitContext";
import { doc, getDoc, updateDoc } from "@firebase/firestore"; 
import { db } from "../database/firebase.js";
import "animate.css";


const Heading = () => {
  const { coinBalance, setCoinBalance } = useCoin();
  const { counter, boostActive, decrementCounter} = useBoost();
  const [showPlusValue, setShowPlusValue] = useState(false);
  const [showEnergyAlert, setShowEnergyAlert] = useState(false);
  const {energyLimit} = useEnergyLimit();
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [animate, setAnimate] = useState(false);
  const { level} = useMultitap();


  useEffect(() => {
    const fetchCoinBalance = async () => {
      const telegramUserId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;

      if (telegramUserId) {
        const userDoc = await getDoc(doc(db, 'users', telegramUserId.toString()));
        if (userDoc.exists()) {
          setCoinBalance(userDoc.data().coinBalance || 0);
        }
      }
    };

    fetchCoinBalance();
  }, [setCoinBalance]);


  const handleImageClick = (event) => {
    const handleClick = async () => {
      if (counter === 0) {
        setShowEnergyAlert(true);
        setTimeout(() => {
          setShowEnergyAlert(false);
        }, 3000); 
        return; 
      }
  
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left; 
      const y = event.clientY - rect.top;  
  
      setClickPosition({ x, y });
  
      const increment = boostActive ? 10 * level : 1 * level;
      const newBalance = coinBalance + increment;
      setCoinBalance(newBalance);  
      setShowPlusValue(increment);
  
      decrementCounter(); 
      setAnimate(true);
  
      setTimeout(() => {
        setShowPlusValue(false);
      }, 3000); 
  
      setTimeout(() => {
        setAnimate(false); 
      }, 2000); 
  
      const telegramUserId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
  
      const updateCoinBalance = async (telegramUserId, newBalance) => {
        try {
          if (telegramUserId) {
            await updateDoc(doc(db, 'users', telegramUserId.toString()), {
              coinBalance: newBalance
            });
          }
        } catch (error) {
          console.error('Error updating coin balance:', error);
          
        }
      };
  
      
      await updateCoinBalance(telegramUserId, newBalance);
    };
  
    handleClick(); 
  };

  
 

  return (
    <div className="flex flex-col items-center">
      <div className="items-center text-center justify-center">
        <h1 className="text-white font-bold font-play">Your Balance</h1>
        <div className="flex gap-3 items-center text-center justify-center">
          <img className="w-[10%]" src={mainlogo} alt="token-logo" />
          <h1 className="text-white text-[40px] font-bold font-robot">{coinBalance}</h1>
        </div>
      </div>
      <div className="relative flex justify-center items-center mt-5 w-4/5">
        {showPlusValue && (
          <div
            className="absolute text-[#dc32ec] text-[30px] font-bold animate-fly-up"
            style={{ left: clickPosition.x, top: clickPosition.y }}
          >
            +{showPlusValue}
          </div>
        )}
        <img
          className={`cursor-pointer animate__animated animate__fadeIn ${animate ? 'animate-in-out' : ''}`}
          src={mainlogo}
          alt="main-img"
          onClick={handleImageClick}
        />
      </div>
      <div className="flex items-center gap-2 mt-5 w-4/5">
        <img className="w-[10%]" src={fast} alt="fast" />
        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold font-robot">
            {counter}/ {energyLimit}
          </div>
          <div className="bg-gray-200 rounded-full overflow-hidden h-4">
            <div
              className="bg-gradient-to-r from-green-500 via-pink-500 to-indigo-500 h-full"
              style={{ width: `${(counter / energyLimit) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      {showEnergyAlert && (
        <div className="fixed bottom-[150px] right-[90px] blurbox text-white px-8 py-4 rounded-md flex items-center shadow-lg">
          Insufficient Energy
          <FaTimesCircle className="w-6 h-6 ml-6 text-red-500" />
        </div>
      )}
    </div>
  );
};

export default Heading;