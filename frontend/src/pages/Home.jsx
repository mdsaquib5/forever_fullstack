import React from 'react';
import Hero from '../components/Hero';
import Collections from '../components/Collections';
import BestSeller from '../components/BestSeller';
import OurPolicy from '../components/OurPolicy';
import NewsLetter from '../components/NewsLetter';

const Home = () => {
  return (
    <>
        <Hero />
        <Collections />
        <BestSeller />
        <OurPolicy />
        <NewsLetter />
    </>
  )
}

export default Home;