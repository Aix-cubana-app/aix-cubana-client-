import Carousel from "react-bootstrap/Carousel";
import bachataPic from "./media/bachata.jpg";
import ballromPic from "./media/Ballroom-Dancers.jpg";
import rumbaPic from "./media/maykel_fonts_cssffullarticle.jpg";

function CarouselPage() {

  

  return (
    <Carousel variant="dark">
      <Carousel.Item>
        <img className="d-block w-100" src={ballromPic} alt="First slide" />        
      </Carousel.Item>
      <Carousel.Item>
        <img
          fluid
          className="d-block w-100"
          src={ballromPic}
          alt="Second slide"
        />        
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={ballromPic} alt="Third slide" />       
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselPage;
