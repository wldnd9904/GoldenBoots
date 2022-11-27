import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { ReactNode, useState } from 'react';
import AddressSelectorView from './addressSelectorView';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { IOrder } from '../Order/Order';
import { Badge, CloseButton, Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import PeopleManager, { userDataAtom, userDataListAtom } from '../People/PeopleManager';
import OrderManager, { orderListAtom } from '../Order/OrderManager';
import { detailListAtom, dinnerListAtom, styleListAtom } from '../Order/MenuManager';
import { IDinner, IStyle } from '../Order/Menu';
import { IPeople } from '../People/People';

const Hover=styled.div`
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  :hover{
    transition:transform 0.1s linear;
    transform:scale(1.02);
    z-index:2;
  }
`;

function User(params:IPeople) {
  const [show, setShow] = useState(false);
  const [userListData, setUserListData] = useRecoilState(userDataListAtom);
  const { register, handleSubmit, formState:{errors},clearErrors, setValue, setError, reset, getValues, watch} = useForm<IPeople>();
  const handleOpen = () => {
    setShow(true);
    reset(params);
  }
  const handleClose = () => setShow(false);
  const remove = async (userID:string) => {
    await PeopleManager.deleteUser(userID);
    alert("삭제되었습니다.");
    await setUserListData(await PeopleManager.getUserListData());
  } 
  const onValid = async (data:IPeople) => {
    Object.keys(data).forEach(key => {
    if (data[key] === '' || data[key] == null) {
      delete data[key];
    }})
    await PeopleManager.editUserDataStaff(data);
    alert("수정 완료.")
    await setUserListData(await PeopleManager.getUserListData());
    handleClose();
  };
  return (
    <>
      <Card as={Hover} style={{ width: '40rem' }}>
        <Card.Body>
          <CloseButton style={{float:"right"}} onClick={()=>{remove(params.userID)}}/>
          <Card.Title>{`${params.userID}: ${params.name}`}</Card.Title>
          <Button variant="primary" onClick={handleOpen}>수정</Button>
        </Card.Body>
      </Card>
    <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{params.userID}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onValid)}>
            <Form.Group as={Col} controlId="formEmail">
              <Form.Label>아이디</Form.Label>
              <Form.Control {...register("userID", {
                required:"값이 필요합니다.",
                minLength:{
                  value: 5,
                  message: "아이디는 5글자 이상이어야 합니다."
                },
                pattern:{
                  value: /^\w+$/,
                  message: "아이디는 영어와 숫자, 언더바(_)로 이루어져야 합니다."
                }
                })} type="ID" placeholder="ID" disabled/>
              {errors?.userID? (<Badge bg="secondary">{`${errors?.userID?.message}`}</Badge>):null}
            </Form.Group>

            <Form.Group as={Col} controlId="formPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control {...register("password", {
                required:"값이 필요합니다.",
                minLength:{
                  value: 7,
                  message: "비밀번호는 7글자 이상이어야 합니다."
                },
                pattern:{
                  value: /^[A-Za-z0-9!@#$%^&*()_+=-]+$/,
                  message: "비밀번호는 영어와 숫자, 특수문자로 이루어 져야 합니다."
                }
                
                })} type="password" placeholder="Password" />
              {errors?.password? (<Badge bg="secondary">{`${errors?.password?.message}`}</Badge>):null}
              </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control {...register("email", {
              required:"값이 필요합니다.",
              pattern:{
                value: /^\w+@((\w)+\.)+\w+$/,
                message: "이메일 형식이 맞지 않습니다."
              }
            })} type="email" placeholder="heungmin@uos.ac.kr" disabled/>
            {errors?.email? (<Badge bg="secondary">{`${errors?.email?.message}`}</Badge>):null}
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formName">
              <Form.Label>이름</Form.Label>
              <Form.Control {...register("name", {
                required:"값이 필요합니다.",
                pattern:{
                  value:/^[A-Za-z\s가-힣]+$/,
                  message:"이름 형식이 맞지 않습니다."
                }
            })} placeholder="손흥민"/>
              {errors?.name? (<Badge bg="secondary">{`${errors?.name?.message}`}</Badge>):null}
            </Form.Group>

            <Form.Group as={Col} controlId="formSex">
              <Form.Label>성별</Form.Label>
              <Form.Select {...register("sex", {
                required:"값이 필요합니다.",
                pattern:{
                  value:/(남성)|(여성)|(기타)|(선택안함)/,
                  message:"잘못된 값입니다."
                }
            })} defaultValue="Choose...">
                <option>선택안함</option>
                <option>남성</option>
                <option>여성</option>
                <option>기타</option>
              </Form.Select>
              {errors?.sex? (<Badge bg="secondary">{`${errors?.sex?.message}`}</Badge>):null}
            </Form.Group>
          </Row>

          <Form.Group as={Col} controlId="formName">
              <Form.Label>전화번호</Form.Label>
              <Form.Control {...register("phone", {
                required:"값이 필요합니다.",
                pattern:{
                  value:/^[0-9]{9,11}$/,
                  message:"전화번호 형식이 맞지 않습니다."
                }})} type="tel" placeholder="01012345678"/>
              {errors?.phone? (<Badge bg="secondary">{`${errors?.phone?.message}`}</Badge>):null}
            </Form.Group>

          <Form.Group as={Col} controlId="formBornDate">
              <Form.Label>생년월일</Form.Label>
              <Form.Control {...register("birth", {required:"값이 필요합니다."})} type="date" placeholder="yyyy-mm-dd"/>
              {errors?.birth? (<Badge bg="secondary">{`${errors?.birth?.message}`}</Badge>):null}
            </Form.Group>
            <Form.Group as={Col} controlId="formStaff">
              <span>직원</span>
              <Form.Check {...register("isStaff",{required:false})}/>
            </Form.Group>
          <Button variant="primary" type="submit">
              정보 수정
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default User;