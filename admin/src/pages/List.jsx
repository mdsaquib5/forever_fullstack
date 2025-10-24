import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const currency = "₹";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/product/list');
    //   console.log(response.data.products);
      if (response.data.success) {
        setList(response.data.products);
      }else{
        toast.error(response.data.message);
      }
    //   setList(response.data.products);
      toast.success('Product list fetched successfully');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  const removeProduct = async (id) => {
    console.log("Remove product id", id);
    try {
      const response = await axios.post(`http://localhost:4000/api/product/remove`, {headers: {token}, id});
      if (response.data.success) {
        toast.success('Product deleted successfully');
        // after delete the product from the list
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <>
        <div>
            <p className='mb-2'>All Product List</p>
            <div className='flex flex-col gap-2'>
                <table>
                    <thead>
                        <tr className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center text-left py-1 px-2 border bg-gray-100 text-sm border-gray-200'>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='flex flex-col gap-2'>
                        {
                            list.map((item, index) => (
                                <tr key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm border-gray-200'>
                                    <td>
                                        <img src={item.image[0].url} className='w-12 h-12' alt="" />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.category}</td>
                                    <td>{currency} {item.price}</td>
                                    <td>
                                        <button className='bg-red-500 text-white px-2 py-1 rounded custom-pointer' onClick={() => removeProduct(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div> 
    </>
  )
}

export default List;