import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/asset/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
    const {products, search, showSearch} = useContext(ShopContext);
    // This state is use to show/hide filter sidebar
    const [showFilters, setShowFilters] = useState(false);
    // This state is use to store filtered products
    const [filterProducts, setFilterProducts] = useState([]);

    // These two states is use to store filter sectection data : 
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);

    // This state is use to store sort type
    const [sortType, setSortType] = useState('relavent');

    // This function is use to toggle category
    const toggleCategory = (e) =>{
        if (category.includes(e.target.value)) {
            setCategory((prev) => prev.filter((item) => item !== e.target.value));
        }else{
            setCategory((prev) => [...prev, e.target.value]);
        }
    }

    // This function is use to toggle subcategory
    const toggleSubCategory = (e) =>{
        if (subCategory.includes(e.target.value)) {
            setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
        }else{
            setSubCategory((prev) => [...prev, e.target.value]);
        }
    }

    // This function is use to apply filter
    const applyFilter = () => {
        // Copying products array
        let productsCopy = products.slice();

        // Lets create a condition to check if search is not empty
        if (showSearch && search) {
            productsCopy = productsCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
        }

        // Filtering products
        if (category.length > 0) {
            // Filtering products by category
            productsCopy = productsCopy.filter((item) => category.includes(item.category));
        }
        // Filtering products by subcategory
        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
        }
        // Setting filtered products
        setFilterProducts(productsCopy);
    }


    const sortProducts = () =>{
        // Copying filtered products array
        let fpCopy = filterProducts.slice();
        // Sorting products
        switch(sortType){
            case 'low-high':
                setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
            break;
            case 'high-low':
                setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
            break;
            default:
                applyFilter();
            break;
        }
    }

    // This useEffect is use to apply filter
    useEffect(() => {
      applyFilter();
    }, [category, subCategory, search, showSearch, products]);
    
    // This useEffect is use to sort products
    useEffect(() => {
      sortProducts();
    }, [sortType]);
    

    // This useEffect is use to log category and subcategory
    // useEffect(() => {
    //   console.log(category, subCategory);
    // }, [category, subCategory]);

  return (
    <>
      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-200'>
        {/* Filter SideBar */}
        <div className='min-w-60'>
          <p className='my-2 text-xl flex items-center cursor-pointer gap-2' onClick={() => setShowFilters(!showFilters)}>Filters
            <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilters ? 'rotate-90' : ''}`} />
          </p>
          <div className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${showFilters ? '' : 'hidden'}`}>
            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                <p className='flex gap-2'>
                    <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory}/> Men
                </p>
                <p className='flex gap-2'>
                    <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory}/> Women
                </p>
                <p className='flex gap-2'>
                    <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory}/> Kids
                </p>
            </div>
          </div>
          <div className={`border border-gray-300 pl-5 py-3 my-5 sm:block ${showFilters ? '' : 'hidden'}`}>
            <p className='mb-3 text-sm font-medium'>Type</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                <p className='flex gap-2'>
                    <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory}/> Topwear
                </p>
                <p className='flex gap-2'>
                    <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory}/> Bottomwear
                </p>
                <p className='flex gap-2'>
                    <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory}/> Winterwear
                </p>
            </div>
          </div>
        </div>
        {/* Filter Result Shown Products */}
        <div className='flex-1'>
            <div className='flex justify-between text-base sm:text-2xl mb-4'>
                <Title text1="All" text2="COLLECTIONS" />
                {/* Products Sorting */}
                <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                    <option value="relavent">Sort by: Relevant</option>
                    <option value="low-high">Sort by: Low to High</option>
                    <option value="high-low">Sort by: High to Low</option>
                </select>
            </div>
            {/* Map Products */}
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                {
                    filterProducts.map( (item, index) => (
                        <ProductItem key={index} item={item} />
                    ))
                }
            </div> 
        </div>
      </div> 
    </>
  )
}

export default Collection;