import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { IEvent } from '../Homepage/Event';
import styled from 'styled-components';

const Hover=styled.div`
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  :hover{
    transition:transform 0.1s linear;
    transform:scale(1.02);
    z-index:2;
  }
`;

function EventView(params:IEvent) {
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <>
      <Card as={Hover} style={{ width: '22rem' }} onClick={handleOpen}>
        <Card.Img loading="lazy" variant="top" src={params.src_thumbnail} />
        <Card.Body>
          <Card.Title>{params.name}</Card.Title>
        </Card.Body>
      </Card>
      <Modal
      size='xl'
      show={show}
      onHide={handleClose}
      keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{params.name}</Modal.Title>
          <h2>{`${params.from} ~ ${params.to}`}</h2>
        </Modal.Header>
        <Modal.Body>
        <img width="100%" alt={params.name} src={params.src_big} />
        </Modal.Body>
        <Modal.Footer>
            {   params.voucherID!==-1?
                <Button variant="primary" type="submit">
                쿠폰 수령하기
                </Button>
                :
                null
            }
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EventView;