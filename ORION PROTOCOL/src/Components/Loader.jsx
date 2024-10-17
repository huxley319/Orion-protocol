import '../App.css';
import loader from '../assets/loader.gif';

const Loader = () => {
  return (
    <div className="preloader">
      <img src={loader} alt="Loading....." />
    </div>
  )
}

export default Loader