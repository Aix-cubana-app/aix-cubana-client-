import { Card, CardGroup, Container, Image } from "react-bootstrap";
import maikelF from "../../src/components/media/img/salsa-dancer-maykel-fonts.jpg";
import laAlemana from "../../src/components/media/img/bachata-dancer-la-alemana.jpg";
import kizomba from "../../src/components/media/img/kizomba2.jpg";
import peopleD from "../../src/components/media/dancing-people.jpg";

function Home() {
  return (
    <Container>
      <Container>
        <h1>Welcome to the Aix-cubana website</h1>
        <Image fluid src={peopleD}></Image>
      </Container>
      <br />
      <Container>
        <h1>Top teachers</h1>
        <CardGroup>
          <Card>
            <Card.Img variant="top" src={maikelF} />
            <Card.Body>
              <Card.Title>Maikel Fonts</Card.Title>
              <Card.Text>
                World famous salsa and rumba teacher. Many years of experience as
                a profesional dancer and teacher.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src={laAlemana} />
            <Card.Body>
              <Card.Title>Ataca and la Alemana</Card.Title>
              <Card.Text>
                Salsa en Linea and Dominican bachata teachers.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Img variant="top" src={kizomba} />
            <Card.Body>
              <Card.Title>Lisa and Leslie</Card.Title>
              <Card.Text>
                Famous Berliner Kizomba and Urban Kiss teachers.
              </Card.Text>
            </Card.Body>
          </Card>
        </CardGroup>
      </Container>
      
    </Container>
  );
}

export default Home;
