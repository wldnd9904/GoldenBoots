import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import { useRecoilState, useResetRecoilState } from 'recoil';
import LoginForm from './Interfaces/loginForm';
import MyPage from './Interfaces/myPage';
import RegisterForm from './Interfaces/registerForm';
import SpeechRecognitionView from './Interfaces/speechRecognitionView';
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
  const [userData, setUserData] = useRecoilState(userDataAtom);
  const resetUserData = useResetRecoilState(userDataAtom);
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
  const logout = () => {
    resetUserData();
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
                <img alt="????????? ?????? ?????????" src="https://github.com/wldnd9904/GoldenBoots/blob/master/mr-daebak/src/Images/daebak.png?raw=true" width="60px"/>
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
                  {userData?`${userData?.name}???`:"????????? ????????????."}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3" onClick={()=>setNavShow(false)}>
                  {
                  userData?
                  <>
                    <Nav.Link onClick={myPage}>
                        ??? ??????
                    </Nav.Link>
                    <Nav.Link onClick={logout}>
                        ????????????
                    </Nav.Link>
                  </>
                  :
                  <>
                    <Nav.Link onClick={register}>
                        ????????????
                    </Nav.Link>
                    <Nav.Link onClick={login}>
                        ?????????
                    </Nav.Link>
                  </>
                  }
                  <Nav.Link as={Link} to={'order'}>
                    ????????????
                  </Nav.Link>  
                  <Nav.Link as={Link} to={'voucher'}>
                    ?????????
                  </Nav.Link>
                  <Nav.Link as={Link} to={'event'}>
                    ?????????
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

