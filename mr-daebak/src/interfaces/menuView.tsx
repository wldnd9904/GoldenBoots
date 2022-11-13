import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import {IMenu, IOrder} from '../Order/Order';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import DetailedMenu from './detailedMenuView';

let order:IOrder;

const detailList:string[] = ['salad','steak','egg_scramble','bacon','bread','bread_baguette','coffee','wine','champagne','box_plate','nepkin_normal','heart_little','cupid','plate_normal','tray_plastic','glass_plastic','plate_ceramic','glass_ceramic','nepkin_white_cotton','tray_wood','vase_flower','nepkin_linen'];

function Menu(params:IMenu) {
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  const [radioValue, setRadioValue] = useState('1');
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
          {detailList.map((detail:string,idx)=>(
            eval('params.'+detail)?
            <DetailedMenu id={idx} name={detail} isCountable={eval('params.'+detail)} action={(value:string)=>(null)}/>
            :
            null
          ))}
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