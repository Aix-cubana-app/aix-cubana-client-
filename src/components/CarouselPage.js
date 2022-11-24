import Carousel from "react-bootstrap/Carousel";
import bachataPic from "./media/bachata.jpg";
import ballromPic from "./media/Ballroom-Dancers.jpg";
import rumbaPic from "./media/maykel_fonts_cssffullarticle.jpg";
import dancingP from "./media/dancing-people.jpg"

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
          src={dancingP}
          alt="Second slide"
        />    
        <Carousel.Caption>
          <h3>Welcome to our Aix-cubana website</h3>
          <p>We are a booking platform for teachers and students to improve thier dancing skills</p>
        </Carousel.Caption>    
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100" src={ballromPic} alt="Third slide" />       
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselPage;
