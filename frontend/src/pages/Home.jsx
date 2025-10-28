import React from 'react';
import Hero from '../components/Hero';
import Collections from '../components/Collections';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsLetter from '../components/NewsLetter';
import ProductCategory from '../components/ProductCategory';
import Testimonial from '../components/Testimonial';

const Home = () => {
  return (
    <>
        <Hero />
        <ProductCategory />
        <Collections />
        <Testimonial />
        <BestSeller />
        <OurPolicy />
        <NewsLetter />
    </>
  )
}

export default Home;