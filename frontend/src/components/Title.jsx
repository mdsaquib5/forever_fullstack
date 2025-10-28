import React from 'react';

const Title = ({ text }) => {
    return (
        <>
            <div className='flex items-center justify-center lg:justify-start gap-3'>
                <div className='w-8 h-0.5 bg-gradient-to-r from-red-500 to-pink-500'></div>
                <p className="font-semibold text-sm md:text-base text-gray-600 tracking-wider uppercase">
                    {text}
                </p>
                <div className='w-12 h-0.5 bg-gradient-to-r from-pink-500 to-red-500'></div>
            </div>
        </>
    )
}

export default Title;