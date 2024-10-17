import { useEffect } from 'react';
import './Components/amination.css'
import AppRoutes from './Routes';
import { CoinProvider } from './Components/Context/CoinContext';
import { BoostProvider } from './Components/Context/BoostContext';
import { MultitapProvider } from './Components/Context/MultiTapContext';
import { EnergyLimitProvider } from './Components/Context/EnergyLimitContext';
import { RechargingSpeedProvider } from './Components/Context/RechargeContext';
import WebApp from '@twa-dev/sdk';






export default function App() {

  
    useEffect(() => {
      if (window.Telegram && window.Telegram.WebApp) {
        WebApp.ready();
        WebApp.expand();
        WebApp.enableClosingConfirmation();
      }
    }, []);
  


  return (
    <CoinProvider>
    <MultitapProvider>
      <EnergyLimitProvider>
      <RechargingSpeedProvider>
    <BoostProvider>
    <div className='bg-black  w-full '>
    <AppRoutes />
    </div>
    </BoostProvider>
    </RechargingSpeedProvider>
    </EnergyLimitProvider>
    </MultitapProvider>
    </CoinProvider>
  )
}