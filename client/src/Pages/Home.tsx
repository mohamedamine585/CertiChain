
import Navbar from '../components/Navbar'; // Assurez-vous que les chemins sont corrects
import HomeBody from '../components/HomeBody';
import SearchSection from '../components/SearchSection';
import backgroundImage from '../assets/background bloc 1.png'; // Assurez-vous que le chemin est correct

function Home() {
    return (
        <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
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
