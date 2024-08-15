import React, { useRef } from 'react';
import Hero from '../Components/Hero/Hero';
import Popular from '../Components/Popular/Popular';
import Offers from '../Components/Offers/Offers';
import NewCollections from '../Components/NewCollections/NewCollections';
import NewsLetter from '../Components/NewsLetter/NewsLetter';

const Shop = () => {
  const sectionRef = useRef(null);

  const scrollToSection = (section) => {
    if (section && section.current) {
      section.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Hero scrollToSection={() => scrollToSection(sectionRef)} sectionRef={sectionRef} />
      <Popular />
      <Offers scrollToSection={() => scrollToSection(sectionRef)} sectionRef={sectionRef} />
      <div ref={sectionRef}>
        <NewCollections />
        <NewsLetter />
      </div>
    </div>
  );
};

export default Shop;
