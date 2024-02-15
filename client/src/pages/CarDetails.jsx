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
  //   <div className="container mt-5">
  //     <link
  //     rel="stylesheet"
  //     href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
  //   />
  // <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  // <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
  // <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script> 
  //     <div className="card">
  //       <div className="row no-gutters">
  //         <div className="col-md-6">
  //           <Carousel activeIndex={activeIndex} onSelect={handleSelect}>
  //             {car.images.map((image, index) => (
  //               <Carousel.Item key={index}>
  //                 <img className="d-block w-100" src={image} alt={`Slide ${index + 1}`} />
  //               </Carousel.Item>
  //             ))}
  //           </Carousel>
  //         </div>
  //         <div className="col-md-6">
  //           <div className="card-body">
  //             <h5 className="card-title">Car Model Name</h5>
  //             <p className="card-text">
  //               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla condimentum quam eget lacus accumsan, vel
  //               ullamcorper lectus tincidunt.
  //             </p>
  //             <p className="card-text">Price: $50,000</p>
  //             <p className="card-text">Engine: 2.0L V6</p>
  //             <p className="card-text">Transmission: Automatic</p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  <Container component="section" maxWidth={"lg"}>
        <section className="core">
          <Gallery images = {car.images}/>
          <MobileGallery IMAGES = {car.images}/>
          <Description car={car}/>
        </section>
      </Container>
  );
};

export default CarDetails;
