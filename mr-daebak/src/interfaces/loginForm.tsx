import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

interface ILoginForm{
  show: boolean;
  isRegister: boolean;
  handleClose: ()=>void;
};

function LoginForm({show, isRegister, handleClose}:ILoginForm) {
  return (
    <Modal
    show={show}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
  >
    {isRegister?
    <>
      <Modal.Header closeButton>
        <Modal.Title>회원가입</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formEmail">
              <Form.Label>아이디</Form.Label>
              <Form.Control type="email" placeholder="ID" />
            </Form.Group>

            <Form.Group as={Col} controlId="formPassword">
              <Form.Label>패스워드</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control placeholder="heungmin@uos.ac.kr" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAddress1">
            <Form.Label>주소</Form.Label>
            <Form.Control placeholder="서울특별시 동대문구 전농동" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAddress2">
            <Form.Label>상세주소</Form.Label>
            <Form.Control placeholder="정보기술관 326호" />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formName">
              <Form.Label>이름</Form.Label>
              <Form.Control placeholder="손흥민"/>
            </Form.Group>

            <Form.Group as={Col} controlId="formSex">
              <Form.Label>성별</Form.Label>
              <Form.Select defaultValue="Choose...">
                <option>선택안함</option>
                <option>남성</option>
                <option>여성</option>
                <option>기타</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formBornDate">
              <Form.Label>생년월일</Form.Label>
              <Form.Control placeholder="yyyy-mm-dd"/>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" id="formStaff">
            <Form.Check type="checkbox" label="직원용 계정" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit">
              회원가입
        </Button>
      </Modal.Footer>
    </>
    :
    <>
      <Modal.Header closeButton>
        <Modal.Title>로그인</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupId">
            <Form.Label>아이디</Form.Label>
            <Form.Control type="id" placeholder="ID" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>패스워드</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
        </Form>
        <Button variant="primary" onClick={handleClose}>
          로그인
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-grid gap-2">
          <Button variant="outline-dark">
            <svg id="twitter" viewBox="0 0 16 16" width="16px" height="16px">
              <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
            </svg>
            Sign up with Twitter
          </Button>
          <Button variant="outline-primary">
            <svg id="facebook" viewBox="0 0 16 16" width="16px" height="16px" fill="#0d6efd">
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path>
            </svg>    
            Sign up with Facebook
          </Button>
          <Button variant="outline-secondary">
              <svg id="github" viewBox="0 0 16 16" width="16px" height="16px" fill="#6c757d">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            Sign up with GitHub
          </Button>
        </div>
      </Modal.Footer>
    </>
    }
  </Modal>
  );
}

export default LoginForm;