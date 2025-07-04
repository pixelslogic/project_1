import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { BOOKING_ROUTE } from "../utils/consts";
import NavLogo from "./Logo";

const NavBar = ({ onLoginClick }) => {
    return (
        <div>
            <Navbar>
                <Container>
                    <Nav.Link to={BOOKING_ROUTE} className="nav-logo-link">
                        <NavLogo />
                    </Nav.Link>
                    <Nav className="me-auto main-nav">
                        <Nav.Link href="/">О нас</Nav.Link>
                        <Nav.Link href="/features">Связаться с нами</Nav.Link>
                        <Nav.Link href="/features">Специальные предложения</Nav.Link>
                        <Nav.Link href="/features">Наши партнеры</Nav.Link>
                        <Nav.Link
                            as="button"
                            onClick={onLoginClick}
                            className="btn btn-primary d-flex align-items-center"
                        >
                            <i className="bi bi-box-arrow-in-right me-2"></i> Войти
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;