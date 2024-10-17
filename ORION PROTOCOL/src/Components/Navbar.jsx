import logo from '../assets/logo-main.png';
import { Link } from "react-router-dom";
import wallet from '../assets/wallet.png';

const Navbar = () => {
  return (
    <nav className="bg-black p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/">
        <div className="flex items-center gap-2">
          <img className="w-8 h-8 md:w-12 md:h-12" src={logo} alt="logo" />
          <h1 className="bg-gradient-to-r from-yellow-600 to-pink-500 bg-clip-text text-transparent font-bold text-lg md:text-2xl font-play">
          $ORAX
          </h1>
        </div>
      </Link>
      <div>
        <Link to="/wallet">
          <img className="w-8 h-8 md:w-12 md:h-12" src={wallet} alt="wallet" />
        </Link>
      </div>
    </div>
  </nav>
  )
}

export default Navbar