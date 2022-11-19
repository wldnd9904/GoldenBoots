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
import SpeechRecognitionView from './interfaces/speechRecognitionView';
import { IPeople } from './People/People';
import { userDataAtom } from './People/PeopleManager';
import {ReactComponent as Mic} from './Images/microphone.svg'
import styled from 'styled-components';

const MicBtn = styled(Mic)`
  :hover{
    transition:transform 0.1s linear;
    transform:scale(1.1);
    opacity:0.8;
  }
`;

function Header() {
  const [userData, setUserData] = useRecoilState<IPeople>(userDataAtom);
  const [modalType, setModalType] = useState("R");
  const [navShow, setNavShow] = useState(false);
  const handleNavClose = () => setNavShow(false);
  const handleNavShow = () => setNavShow(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const register = () => {
    setShow(true);
    setNavShow(false);
    setModalType("R");
  };
  const login = () => {
    setShow(true);
    setNavShow(false);
    setModalType("L");
  };
  const myPage = () => {
    setShow(true);
    setNavShow(false);
    setModalType("M");
  };
  const speech = () => {
    setShow(true);
    setNavShow(false);
    setModalType("S");
  };
  return (
    <>
      <div style={{position:"absolute", top:"-1000px"}}>
      <img loading="eager" src="https://via.placeholder.com/300x200?text=+" alt="placeholder"/>
      <img loading="eager" src="https://via.placeholder.com/512x412?text=+" alt="placeholder"/>
      </div>
      {['md'].map((expand) => (
        <Navbar fixed="top"  key={expand} bg="white" expand={expand} className="mb-3" style={{boxShadow: "0px -10px 20px 1px gray"}}>
          <Container fluid>
            <Navbar.Brand as={Link} to={'home'}>
                <img alt="미스터 대박 서비스" src="https://github.com/wldnd9904/GoldenBoots/blob/master/mr-daebak/src/Images/daebak.png?raw=true" width="60px"/>
            </Navbar.Brand>
              <div style={{position:"absolute", left:"50%", marginLeft:"-20px"}}>
                <MicBtn onClick={speech} width="40px" height="40px"/>
              </div>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={handleNavShow} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              show={navShow}
              onHide={handleNavClose}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  {userData?`${userData?.name}님`:"로그인 해주세요."}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3" onClick={()=>setNavShow(false)}>
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
          "M":<MyPage show={show} handleClose={handleClose} />,
          "S":<SpeechRecognitionView show={show} handleClose={handleClose} />
        }[modalType]
      }
    </>
  );
}

export default Header;

