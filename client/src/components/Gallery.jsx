import React, { useState, useEffect } from "react";
import BackdropGallery from "./BackdropGallery";



const Gallery = ({images}) => {



  const [currentImage, setCurrentImage] = useState(images[0]);
  const [currentPassedImage, setCurrentPassedImage] = useState(images[0]);

  const [open, setOpen] = useState(false);
  const handleClick = (index) => {
    setCurrentImage(images[index]);
  };
  const handleToggle = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const removeActivatedClass = (parent) => {
    parent.childNodes.forEach((node) => {
      node.childNodes[0].classList.contains("activated") &&
        node.childNodes[0].classList.remove("activated");
    });
  };
  useEffect(() => {
    setCurrentPassedImage(currentImage);
  }, [currentImage]);

  return (
    <section className="gallery-holder hide-in-mobile">
      <section className="gallery">
        <div className="image">
          <img src={currentImage} alt="product-1" onClick={handleToggle} style={{minWidth:500, maxWidth:500, width:500, height:350, minHeight:350, maxHeight:350}}/>
        </div>
        <BackdropGallery
          handleClose={handleClose}
          open={open}
          currentPassedImage={currentPassedImage}
          images={images}
        />
        <div className="thumbnails">
          {images.map((th, index) => {
            return (
              <div
                className="img-holder"
                key={index}
                onClick={(e) => {
                  handleClick(index);
                  removeActivatedClass(e.currentTarget.parentNode);
                  e.currentTarget.childNodes[0].classList.toggle("activated");
                }}
              >
                <div className={`outlay ${index === 0 && "activated"}`}></div>
                <img src={th} alt={`product-${index + 1}`}  style={{minWidth:90, maxWidth:90, width:90, height:90, minHeight:90, maxHeight:90}} />
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default Gallery;
