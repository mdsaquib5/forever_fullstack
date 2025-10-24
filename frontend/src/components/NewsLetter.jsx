import React from 'react';

const NewsLetter = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.email.value);
    }

  return (
    <>
        <div className='text-center py-20'>
            <p>Subscribe Now & Get 20% Off</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <form onSubmit={handleSubmit} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
                <input type="email" placeholder='Enter your email' className='w-full sm:flex-1 outline-none' required />
                <button type='submit' className='bg-black text-white text-xs px-10 py-4'>Subscribe</button>
            </form>
        </div>
    </>
  )
}

export default NewsLetter;