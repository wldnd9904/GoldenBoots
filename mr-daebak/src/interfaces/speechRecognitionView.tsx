import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useRecoilState, useRecoilValue } from 'recoil';
import OrderManager, { orderListAtom } from '../Order/OrderManager';
import MenuManager, { detailListAtom, dinnerListAtom, styleListAtom } from '../Order/MenuManager';
import { IOrder } from '../Order/Order';
import { Badge, Button, Card, Form } from 'react-bootstrap';
import AddressSelectorView from './addressSelectorView';
import { useForm } from 'react-hook-form';
import { userDataAtom } from '../People/PeopleManager';

interface IModalForm{
    show: boolean;
    handleClose: ()=>void;
  };
interface IOrderForm{
  address1:string;
  address2:string;
  time:string;
  phone:string;
}
function SpeechRecognitionView({show, handleClose}:IModalForm) {
  const userData = useRecoilValue(userDataAtom);
  const [orderList, setOrderList] = useRecoilState(orderListAtom);
  const [newOrderList, setNewOrderList] = useState<IOrder[]>([]);
  const [detailList, setDetailList] = useRecoilState(detailListAtom);
  const [dinnerList, setDinnerList] = useRecoilState(dinnerListAtom);
  const [styleList, setStyleList] = useRecoilState(styleListAtom);
  const {transcript,listening,resetTranscript,browserSupportsSpeechRecognition} = useSpeechRecognition();
  const { register, handleSubmit, formState:{errors},clearErrors, setValue, setError, reset, getValues, watch} = useForm<IOrderForm>();
  useEffect(()=>{(async ()=>{
    if(!detailList)setDetailList(await MenuManager.getDetailedMenuTypeList());
    if(!dinnerList)setDinnerList(await MenuManager.getDinnerList());
    if(!styleList)setStyleList(await MenuManager.getStyleList());
  })();},[]);
  const onValid = (data:IOrderForm) => {
  if(userData)setValue("phone",userData.phone);
  if(data.address1==null||data.address2==null){
    setError('address1',{message:"주소지를 선택해주세요."})
    return;
  }
    SpeechRecognition.startListening({continuous:true, language:"ko"});
  }
  const stopListening = () =>{
    SpeechRecognition.stopListening();
    setNewOrderList(OrderManager.textToOrder(transcript,dinnerList,styleList,detailList,userData?userData.userID:"",userData?userData.phone:getValues().phone,getValues().address1,getValues().address2,getValues().time));
  }
  const addToCart = (order:IOrder)=>{
    setOrderList(OrderManager.addOrder([...orderList],order));
    alert("주문을 장바구니에 담았습니다. 주문하기 메뉴에서 확인해 주세요.")
  }
  return (
        <Modal
        show={show}
        onHide={handleClose}
        keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>음성 주문</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
                !browserSupportsSpeechRecognition?
                <span>브라우저가 음성 인식을 지원하지 않습니다.</span>
                :
                <>
                <Form onSubmit={handleSubmit(onValid)}>
                <Form.Group>
                <Form.Label>예약시간</Form.Label>
                <Form.Control {...register("time", {required:"값이 필요합니다."})} defaultValue={`${OrderManager.getDefaultTime()}`} type="time" placeholder="" />
                {errors?.time? (<Badge bg="secondary">{`${errors?.time?.message}`}</Badge>):null}
              </Form.Group>
            {userData?
            <>
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
              </>
              :
              <>
              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>전화번호</Form.Label>
                <Form.Control {...register("phone", {
                  required:"값이 필요합니다.",
                  pattern:{
                    value:/^[0-9]{9,11}$/,
                    message:"전화번호 형식이 맞지 않습니다."
                  }})} type="tel" placeholder="01012345678"/>
                {errors?.phone? (<Badge bg="secondary">{`${errors?.phone?.message}`}</Badge>):null}
              </Form.Group>
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
                <div>
                    <p>{listening ? '음성 인식 중' : '대기 중'}</p>
                    <Button variant="outline-primary" type="submit">Start</Button>
                    <Button variant="outline-primary" onClick={stopListening}>Stop</Button>
                    <Button variant="outline-primary" onClick={resetTranscript}>Reset</Button>
                    <p>{transcript}</p>
                </div>
            </Form>
                </>
            }
                {newOrderList?newOrderList.map((order,idx)=>(
                    <Card key={idx}>
                      <Card.Header>
                      <Card.Title>{`${order.dinner_name}:${order.style_name}`}</Card.Title>
                      </Card.Header>
                      <Card.Body>
                        <Button style={{float:"right"}} variant="outline-primary" onClick={()=>{addToCart(order)}}>장바구니에 추가</Button>
                      </Card.Body>
                    </Card>)):null}
          </Modal.Body>
          <Modal.Footer>

          </Modal.Footer>
        </Modal>
  );
};
export default SpeechRecognitionView;