import { useNavigate } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import '../App.css';
import logo from '../assets/logo-main.png'
import { TonConnectButton,  useTonWallet } from '@tonconnect/ui-react';
import ton from '../assets/ton.png';
import { useMultitap } from '../Components/Context/MultiTapContext';
import {  FaTimesCircle } from 'react-icons/fa';





const Wallet = () => {
  const navigate = useNavigate();
  const wallet = useTonWallet();
  const {showRedAlert} = useMultitap();


  


  const handleBackButtonClick = () => {
    navigate('/'); 
  };

  
 
 



  return (
    <>
    <BackButton navigateBack={handleBackButtonClick} />
    <div className='container'>
    <div className="h-screen bg-black pt-8 w-auto">
      <div className='items-center text-center justify-center'>
        <img className='w-[50%] inline' src={logo} alt="logo" onClick={handleBackButtonClick}/>
      </div>
      <div className='items-center text-center justify-center mt-7'>
        <div>
          <h1 className='text-[35px] font-bold bg-gradient-to-r from-yellow-600 via-pink-500 to-teal-500 bg-clip-text text-transparent'>Airdrop Task</h1>
          <p className='text-white text-center px-5'>Listing is on the way. Tasks will appear below. Complete them to participate in the Airdrop</p>
        </div>
        <div className='mt-4 flex justify-center items-center'>
          <TonConnectButton className="mt-[30px]  text-[20px] flex flex-row text-white font-bold items-center text-center py-4 px-8 rounded-xl bg-gradient-to-r from-orange-600 via-pink-500 to-indigo-500 shadow-[0_20px_50px_rgba(255,_127,_62,_0.7)]" />
        </div>
        {wallet && (
          <div className='mt-4 text-white'>
            <p>Connected wallet: {wallet.name}</p>
          </div>
        )}

<div className='blurbox backdrop-blur-sm rounded-lg mx-8 mt-5 text-white p-2'>
              <button className='flex justify-between w-full' >
                <h1 className='flex-1 text-left'>2x <span className='opacity-50'>More Tokens</span></h1>
                <div className='flex items-center'>
                  <img className='w-6 h-6' src={ton} alt="ton" />
                  <h1 className='font-bold ml-2'>1 TON</h1>
                </div>
              </button>
            </div>
            <div className='blurbox backdrop-blur-sm rounded-lg mx-8 mt-5 text-white p-2'>
              <button className='flex justify-between w-full' >
                <h1 className='flex-1 text-left'>3x <span className='opacity-50'>More Tokens</span></h1>
                <div className='flex items-center'>
                  <img className='w-6 h-6' src={ton} alt="ton" />
                  <h1 className='font-bold ml-2'>3 TON</h1>
                </div>
              </button>
            </div>
            <div className='blurbox backdrop-blur-sm rounded-lg mx-8 mt-5 text-white p-2'>
              <button className='flex justify-between w-full' >
                <h1 className='flex-1 text-left'>5x <span className='opacity-50'>More Tokens</span></h1>
                <div className='flex items-center'>
                  <img className='w-6 h-6' src={ton} alt="ton" />
                  <h1 className='font-bold ml-2'>5 TON</h1>
                </div>
              </button>
            </div>
        
      </div>
    </div>
    </div>
    {showRedAlert && (
        <div className="fixed bottom-[100px] right-[80px] blurbox text-white px-8 py-4 rounded-md flex items-center shadow-lg">
          Please Connect Wallet
          <FaTimesCircle className="w-6 h-6 ml-6 text-red-500" />
        </div>
      )}
  </>
    
  )
}

export default Wallet