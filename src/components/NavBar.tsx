import { Navbar, Image, Container } from "react-bootstrap";
import React from "react";
import styles from '../styles/navbar.module.css';

export default function FinalNavBar() {
    return (
        <Navbar expand="lg">
            <Container>
                <Navbar.Brand>
                    <a href="/" className={styles.nolink}>
                        <Image width={64} src="/Logo.svg"></Image>
                        <span style={{
                            marginLeft: '1em'
                        }}>Teacher digital Agency</span>
                    </a>
                </Navbar.Brand>

                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
                {/* <Navbar.Collapse id="basic-navbar-nav">

                </Navbar.Collapse> */}
            </Container>
        </Navbar>
    )
}
