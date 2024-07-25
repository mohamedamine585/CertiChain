
import Navbar from '../components/Navbar';
import HomeBody from '../components/HomeBody';
import SearchSection from '../components/SearchSection';

function Home() {
    return (
        <div className="relative min-h-screen bg-[#f8f7f4]" >
          <div className="relative pb-6 ">
            <Navbar />
          </div>
          <div className="relative top-[-60PX] pt-24 pb-24"> 
            <HomeBody />
          </div>
    
          <div className="relative top-[-140PX] "> 
            <SearchSection />
          </div>
        </div>
      );
}

export default Home;
