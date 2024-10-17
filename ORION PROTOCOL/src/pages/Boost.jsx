import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import fast from '../assets/fast.png';
import fire from '../assets/fire.png';
import token from '../assets/token.png';
import '../App.css';
import rlimit from '../assets/rlimit.webp';
import bot from '../assets/bot.png';
import multi from '../assets/multi.webp';
import {useBoost} from '../Components/Context/BoostContext';
import { useState, useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useMultitap } from "../Components/Context/MultiTapContext";
import { useEnergyLimit } from "../Components/Context/EnergyLimitContext";
import { useRechargingSpeed } from "../Components/Context/RechargeContext";







const Boost = () => {
  const navigate = useNavigate();
  const { applyBoost, tapBoost } = useBoost();
  const { rechargingSpeedLevel, upgradeRechargingSpeed} = useRechargingSpeed();
  const { level, upgradeMultitap, showRedAlert, showMaxLevelAlert, showGreenAlert } = useMultitap();
  const {upgradeEnergyLimit, energyLevel } = useEnergyLimit();



  const [showAlert, setShowAlert] = useState(false);
  const [showAlertBoost, setShowAlertBoost] = useState(false);
  const [tapBoostsLeft, setTapBoostsLeft] = useState(
    () => parseInt(localStorage.getItem('tapBoostsLeft')) || 3
  );
  const [fullTankBoostsLeft, setFullTankBoostsLeft] = useState(
    () => parseInt(localStorage.getItem('fullTankBoostsLeft')) || 3
  );
  const [tapBoostDisabled, setTapBoostDisabled] = useState(
    () => localStorage.getItem('tapBoostDisabledUntil') && new Date(localStorage.getItem('tapBoostDisabledUntil')) > new Date()
  );
  const [fullTankDisabled, setFullTankDisabled] = useState(
    () => localStorage.getItem('fullTankDisabledUntil') && new Date(localStorage.getItem('fullTankDisabledUntil')) > new Date()
  );
  const [tapBoostDisabledUntilTime, setTapBoostDisabledUntilTime] = useState(
    () => localStorage.getItem('tapBoostDisabledUntil')
  );
  const [fullTankDisabledUntilTime, setFullTankDisabledUntilTime] = useState(
    () => localStorage.getItem('fullTankDisabledUntil')
  );

  
  

  useEffect(() => {
    localStorage.setItem('tapBoostsLeft', tapBoostsLeft);
    if (tapBoostsLeft === 0) {
      const disabledUntil = new Date(new Date().getTime() +  60 * 1000);
      localStorage.setItem('tapBoostDisabledUntil', disabledUntil);
      setTapBoostDisabledUntilTime(disabledUntil);
      setTapBoostDisabled(true);
    }
  }, [tapBoostsLeft]);

  useEffect(() => {
    localStorage.setItem('fullTankBoostsLeft', fullTankBoostsLeft);
    if (fullTankBoostsLeft === 0) {
      const disabledUntil = new Date(new Date().getTime() +  60 * 1000);
      localStorage.setItem('fullTankDisabledUntil', disabledUntil);
      setFullTankDisabledUntilTime(disabledUntil);
      setFullTankDisabled(true);
    }
  }, [fullTankBoostsLeft]);

  const handleBackButtonClick = () => {
    navigate('/'); 
  };

  const handleTapBoostClick = () => {
    if (tapBoostDisabled || tapBoostsLeft <= 0) return;
    tapBoost();
    setTapBoostsLeft(tapBoostsLeft - 1);
    setShowAlertBoost(true);
    setTimeout(() => {
      setShowAlertBoost(false);
      navigate('/');
    }, 1000); // Hide alert after 3 seconds
  };

  const handleFullTankClick = () => {
    if (fullTankDisabled || fullTankBoostsLeft <= 0) return;

    applyBoost();
    setFullTankBoostsLeft(fullTankBoostsLeft - 1);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      navigate('/');
    }, 1000); // Hide alert after 3 seconds
  };



  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();

      if (tapBoostDisabledUntilTime && new Date(tapBoostDisabledUntilTime) <= currentTime) {
        setTapBoostDisabled(false);
        setTapBoostsLeft(3);
        localStorage.removeItem('tapBoostDisabledUntil');
        setTapBoostDisabledUntilTime(null);
      }

      if (fullTankDisabledUntilTime && new Date(fullTankDisabledUntilTime) <= currentTime) {
        setFullTankDisabled(false);
        setFullTankBoostsLeft(3);
        localStorage.removeItem('fullTankDisabledUntil');
        setFullTankDisabledUntilTime(null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [tapBoostDisabledUntilTime, fullTankDisabledUntilTime]);

  const formatTimeLeft = (disabledUntilTime) => {
    const timeDiff = new Date(disabledUntilTime) - new Date();
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };


  return (
    <div className="w-full h-full min-h-screen bg-black">
    <BackButton navigateBack={handleBackButtonClick} />

  
    <div className="items-center justify-center text-center pt-6 ">
      <div>
        <h1 className="text-[30px] font-bold bg-gradient-to-r from-yellow-600 to-pink-500   bg-clip-text text-transparent"> Daily Booster</h1>
      </div>
      <div className="flex flex-row justify-around pt-6">
        <div className="blurbox backdrop-blur-sm rounded-lg mx-6 mt-4 " onClick={handleTapBoostClick}>
        <div className="flex flex-row gap-1 px-4 items-center text-center">
          <img className="w-8 h-8" src={fire} alt="energy" />
          <div className="text-white  font-robot">
          {tapBoostDisabled && (
                  <p className="text-start text-[8px] text-gray-400">
                    Next {formatTimeLeft(tapBoostDisabledUntilTime)}
                  </p>
                )}
            <h1>Tap Boost</h1>
            <h1>{tapBoostsLeft}/3</h1>
            
          </div>
        </div>
        </div>
        <div className="blurbox backdrop-blur-sm rounded-lg mx-6 mt-4"  onClick={handleFullTankClick}>
        <div className="flex flex-row gap-1 px-4 items-center text-center" >
          <img className="w-8 h-8" src={fast} alt="energy" />
          <div className="text-white  font-robot">
          {fullTankDisabled && (
                  <p className="text-[8px] text-gray-400 text-start">
                    Next {formatTimeLeft(fullTankDisabledUntilTime)}
                  </p>
                )}
            <h1>Full Tank</h1>
            <h1>{fullTankBoostsLeft}/3</h1>
            
          </div>
        </div>
        </div>
      </div>
      <div className="mt-8">
        <h1 className="text-white text-[20px]">Game Levels:</h1>
      </div>
      <div>
      <div className="blurbox backdrop-blur-sm rounded-lg mx-6 mt-4"  onClick={upgradeMultitap}>
        <div className="flex flex-row gap-2 px-4 items-center text-center">
          <img className="w-8 h-8" src={multi} alt="energy" />
          <div className="text-white  font-robot">
            <h1 className="text-start">Multitap</h1>
            <div className="flex flex-row items-center text-center">
              <img className="w-4" src={token} alt="coin" />
              <h1> {1000 * level} <span className="opacity-50">| {level} Level</span></h1>
            </div>
          </div>
        </div>
        </div>
        <div className="blurbox backdrop-blur-sm rounded-lg mx-6 mt-4" onClick={upgradeEnergyLimit}>
        <div className="flex flex-row gap-2 px-4 items-center text-center">
          <img className="w-8 h-8" src={rlimit} alt="energy" />
          <div className="text-white  font-robot">
            <h1 className="text-start">Energy Limit</h1>
            <div className="flex flex-row items-center text-center">
              <img className="w-4" src={token} alt="coin" />
              <h1>{1000 * energyLevel} <span className="opacity-50">| {energyLevel} Level</span></h1>
            </div>
          </div>
        </div>
        </div>
        <div className="blurbox backdrop-blur-sm rounded-lg mx-6 mt-4" onClick={upgradeRechargingSpeed}>
        <div className="flex flex-row gap-2 px-4 items-center text-center">
          <img className="w-8 h-8" src={fast} alt="energy" />
          <div className="text-white  font-robot">
            <h1 className="text-start">Recharging Speed</h1>
            <div className="flex flex-row items-center text-center">
              <img className="w-4" src={token} alt="coin" />
              <h1>{1000 * rechargingSpeedLevel}<span className="opacity-50">| {rechargingSpeedLevel} Level</span></h1>
            </div>
          </div>
        </div>
        </div>
        <div className="blurbox backdrop-blur-sm rounded-lg mx-6 mt-4">
        <div className="flex flex-row gap-2 px-4 items-center text-center">
          <img className="w-8 h-8" src={bot} alt="energy" />
          <div className="text-white  font-robot">
            <h1 className="text-start">Tap Bot</h1>
            <div className="flex flex-row items-center text-center">
              
              <h1 className="opacity-50">Coming soon</h1>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    {showAlert && (
        <div className="fixed top-[100px] right-[120px] blurbox text-white px-8 py-4 rounded-md flex items-center shadow-lg">
          Energy Full
          <FaCheckCircle className="w-6 h-6 ml-3 text-green-500" />
        </div>
      )}
      {showAlertBoost && (
        <div className="fixed top-[100px] right-[80px] blurbox text-white px-8 py-4 rounded-md flex items-center shadow-lg">
          Boost Active for 20 seconds
          <FaCheckCircle className="w-6 h-6 ml-3 text-green-500" />
        </div>
      )}
      {showMaxLevelAlert && (
        <div className="fixed top-[100px] right-[80px] blurbox text-white px-8 py-4 rounded-md flex items-center shadow-lg">
          Reached maximum level
          <FaTimesCircle className="w-6 h-6 ml-6 text-red-500" />
        </div>
      )}
      {showRedAlert && (
        <div className="fixed top-[100px] right-[80px] blurbox text-white px-8 py-4 rounded-md flex items-center shadow-lg">
          Not Enough Coins
          <FaTimesCircle className="w-6 h-6 ml-6 text-red-500" />
        </div>
      )}
      {showGreenAlert && (
        <div className="fixed top-[100px] right-[80px] blurbox text-white px-8 py-4 rounded-md flex items-center shadow-lg">
          Level Upgraded
          <FaCheckCircle className="w-6 h-6 ml-6 text-green-500" />
        </div>
      )}

    <Footer />
    </div>
  )
}

export default Boost