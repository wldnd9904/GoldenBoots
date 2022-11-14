import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import DetailedMenu from './detailedMenuView';
import { detailedMenuTypeList, IDetailedMenuType, IMenu } from '../Order/Menu';

function Menu(params:IMenu) {
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={params.src_thumbnail} />
        <Card.Body>
          <Card.Title>{params.dinner_name}</Card.Title>
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
          <Modal.Title>{params.dinner_name}</Modal.Title>
        </Modal.Header>
        <img alt={params.dinner_name} src={params.src_big} />
        <Modal.Body>
          {detailedMenuTypeList.map((detail:IDetailedMenuType,idx)=>(
            detail.name in params && params[detail.name as keyof IMenu]!==undefined?
            <DetailedMenu key={detail.label} name={detail.name} label={detail.label} type={detail.type} price={detail.price}/>
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