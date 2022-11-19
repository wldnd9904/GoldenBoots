import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { ReactNode, useState } from 'react';
import DetailedMenu from './detailedMenuView';
import { detailedMenuTypeList, IDetailedMenuType, IMenu } from '../Order/Menu';
import AddressSelectorView from './addressSelectorView';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { IOrder } from '../Order/Order';
import { Badge, Form } from 'react-bootstrap';
import { Range } from 'react-range';
import { IRenderThumbParams, IRenderTrackParams } from 'react-range/lib/types';

const Hover=styled.div`
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  :hover{
    transition:transform 0.1s linear;
    transform:scale(1.02);
    z-index:2;
  }
`;

function Menu(params:IMenu) {
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  const { register, handleSubmit, formState:{errors},reset, setValue, watch} = useForm<IOrder>();
  const onValid = async (data:IOrder) => {
    //TODO: ordermanager에서 장바구니에 추가하기/장바구니 새로고침
    console.log(data);
    alert("주문완료~");
  };
  return (
    <>
      <Card as={Hover} style={{ width: '22rem' }}>
        <Card.Img loading="eager" variant="top" src="https://via.placeholder.com/300x200?text=+" alt="placeholder"/>
        <Card.Img loading="lazy" variant="top" src={params.src_thumbnail} onLoad={(e)=>e.currentTarget.previousElementSibling?.remove()}/>
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
        <img loading="eager" src="https://via.placeholder.com/512x412?text=+" alt="placeholder"/>
        <img loading="lazy" alt={params.dinner_name} src={params.src_big} onLoad={(e)=>e.currentTarget.previousElementSibling?.remove()}/>
        <Form onSubmit={handleSubmit(onValid)}>
          <Modal.Body>
            {detailedMenuTypeList.map((detail:IDetailedMenuType,idx)=>(
              detail.name in params && params[detail.name as keyof IMenu]!==undefined?
              <Form.Group key={idx} className="mb-3" controlId={`${idx}`}>
                <Form.Label>{detail.label}</Form.Label>
                <Form.Control {...register((detail.name as keyof IOrder))} type="range" />
              </Form.Group>
              :
              null
            ))}
            <AddressSelectorView selectable={true} onSelect={function (a: number): void {
              throw new Error('Function not implemented.');
            } } onDelete={function (a: number): void {
              throw new Error('Function not implemented.');
            } } />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
                  장바구니에 담기
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Menu;