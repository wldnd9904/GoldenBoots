import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import LoginForm from './interfaces/loginForm';
import MyPage from './interfaces/myPage';
import RegisterForm from './interfaces/registerForm';
import { IPeople } from './People/People';
import { userDataAtom } from './People/PeopleManager';

function Header() {
  const [userData, setUserData] = useRecoilState<IPeople>(userDataAtom);
  const [modalType, setModalType] = useState("R");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const register = () => {
    setShow(true);
    setModalType("R");
  };
  const login = () => {
    setShow(true);
    setModalType("L");
  };
  const myPage = () => {
    setShow(true);
    setModalType("M");
  };
  return (
    <>
      {['md'].map((expand) => (
        <Navbar fixed="top" key={expand} bg="white" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand as={Link} to={'home'}>
                <img alt="미스터 대박 서비스" src="https://github.com/wldnd9904/GoldenBoots/blob/master/mr-daebak/src/Images/daebak.png?raw=true" width="60px"/>
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
                  {userData?`${userData?.name}님`:"로그인 해주세요."}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {
                  userData?
                    <Nav.Link onClick={myPage}>
                        내 정보
                    </Nav.Link>
                  :
                  <>
                    <Nav.Link onClick={register}>
                        회원가입
                    </Nav.Link>
                    <Nav.Link onClick={login}>
                        로그인
                    </Nav.Link>
                  </>
                  }
                  <Nav.Link as={Link} to={'order'}>
                    주문하기
                  </Nav.Link>  
                  <Nav.Link as={Link} to={'voucher'}>
                    상품권
                  </Nav.Link>
                  <Nav.Link as={Link} to={'event'}>
                    이벤트
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      {
        {
          "R":<RegisterForm show={show} handleClose={handleClose} />,
          "L":<LoginForm show={show} handleClose={handleClose} />,
          "M":<MyPage show={show} handleClose={handleClose} />
        }[modalType]
      }
    </>
  );
}

export default Header;

