import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { ReactNode, useState } from 'react';
import AddressSelectorView from './addressSelectorView';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { IOrder } from '../Order/Order';
import { Badge, Form, Tab, Tabs } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userDataAtom } from '../People/PeopleManager';
import OrderManager, { orderListAtom } from '../Order/OrderManager';
import { detailListAtom, dinnerListAtom, styleListAtom } from '../Order/MenuManager';
import { IDinner, IStyle } from '../Order/Menu';

const Hover=styled.div`
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  :hover{
    transition:transform 0.1s linear;
    transform:scale(1.02);
    z-index:2;
  }
`;

function Menu(params:IDinner) {
  const userData = useRecoilValue(userDataAtom);
  const detailedMenuTypeList = useRecoilValue(detailListAtom);
  const dinnerList = useRecoilValue(dinnerListAtom);
  const [orderList, setOrderList] = useRecoilState(orderListAtom);
  const styleList = useRecoilValue(styleListAtom);
  const [detailList, setDetailList] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const { register, handleSubmit, formState:{errors},clearErrors, setValue, setError, reset, getValues, watch} = useForm<IOrder>();
  const handleOpen = () => {
    reset();
    setStyle(styleList[0]);
    setShow(true);
  }
  const setStyle = (style:IStyle) => {
    reset();
    setValue("dinnerID", params.dinnerID);
    setValue("dinner_name", params.dinner_name);
    setValue("styleID",style.styleID);
    setValue("style_name", style.style_name);
    setValue("userID", userData?userData.userID:"");
    Object.keys(params).map((key)=>{
      setValue(key,params[key]);
    })
    setDetailList([...Object.keys(params),...Object.keys(style)]);
    detailList.map((detail)=>console.log(detailedMenuTypeList[detail]))
  }
  const handleClose = () => setShow(false);
  const onValid = (data:IOrder) => {
    if(data.address1==null||data.address2==null){
      setError('address1',{message:"주소지를 선택해주세요."})
      return;
    }
    setOrderList(OrderManager.addOrder([...orderList],data));
    alert("주문을 장바구니에 담았습니다.")
    handleClose();
    console.log(data);
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
            <>
            <Tabs className="mb-3" defaultActiveKey={"0"} onSelect={(key)=>setStyle(styleList[parseInt(key?key:"0")])}>
              {styleList.map((style, idx) =>
              <Tab key={`tab_${idx}`} eventKey={idx} title={style.style_name}/>)
              }
            </Tabs>
            {detailList.map((key:string,idx)=>(
              (
                detailedMenuTypeList[key]===undefined)?null:
                <div key={idx}>
                  <Form.Group key={idx} className="mb-3" controlId={`${idx}`}>
                    <Form.Label key={`${idx}_1`}>{detailedMenuTypeList[key]?.label}:</Form.Label>
                    <Form.Label key={`${idx}_2`}>{{
                          "Q": "보통",
                          "C": 1,
                          "B": "넣기",
                        }[detailedMenuTypeList[key]?.type]}</Form.Label>
                    <Form.Range 
                        key={`${idx}_3`}            
                        step={1}
                        min={0}
                        max={{
                          "Q": 3,
                          "C": 5,
                          "B": 1,
                        }[detailedMenuTypeList[key]?.type]}
                        defaultValue={
                          params[key]?params[key]
                          :{
                          "Q": 2,
                          "C": 1,
                          "B": 1,
                        }[detailedMenuTypeList[key]?.type]}
                        {...register(`${(detailedMenuTypeList[key]?.name as keyof IOrder)}`)}
                        onChange={(e)=>{
                          setValue(`${detailedMenuTypeList[key]?.name as keyof IOrder}`,e.currentTarget.value)
                          if(e.currentTarget.previousElementSibling)
                          switch(detailedMenuTypeList[key]?.type){
                            case "Q": {
                              let value="";
                              switch(e.currentTarget.value){
                                case "0": value="빼기";break;
                                case "1": value="적게";break;
                                case "2": value="보통";break;
                                case "3": value="많이";break;
                                default: value="error"
                              }
                              e.currentTarget.previousElementSibling.textContent=value;
                            }
                            break;
                            case "C": e.currentTarget.previousElementSibling.textContent=e.currentTarget.value;break;
                            case "B": e.currentTarget.previousElementSibling.textContent=(e.currentTarget.value=="1"?"넣기":"빼기");break;
                            default:break;
                          }
                          }
                        }
                        />
                  </Form.Group>
                  {
                  detailedMenuTypeList[key]?.name=="steak"?
                    <Form.Group key={"grillType"} className="mb-3" controlId={`grillType`}>
                    <Form.Label key={`grillType_1`}>{detailedMenuTypeList[key]?.label}:</Form.Label>
                    <Form.Label key={`grillType_2`}>미디움</Form.Label>
                    <Form.Range
                        key={`grillType_3`}                  
                        step={1}
                        min={0}
                        max={4}
                        defaultValue={params[key]?params[key]:2}
                        {...register(("grillType"))}
                        onChange={(e)=>{
                          setValue("grillType",e.currentTarget.value)
                          if(e.currentTarget.previousElementSibling){
                              let value="";
                              switch(e.currentTarget.value){
                                case "0": value="레어";break;
                                case "1": value="미디움 레어";break;
                                case "2": value="미디움";break;
                                case "3": value="미디움 웰던";break;
                                case "4": value="웰던";break;
                                default: value="error";break;
                              }
                              e.currentTarget.previousElementSibling.textContent=value;
                            }
                          }
                        }/>
                    </Form.Group>
                    :null
                  }
                </div>
              ))}
            {userData?
              <Form.Group>
                <Form.Label>주소</Form.Label>
                <AddressSelectorView
                selectable={true}
                onSelect={(address)=>{
                  setValue("address1",address.address1);
                  setValue("address2",address.address2);
                  clearErrors("address1");
                }}
                onDelete={()=>{}}/>
                {errors?.address1? (<Badge bg="secondary">{`${errors?.address1?.message}`}</Badge>):null}
              </Form.Group>
              :
              <>
              <Form.Group className="mb-3" controlId="formAddress1">
                <Form.Label>주소</Form.Label>
                <Form.Control {...register("address1", {required:"값이 필요합니다."})} type="text" placeholder="서울특별시 동대문구 전농동 서울시립대로" />
                {errors?.address1? (<Badge bg="secondary">{`${errors?.address1?.message}`}</Badge>):null}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAddress2">
                <Form.Label>상세주소</Form.Label>
                <Form.Control {...register("address2", {required:"값이 필요합니다."})} type="text" placeholder="정보기술관 326호" />
                {errors?.address2? (<Badge bg="secondary">{`${errors?.address2?.message}`}</Badge>):null}
              </Form.Group>
              </>
            }
            </>
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