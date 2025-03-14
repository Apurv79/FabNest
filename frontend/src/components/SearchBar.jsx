import React, { useEffect } from 'react'
import { useContext } from 'react';
import { shopContext } from '../context/Shopcontext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

  const {search ,setSearch , showSearch , setShowSearch} = useContext(shopContext);
  const location =useLocation();
  const [visible ,setvisible] = React.useState(false);
  useEffect(() => {
    if(location.pathname.includes('/collection') ){
        setvisible(true);
    }else{
        setvisible(false);
    }
  }, [location.pathname])


  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className="inline-flex items-center justify-center border border-gray-300 rounded-full 
      px-6 py-3 my-2 mx-auto w-[80%] max-w-2xl hover:border-gray-400 transition-all duration-300 
      shadow-sm hover:shadow">
        <input 
          type="text" 
          placeholder="Search products..."
          className='flex-1 outline-none bg-inherit text-sm px-2 w-full' 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img 
          src={assets.search_icon} 
          alt="Search"  
          className='w-4 cursor-pointer'
        />
      </div>
      <img 
        src={assets.cross_icon} 
        alt="Close" 
        className='inline w-3 cursor-pointer ml-4 hover:opacity-70 transition-opacity'
        onClick={() => setShowSearch(false)}/>
    </div>
  ) : null;
}

export default SearchBar