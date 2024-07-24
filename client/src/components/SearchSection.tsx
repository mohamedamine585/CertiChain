
import { Button } from './ui/button'; 
import { FaSearch } from 'react-icons/fa'; 

function SearchSection() {
  return (
    <div className="flex flex-col items-center justify-center  p-6 ">
      <div className="bg-white h-[60PX] border rounded-full flex items-center w-full max-w-md mb-6">
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full bg-transparent border-none focus:outline-none px-3 py-2 rounded-full" 
        />
        <FaSearch size={24} className="text-blue-500 mr-3" />
      </div>
      <div className="relative">
       
        <Button className="bg-blue-800 text-white flex items-center space-x-2 px-6 py-2 rounded-3xl">
          <span>Check Certificate</span>
        </Button>
      </div>
    </div>
  );
}
export default SearchSection;
