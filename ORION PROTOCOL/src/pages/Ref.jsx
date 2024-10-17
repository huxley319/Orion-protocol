import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../Components/BackButton';
import gift from '../assets/gift.webp';
import {db} from '../database/firebase.js';
import { collection, getDocs } from "@firebase/firestore";
import {useCoin} from '../Components/Context/CoinContext.jsx';





const Ref = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [copied, setCopied] = useState(false);
  const [Idme, setIdme] = useState("");
  const [filteredUser, setFilteredUser] = useState([]);
  const { setCoinBalance } = useCoin();
  

  useEffect( () => {
    const telegramUserId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;

    if(telegramUserId) {
      setIdme(telegramUserId);
    }

    fetchAllUserId();
  }, []);

  



  useEffect(() => {
    const telegramUserId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;

    if(telegramUserId) {
      setIdme(telegramUserId);
    }

    const filterd = users.filter(
      (user) => user.referId === `${telegramUserId}`
    );
    setFilteredUser(filterd);
    

    const currentUser = users.find(user => user.chatId === telegramUserId);
    if (currentUser) {
      setCoinBalance(currentUser.coinBalance);
    }

  }, [Idme, users]);

  const fetchAllUserId = async () => {
    try {
      const userRef = collection(db, "users");
      const querySnapshot = await getDocs(userRef);
      const allUsers = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        allUsers.push(data);
      });

      setUsers(allUsers);
    } catch (error) {
      console.error("Error Fetching Users", error);
    }
  };

  const handleBackButtonClick = () => {
    navigate('/'); // Navigate back in history
  };

  const handleCopyLink = () => {
    let telegramUserId = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
    let referralLink = `https://t.me/kndflskghlrd_bot?start=${telegramUserId}`;
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    });
  };

  return (
    < div className="w-full h-full min-h-screen bg-black pt-6">
    <BackButton navigateBack={handleBackButtonClick} />

    <div className="text-center items-center text-white font-robot  container mx-auto">
      <div>
      <h1 className="text-[30px] font-bold bg-gradient-to-r from-yellow-600 to-pink-500   bg-clip-text text-transparent">Invite friends!</h1>
      </div>
      <div className="blurbox backdrop-blur-sm rounded-lg mx-6">
      <div className="flex flex-row gap-3 items-center text-center  mt-4 py-3">
        <div className="w-[100px]">
          <img className="w-[70%] ml-4" src={gift} alt="Invite-gift" />
        </div>
        <div >
          <h1 className="text-start font-bold">Invite a Friend</h1>
          <p className="text-start"><span className="text-yellow-500">+10,000 </span>for you and your friend</p>
        </div>
      </div>
      </div>
      <div className="blurbox backdrop-blur-sm rounded-lg mx-6 mt-4 h-24 py-4">
      <div className="flex flex-row justify-around ">
        <h1 className="text-[20px] font-bold">My Invite Link</h1>
      <button className="rounded-full bg-[#fd8d14] text-white px-2 font-bold" onClick={handleCopyLink}  >
        {copied ? 'Copied!' : 'Copy'}</button>
      </div>
      {Idme ? (
            <p className="py-2 text-center text-[13px] break-words">{`https://t.me/kndflskghlrd_bot?start=${Idme}`}</p>
          ) : (
            <p className="py-2 text-center">Loading your invite link...</p>
          )}
      </div>
      <div className="mt-3">
        <h1 className="text-white text-[20px] font-bold">My Referrals ({filteredUser.length})</h1>

        <div className="container mt-4 text-start">
  {filteredUser.length > 0 ? (
    <div className="scrollable-container border-solid border-[#FFFFFF47] border mx-5 rounded-lg">
      {filteredUser.map((user, index) => (
        <div key={index} className="text-white">
          <div className="px-2 py-2 blurbox backdrop-blur-sm rounded-lg mx-4 mt-1">
            <div className="flex justify-between items-center">
            <div className="font-bold">Name: <span className="text-[#fd8d14]">{user.firstName}</span></div>
            <div className="font-bold">Coins: <span className="text-[#fd8d14]">{user.coinBalance}</span></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-white text-center">You have no Invite Friends.</p>
  )}
</div>

      </div>
    </div>
    <Footer />
    </div>
    
  )
}

export default Ref