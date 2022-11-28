import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styled from 'styled-components';
import Image from 'react-bootstrap/Image';
import RecentOrderView from './recentOrderView';
import { IOrder } from '../Order/Order';
import { userDataAtom } from '../People/PeopleManager';
import { useRecoilState, useRecoilValue } from 'recoil';
import OrderManager, { orderListAtom, recentOrderAtom } from '../Order/OrderManager';
import Order from './orderView';
import VoucherManager, { voucherDataAtom } from '../Homepage/VoucherManager';
import { detailListAtom } from '../Order/MenuManager';
import { Col, Form, Row } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { IVoucher } from '../Homepage/Voucher';


const OverLay = styled.div`
  position:fixed;
  bottom:10px;
  left:10px;
  :hover{
    transition:transform 0.1s linear;
    transform:scale(1.1);
  }
`;

function CartList() {
  const userData = useRecoilValue(userDataAtom);
  const [orderList,setOrderList] = useRecoilState(orderListAtom);
  const [show, setShow] = useState(false);
  const [purchaseShow, setPurchaseShow] = useState(false);
  const [voucherList, setVoucherList] = useRecoilState(voucherDataAtom);
  const [recentOrderList, setRecentOrderList] = useRecoilState(recentOrderAtom);
  const detailedMenuTypeList = useRecoilValue(detailListAtom);
  const [receipt, setReceipt] = useState<string[]>([]);
  const [voucher, setVoucher] = useState<number>(-1);
  let sumPrice = 0;
  const [price, setPrice] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handlePurchaseClose = () => setPurchaseShow(false);
  const handleSend = async () => {
    console.log("gd");
    await OrderManager.sendOrder(orderList);
    console.log("gd");
    if(userData&&voucher!=-1){
      console.log("gd");
      await VoucherManager._useVoucher(userData.userID, voucher);}
    alert("결제 완료되었습니다.");
    if(userData)setVoucherList(await VoucherManager.getVouchers(userData.userID));
    if(userData)setRecentOrderList(await OrderManager.getRecentOrder(userData.userID));
    setOrderList([]);
    handlePurchaseClose();
    handleClose();
  }
  const handlePurchaseShow = async () => {
    if(userData&&!voucherList)setVoucherList(await VoucherManager.getVouchers(userData.userID));
    sumPrice = 0;
    let tmpReceipt:string[]=[];
    for(let idx=0;idx<orderList.length;idx++){
      let menuReceipt=`주문 ${idx}:`;
      let menuPrice=0;
      Object.keys(detailedMenuTypeList).forEach(key=>{
        if(orderList[idx][key]!=undefined){
          menuPrice += detailedMenuTypeList[key].price * orderList[idx][key];
          menuReceipt += `\n....${detailedMenuTypeList[key].label} x ${orderList[idx][key]}: ${detailedMenuTypeList[key].price * orderList[idx][key]}원`;
        }
      })
      if(orderList[idx].dinner_price){
        menuPrice += orderList[idx].dinner_price as number;
        menuReceipt += `\n....${orderList[idx].dinner_name}: ${orderList[idx].dinner_price}원`
      }
      if(orderList[idx].style_price){
        menuPrice += orderList[idx].style_price as number;
        menuReceipt += `\n....${orderList[idx].style_name}: ${orderList[idx].style_price}원`
      }
      menuReceipt += `\n........계: ${menuPrice}`
      sumPrice+=menuPrice;
      tmpReceipt.push(menuReceipt);
    }
    setPrice(sumPrice);
    setReceipt(tmpReceipt);
    setPurchaseShow(true);
  }
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
            <RecentOrderView />
          </>
          :
          null
        }
        {
          orderList.map((order:IOrder,idx)=>
            <Order key={idx} idx={idx} params={order} />
          )
        }
        <div style={{marginTop:"15px"}}>{orderList.length!=0?<Button variant="outline-primary" onClick={handlePurchaseShow}>주문하기</Button>:"장바구니에 주문이 없습니다."}</div>
        </Offcanvas.Body>
      </Offcanvas>
      <Modal
    show={purchaseShow}
    onHide={handlePurchaseClose}
    backdrop="static"
    keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>결제</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {receipt.map((item)=>((item.split("\n").map(line=><p key={`${item}_${line}`}>{line}</p>))))}
        <Form style={{margin:"10px"}}>
          <Form.Group controlId="formVoucher">
            <Form.Label>상품권</Form.Label>
              <Form.Select onChange={(e)=>setVoucher(+e.currentTarget.value)}> 
                  <option value={-1}>선택안함</option>
                  {voucherList?
                    voucherList.map((voucher:IVoucher,idx)=>(
                      <option key={idx} value={voucher.voucherID}>{`${voucher.voucherName}: ${voucher.price}원`}</option>))
                      :null
                  }
              </Form.Select>
            </Form.Group>
          <Form.Group className="mt-3 mb-1" controlId="formCardNumber">
            <Form.Label>카드 정보</Form.Label>
              <Form.Control type="text" placeholder="카드번호" />
          </Form.Group>
          <Row>
          <Form.Group as={Col} controlId="formMMYY">
              <Form.Control type="text" placeholder="MM/YY" />
          </Form.Group>
          <Form.Group as={Col} controlId="formCVC">
              <Form.Control type="text" placeholder="CVC" />
          </Form.Group>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSend}>
          {price-(voucherList?voucherList[voucher]?voucherList[voucher].price as number:0:0)}원 결제하기
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default CartList;