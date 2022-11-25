import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { CloseButton, Form } from 'react-bootstrap';
import { IVoucher, VoucherClass } from '../Homepage/Voucher';
import VoucherManager from '../Homepage/VoucherManager';
import { IOrder, OrderClass } from '../Order/Order';
import { useRecoilState, useRecoilValue } from 'recoil';
import MenuManager, { detailListAtom } from '../Order/MenuManager';
import { IPeople } from '../People/People';
import PeopleManager from '../People/PeopleManager';
import OrderManager from '../Order/OrderManager';
import StockManager from '../Resources/StockManager';


const Hover=styled.div`
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  :hover{
    transition:transform 0.1s linear;
    transform:scale(1.02);
    z-index:2;
  }
`;

function StaffOrder(param:IOrder) {
  const [detailList,setDetailList] = useRecoilState(detailListAtom);
  const [userData,setUserData] = useState<IPeople>();
  const [show, setShow] = useState(false);
  const [keys, setKeys] = useState<string[]>([]);
  const { register, handleSubmit, formState:{errors},clearErrors, setValue, setError, reset, getValues, watch} = useForm<IOrder>();
  const handleOpen = async () => {
    if(!detailList)setDetailList(await MenuManager.getDetailedMenuTypeList());
    if(param.userID!=""||param.userID)setUserData(await PeopleManager.getUserData(param.userID?param.userID:""));
    setShow(true);
    setKeys(Object.keys(param));
    reset(param);
  }
  const handleClose = () => setShow(false);
  const alter = async () => {
    const nextState={
      "pending":"confirmed",
      "confirmed":"cooking",
      "cooking":"delivering",
      "delivering":"deliveryfinished",
      default:"cancelled",}[param.description?param.description:""];
    if(nextState=="cooking"){
        const stockList:{name:string,count:number}[]=[];
        keys.forEach(key=>{
          if(detailList[key]&&param[key])stockList.push({name:detailList[key].name, count:param[key]})})
        console.log(stockList);
        await StockManager.removeStock(stockList);
    }
    await OrderManager.alterOrderState(param.orderID?param.orderID:0,nextState?nextState:"cancelled");
  };
  const reject = async() => {
    await OrderManager.alterOrderState(param.orderID?param.orderID:0,"rejected");
  }
  return (
    <>
      <Card as={Hover} style={{ width: '40rem' }}
        border={
          {
            "pending":"danger",
            "confirmed":"primary",
            "cooking":"warning",
            "delivering":"info",
            "deliveryfinished":"success",
            default:"dark",
          }[param.description?param.description:""]
        }>
        <Card.Body>
          <Card.Title>{`${{
            "pending":"대기 중",
            "confirmed":"수락됨",
            "cooking":"요리 중",
            "delivering":"배송 중",
            "deliveryfinished":"배송 완료",
            "cancelled":"취소됨",
            "rejected":"거절됨",
            default:"",
          }[param.description?param.description:""]}: ${param.dinner_name}, ${param.style_name}`}</Card.Title>
          <Card.Subtitle>{`${param.time},${param.phone}`}</Card.Subtitle>
          <Button variant="primary" onClick={handleOpen}>상세 보기</Button>
          {["pending","confirmed","cooking","delivering"].includes(param.description?param.description:"")?<Button variant="primary" onClick={alter}>{
          {
            "pending":"수락",
            "confirmed":"요리 시작",
            "cooking":"배송 시작",
            "delivering":"배송 완료",
            default:"",
          }[param.description?param.description:""]}
        </Button>:null}
        {(param.description?param.description:"")=="pending"?<Button variant="danger" onClick={reject}>거절</Button>:null}
        </Card.Body>
      </Card>
    <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>주문 정보</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {param?
          keys.map((key,idx)=>(
            param[key]?
            <Form.Group key={idx} controlId={`form${key}`}>
              <Form.Label>{detailList[key]?.label?detailList[key].label:key}</Form.Label>
              <Form.Control {...register(key, {required:false})} type="text" disabled/>
            </Form.Group>
            :null)
          )
          :
          null
          }
        </Form>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default StaffOrder;