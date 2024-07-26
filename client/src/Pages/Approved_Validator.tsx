
import Navbar from '../components/Navbar';
import imagelogo from "../assets/image logo.png";
import SearchSection from '../components/SearchSection';

function Approved_Validator() {
    return (
        <div className="relative min-h-screen bg-[#f8f7f4]" >
          <div className="relative pb-6 ">
            <Navbar />
          </div>
          <div className="relative top-[-60PX] pt-24 pb-24 ml-24"> 
          <div className="flex items-center space-x-4 mb-6 ">
          <img src={imagelogo} alt="Logo" className="h-16 " />
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800 animate-color-change">CertiChain</h1>
            <p className="text-xl text-amber-800 mt-2">Empowering Trust!</p>
          </div>
        </div>
          </div>
          <div className="relative top-[-60PX] "> 
            <h1 className='text-5xl font-bold flex align-centre justify-center'>Approved Validators</h1>
          </div>
          <div className="relative top-[-10PX] "> 
            <SearchSection texte='Add more' />
          </div>
        </div>
      );
}

export default Approved_Validator;
