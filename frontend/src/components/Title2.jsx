import React from 'react';

const Title = ({ text1, text2 }) => {
    return (
        <>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                {text1}
                <span className="block bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                    {text2}
                </span>
            </h2>
        </>
    )
}

export default Title;