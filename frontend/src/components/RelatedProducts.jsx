import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({category, subCategory}) => {
    const {products} = useContext(ShopContext);
    // This state is use to store related products
    const [related, setRelated] = useState([]);

    // This useEffect is use to get related products
    useEffect(() => {
        // Checking if products is not empty
        if (products.length > 0) {
            // Copying products array
            let productCopy = products.slice();
            // Filtering products
            productCopy = productCopy.filter( (item) => item.category === category && item.subCategory === subCategory);
            // Setting related products
            setRelated(productCopy.slice(0, 5));
            // Logging related products
            // console.log(productCopy.slice(0, 5));
        }
    }, [products])
  return (
    <>
        <div className='my-24'>
            <div className='text-center py-8 text-3xl'>
                <Title text1="RELATED" text2="PRODUCTS"/>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    related.map( (item, index) =>(
                        <ProductItem key={index} item={item}/>
                    ))
                }
            </div>
        </div>    
    </>
  ) 
}

export default RelatedProducts;