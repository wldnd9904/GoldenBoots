import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import LoginForm from './interfaces/loginForm';

function Header() {
  const [isRegister, setIsRegister] = useState(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const register = () => {
    setShow(true);
    setIsRegister(true);
  };
  const login = () => {
    setShow(true);
    setIsRegister(false);
  };
  return (
    <>
      {['md'].map((expand) => (
        <Navbar fixed="top" key={expand} bg="white" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand>
              <Link to={`home`}>
                <img alt="미스터 대박 서비스" src="https://github.com/wldnd9904/GoldenBoots/blob/master/mr-daebak/src/daebak.png?raw=true" width="60px"/>
              </Link>
            </Navbar.Brand>
            <Form className="center d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  로그인 해주세요.
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link onClick={register}>
                      회원가입
                  </Nav.Link>
                  <Nav.Link onClick={login}>
                      로그인
                  </Nav.Link>
                  <Nav.Link>
                    <Link to={`order`}>주문하기</Link>
                  </Nav.Link>  
                  <Nav.Link>
                    <Link to={`voucher`}>상품권</Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link to={`event`}>이벤트</Link>
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      <LoginForm show={show} isRegister={isRegister} handleClose={handleClose} />
    </>
  );
}

export default Header;

