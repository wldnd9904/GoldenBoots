import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { IEvent } from '../Homepage/Event';


function EventView(params:IEvent) {
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <>
      <Card style={{ width: '18rem' }} onClick={handleOpen}>
        <Card.Img variant="top" src={params.src_thumbnail} />
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
          <p>{" " + params.from + " ~ " + params.to}</p>
        </Modal.Header>
        <Modal.Body>
        <img width="100%" src={params.src_big} />
        </Modal.Body>
        <Modal.Footer>
            {   params.voucherID!=0?
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