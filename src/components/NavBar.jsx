import { Navbar, Nav, Image, Container } from "react-bootstrap";

export default function FinalNavBar() {
    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand>
                    <Image width={64} src="/Logo.png"></Image>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
