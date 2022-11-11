import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import {IMenu} from '../Order/Order';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image } from 'react-bootstrap';

interface IRadio{
  name: string,
  value: string,
}

function Menu(params:IMenu) {
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  const [radioValue, setRadioValue] = useState('1');
  const radios = [
    { name: '빼기', value: '1' },
    { name: '적당히', value: '2' },
    { name: '많이', value: '3' },
  ];
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={params.src_thumb} />
        <Card.Body>
          <Card.Title>{params.name}</Card.Title>
          <Card.Text>
            {params.desc}
          </Card.Text>
          <Button variant="primary" onClick={handleOpen}>주문하기</Button>
        </Card.Body>
      </Card>
      <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{params.name}</Modal.Title>
        </Modal.Header>
        <img src={params.src_big} />
        <Modal.Body>
          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                name="radio"
                value={radio.value}
                checked={radioValue == radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit">
                장바구니에 담기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Menu;