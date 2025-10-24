import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({item}) => {
    const { currency } = useContext(ShopContext);
    // console.log("Item is", item);
  return (
    <>
        <Link to={`/product/${item._id}`} className='text-gray-700 cursor-pointer border border-gray-200 rounded-md'>
            <div className='overflow-hidden border-b border-gray-200'>
                <img src={item.image[0].url} alt="" className='hover:scale-110 transition ease-in-out' />
            </div>
            <div className='p-2'>
                <p className='pb-1 text-sm'>{item.name}</p>
                <p className=' text-sm font-medium'>{currency}{item.price}</p>
            </div>
        </Link>
    </>
  )
}

export default ProductItem;