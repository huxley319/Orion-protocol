import boost from '../assets/boost.png';
import about from '../assets/about.png';
import earn from '../assets/task.png';
import ref from '../assets/refer.png';
import home from '../assets/home.png';
import { NavLink } from 'react-router-dom';
import '../App.css';

const Footer = () => {
  const linkClasses = ' rounded-[10px] min-w-[60px] text-center flex flex-col items-center font-robot ';

  return (
    <footer className='fixed justify-center flex  bottom-0 left-0 w-full py-3 bg-black '>
    <div className="container mx-4 flex justify-between items-center">
      <NavLink
        to="/about"
        className={({ isActive }) => `${linkClasses} ${isActive ?  'bg-lightDark' : 'blurbox shadow-[0px_0px_30px_0px_rgba(177,178,_185,_0.3)]'}`}
      >
        <img  className="w-8 h-8 mt-2" src={about} alt="Abou-Icon" />
        <span className='text-[10px] text-white mt-1 font-bold'>About</span>
      </NavLink>
     
      <NavLink
        to="/ref"
        className={({ isActive }) => `${linkClasses} ${isActive ? 'bg-lightDark' : 'blurbox shadow-[0px_0px_30px_0px_rgba(177,178,_185,_0.3)]'}`}
      >
        <img  className="w-8 h-8 " src={ref} alt="Ref" />
        <span className='text-[10px] text-white mt-1 font-bold'>Ref</span>
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) => `${linkClasses} ${isActive ? 'bg-lightDark' : 'blurbox shadow-[0px_0px_30px_0px_rgba(177,178,_185,_0.3)]'}`}
      >
        <img  className="w-8 h-8 " src={home} alt="Ref" />
        <span className='text-[10px] text-white mt-1 font-bold'>Home</span>
      </NavLink>
      <NavLink
        to="/earn"
        className={({ isActive }) => `${linkClasses} ${isActive ? 'bg-lightDark' : 'blurbox shadow-[0px_0px_30px_0px_rgba(177,178,_185,_0.3)]'}`} 
      >
        <img  className="w-8 h-8" src={earn} alt="Earn" />
        <span className='text-[10px] text-white mt-1 font-bold'>Task</span>
      </NavLink>
      <NavLink
        to="/boost"
        className={({ isActive }) => `${linkClasses} ${isActive ? 'bg-lightDark' : 'blurbox shadow-[0px_0px_30px_0px_rgba(177,178,_185,_0.3)]'}`} 
      >
        <img className="w-8 h-8" src={boost} alt="Boost"  />
        <span className='text-[10px] text-white mt-1 font-bold'>Boost</span>
      </NavLink>
    </div>
    </footer>
  );
};

export default Footer;

