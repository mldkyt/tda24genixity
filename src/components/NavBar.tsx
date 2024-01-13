import { Navbar, Nav, Image, Container } from "react-bootstrap";
import React from "react";
export default function FinalNavBar() {
    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand>
                    <Image width={64} src="/Logo.svg"></Image>
                    <span style={{
                        marginLeft: '1em'
                    }}>Teacher digital Agency</span>
                </Navbar.Brand>

                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                {/* <Navbar.Collapse id="basic-navbar-nav">

                </Navbar.Collapse> */}
            </Container>
        </Navbar>
    )
}
