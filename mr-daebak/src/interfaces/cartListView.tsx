import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styled from 'styled-components';
import Image from 'react-bootstrap/Image';


const OverLay = styled.div`
  position:fixed;
  bottom:10px;
  right:10px;
`;

function CartList() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
//<a href="https://www.flaticon.com/kr/free-icons/" title=" 아이콘"> 아이콘  제작자: DinosoftLabs - Flaticon</a>
  return (
    <>
    <OverLay>
      <Image width="50px" rounded onClick={handleShow} src="https://cdn-icons-png.flaticon.com/512/438/438605.png"/>
    </OverLay>
    

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CartList;