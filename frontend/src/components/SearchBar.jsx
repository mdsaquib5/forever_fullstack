import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/asset/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    // useEffect to close search bar when user navigate to collection page
    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    // get current location
    const location = useLocation();

    // useEffect to close search bar when user navigate to collection page
    useEffect(() => {
        if(location.pathname.includes("/collection")) {
            setVisible(true);
        }else{
            setVisible(false);
        }
    }, [location])
    
  return showSearch && visible ? (  
    <>
        <div className='border-t border-b border-gray-200 bg-gray-50 text-center'>
            <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
                <input className='flex-1 outline-none bg-inherit text-sm' type="text" placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
                <img className='w-4' src={assets.search_icon} alt="" />
            </div>
            <button onClick={() => setShowSearch(false)} className='inline w-3 cursor-pointer'><img className='w-4 inline cursor-pointer' src={assets.cross_icon} alt="" /></button>
        </div>    
    </>
  ) : null
}

export default SearchBar;