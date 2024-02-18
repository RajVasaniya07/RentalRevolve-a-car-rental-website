import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import '../style.css';
import { Container } from "@mui/material";
import Gallery from "../components/Gallery";
import Description from "../components/Description";
import MobileGallery from "../components/MobileGallery";
const CarDetails = ({ car }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
  };

  return (
  
  <Container component="section" maxWidth={"lg"} >
        <section className="core" style={{marginTop:"0px",padding:"00px"}}>
          <Gallery images = {car.images}/>
          <MobileGallery IMAGES = {car.images}/>
          <Description car={car}/>
        </section>
      </Container>
  );
};

export default CarDetails;
