import React from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useForm } from 'react-hook-form';
import { IPeople, IRegisterForm } from '../People/People';
import PeopleManager from '../People/PeopleManager';

interface IModal{
  show: boolean;
  handleClose: ()=>void;
};

function RegisterForm({show, handleClose}:IModal) {
  const { register, handleSubmit, formState:{errors}, setError, reset} = useForm<IRegisterForm>();
  const onValid = (data:IRegisterForm) => {
    if(data.password1 !== data.password){
      setError("password1", {message:"비밀번호가 일치하지 않습니다."},{shouldFocus:true});
      return;
    }
    console.log(data);
    PeopleManager.register(data);
    //reset();
    //alert("회원가입이 완료되었습니다. 로그인 해 주세요.");
    //handleClose();
  };
  console.log(errors);
  return (
    <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>회원가입</Modal.Title>
      </Modal.Header>
        <Form onSubmit={handleSubmit(onValid)}>
      <Modal.Body>
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
                })} type="ID" placeholder="ID" />
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
            <Form.Group as={Col} controlId="formPassword">
              <Form.Label>비밀번호 확인</Form.Label>
              <Form.Control {...register("password1", {required:"값이 필요합니다."})} type="password" placeholder="Password" />
              {errors?.password1? (<Badge bg="secondary">{`${errors?.password1?.message}`}</Badge>):null}
            </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control {...register("email", {
              required:"값이 필요합니다.",
              pattern:{
                value: /^\w+@((\w)+\.)+\w+$/,
                message: "이메일 형식이 맞지 않습니다."
              }
            })} type="email" placeholder="heungmin@uos.ac.kr" />
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

          {errors?.extraError? (<Badge bg="secondary">{`${errors?.extraError?.message}`}</Badge>):null}
      </Modal.Body>
      <Modal.Footer>
          <Button variant="primary" type="submit">
              회원가입
          </Button>
      </Modal.Footer>
        </Form>
    </Modal>
  );
}

export default RegisterForm;