import Container from "react-bootstrap/Container";
import picture from "./media/picture.jpeg"
import { Image } from "react-bootstrap";



function  AboutPage () {
    return(
        <>  
        <br />
            <Container>
            <h1>About:</h1>
            <p>
            This is a MERN app for teachers to offer services which students can book <br />
            You can create a profile either as a teacher or student. Teachers can create services or book <br />
            another teacher's services. Students can only book the services offered. 
            </p>
             <p>Created by: <a href="https://www.linkedin.com/in/michel-pomares/">Michel Pomares</a></p>   
             <Image src={picture} fluid />
            </Container>
        </>
    )


}

export default AboutPage;
