import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { ReactNode, useState } from 'react';
import AddressSelectorView from './addressSelectorView';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { IOrder } from '../Order/Order';
import { Badge, CloseButton, Form, Tab, Tabs } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userDataAtom } from '../People/PeopleManager';
import OrderManager, { orderListAtom } from '../Order/OrderManager';
import { detailListAtom, dinnerListAtom, styleListAtom } from '../Order/MenuManager';
import { IStyle } from '../Order/Menu';

const Hover=styled.div`
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  :hover{
    transition:transform 0.1s linear;
    transform:scale(1.02);
    z-index:2;
  }
`;

interface IOrderProps {
    idx:number;
    params:IOrder;
}

function Order({idx,params}:IOrderProps) {
  const userData = useRecoilValue(userDataAtom);
  const styleList = useRecoilValue(styleListAtom);
  const dinnerList = useRecoilValue(dinnerListAtom);
  const [orderList, setOrderList] = useRecoilState(orderListAtom);
  const detailedMenuTypeList = useRecoilValue(detailListAtom);
  const [detailList, setDetailList] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const { register, handleSubmit, formState:{errors},clearErrors, setValue, setError, reset, getValues} = useForm<IOrder>();
  const handleOpen = async () => {
    reset();
    console.log(params);
    Object.keys(params).map(key=>{
        setValue(key,params[key]);
    })
    setDetailList([...Object.keys(params)]);
    setShow(true);
  }
  const setStyle = (style:IStyle) => {
    reset();
    setValue("dinnerID", params.dinnerID);
    setValue("dinner_name", params.dinner_name);
    setValue("styleID",style.styleID);
    setValue("style_name", params.style_name);
    setValue("userID", userData?userData.userID:"");
    setDetailList([]);
    setDetailList([...Object.keys(params),...Object.keys(style)]);
    detailList.map((detail)=>console.log(detailedMenuTypeList[detail]))
  }
  const handleClose = () => {
    setShow(false);
  }
  const onValid = async (data:IOrder) => {
    if(data.address1==null||data.address2==null){
      setError('address1',{message:"???????????? ??????????????????."})
      return;
    }
    data.description="pending";
    if(userData)data.phone=userData.phone;
    setOrderList(OrderManager.editOrder([...orderList],idx,data));
    if(getValues().description=="pending")
      await OrderManager.editSentOrder(data);
    console.log(data);
    handleClose();
  };
  const remove = () =>{
    setOrderList(OrderManager.removeOrder([...orderList],idx));
  }
  return (
    <>
      <Card as={Hover} style={{ width: '22rem', margin:"3px" }}>
        <Card.Header>
          <Card.Title>{params.dinner_name}
          <CloseButton style={{float:"right"}} onClick={remove}/>
          </Card.Title>
        </Card.Header>
        <Card.Body  onClick={handleOpen}>
          <Card.Subtitle>{params.style_name}</Card.Subtitle>
          <Card.Text>{params.address1}</Card.Text>
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
            <Tabs className="mb-3" defaultActiveKey={`${params.styleID}`} onSelect={(key)=>setStyle(styleList[parseInt(key?key:"0")])}>
              {styleList.map((style, idx) =>
              <Tab key={idx} eventKey={idx} title={style.style_name}/>)
              }
            </Tabs>
            {detailList.map((key:string,idx)=>(
              (
                detailedMenuTypeList[key]===undefined)?null:
                <div key={idx}>
                  <Form.Group key={idx} className="mb-3" controlId={`${idx}`}>
                    <Form.Label>{detailedMenuTypeList[key]?.label}:</Form.Label>
                    <Form.Label>{{
                          "Q": `${["??????","??????","??????","??????"][params[key]?params[key]:2]}`,
                          "C": `${params[key]?params[key]:1}`,
                          "B": `${["??????","??????"][params[key]?params[key]:2]}`,
                        }[detailedMenuTypeList[key]?.type]}</Form.Label>
                    <Form.Range                   
                        step={1}
                        min={0}
                        max={{
                          "Q": 3,
                          "C": 5,
                          "B": 1,
                        }[detailedMenuTypeList[key]?.type]}
                        defaultValue={params[key]?params[key]:{
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
                                case "0": value="??????";break;
                                case "1": value="??????";break;
                                case "2": value="??????";break;
                                case "3": value="??????";break;
                                default: value="error"
                              }
                              e.currentTarget.previousElementSibling.textContent=value;
                            }
                            break;
                            case "C": e.currentTarget.previousElementSibling.textContent=e.currentTarget.value;break;
                            case "B": e.currentTarget.previousElementSibling.textContent=(e.currentTarget.value=="1"?"??????":"??????");break;
                            default:break;
                          }
                          }
                        }
                        />
                  </Form.Group>
                  {
                  detailedMenuTypeList[key]?.name=="steak"?
                    <Form.Group key={"grillType"} className="mb-3" controlId={`${idx}`}>
                    <Form.Label>{detailedMenuTypeList[key]?.label}:</Form.Label>
                    <Form.Label>{`${["??????","????????? ??????","?????????","????????? ??????","??????"][params.grillType?parseInt(params.grillType):2]}`}</Form.Label>
                    <Form.Range                   
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
                                case "0": value="??????";break;
                                case "1": value="????????? ??????";break;
                                case "2": value="?????????";break;
                                case "3": value="????????? ??????";break;
                                case "4": value="??????";break;
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
            <Form.Group>
              <Form.Label>????????????</Form.Label>
              <Form.Control {...register("time", {required:"?????? ???????????????."})} defaultValue={`${params.time}`} type="time" placeholder="" />
              {errors?.time? (<Badge bg="secondary">{`${errors?.time?.message}`}</Badge>):null}
            </Form.Group>
            {userData?
              <>
              <Form.Group>
                <Form.Label>??????</Form.Label>
                <AddressSelectorView
                selected={params.address1}
                selectable={true}
                onSelect={(address)=>{
                  setValue("address1",address.address1);
                  setValue("address2",address.address2);
                  clearErrors("address1");
                }}
                onDelete={()=>{}}/>
                {errors?.address1? (<Badge bg="secondary">{`${errors?.address1?.message}`}</Badge>):null}
              </Form.Group>
              </>
              :
              <>
              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>????????????</Form.Label>
                <Form.Control {...register("phone", {
                  required:"?????? ???????????????.",
                  pattern:{
                    value:/^[0-9]{9,11}$/,
                    message:"???????????? ????????? ?????? ????????????."
                  }})} type="tel" placeholder="01012345678"/>
                {errors?.phone? (<Badge bg="secondary">{`${errors?.phone?.message}`}</Badge>):null}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAddress1">
                <Form.Label>??????</Form.Label>
                <Form.Control {...register("address1", {required:"?????? ???????????????."})} type="text" placeholder="??????????????? ???????????? ????????? ??????????????????" />
                {errors?.address1? (<Badge bg="secondary">{`${errors?.address1?.message}`}</Badge>):null}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formAddress2">
                <Form.Label>????????????</Form.Label>
                <Form.Control {...register("address2", {required:"?????? ???????????????."})} type="text" placeholder="??????????????? 326???" />
                {errors?.address2? (<Badge bg="secondary">{`${errors?.address2?.message}`}</Badge>):null}
              </Form.Group>
              </>
            }
            </>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
                  ??????
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Order;