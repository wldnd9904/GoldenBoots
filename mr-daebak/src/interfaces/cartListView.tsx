import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styled from 'styled-components';
import Image from 'react-bootstrap/Image';
import RecentOrderView from './recentOrderView';
import { IOrder } from '../Order/Order';
import { userDataAtom } from '../People/PeopleManager';
import { useRecoilState, useRecoilValue } from 'recoil';
import { orderListAtom } from '../Order/OrderManager';


const OverLay = styled.div`
  position:fixed;
  bottom:10px;
  right:10px;
  :hover{
    transition:transform 0.1s linear;
    transform:scale(1.1);
  }
`;

function CartList() {
  const userData = useRecoilValue(userDataAtom);
  const [orderList, setOrderList] = useRecoilState(orderListAtom);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
//<a href="https://www.flaticon.com/kr/free-icons/" title=" 아이콘"> 아이콘  제작자: DinosoftLabs - Flaticon</a>
  return (
    <>
    <OverLay style={{zIndex:3}}>
      <Image width="50px" rounded onClick={handleShow} src="https://cdn-icons-png.flaticon.com/512/438/438605.png"/>
    </OverLay>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>장바구니</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {userData?
          <>
            최근 주문 내역
            <RecentOrderView onAdd={function (order: IOrder): void {
              throw new Error('Function not implemented.');
            } } />
          </>
          :
          null
        }
        {
          orderList.map((order:IOrder,idx)=>
            <></>
          )
        }
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CartList;