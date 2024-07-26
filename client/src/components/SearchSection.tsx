import React from 'react';
import { Button } from './ui/button'; 
import { FaSearch } from 'react-icons/fa'; 

interface SearchSectionProps {
  texte: string;
}

const SearchSection: React.FC<SearchSectionProps> = ({ texte }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="bg-white border-b-2 border-black rounded-full flex items-center w-full max-w-xl mb-6">
        <input 
          type="text" 
          placeholder="Search..." 
          className="flex-grow bg-white h-[60px] border-none focus:outline-none px-3 py-2 rounded-full" 
        />
        <FaSearch size={18} className="text-blue-500 mr-3" />
      </div>
      <div className="relative">
        <Button className="bg-black text-white flex items-center space-x-2 px-6 py-2 rounded-3xl">
          <span>{texte}</span>
        </Button>
      </div>
    </div>
  );
}

export default SearchSection;
