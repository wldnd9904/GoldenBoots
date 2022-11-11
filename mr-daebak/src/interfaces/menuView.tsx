import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import {IMenu} from '../Order/Order';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image } from 'react-bootstrap';

function Menu(params:IMenu) {
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={params.src_thumb} />
        <Card.Body>
          <Card.Title>{params.name}</Card.Title>
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
          <Modal.Title>{params.name}</Modal.Title>
        </Modal.Header>
        <img src={params.src_big} />
        <Modal.Body>
          <Form>
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
      </Modal>
    </>
  );
}

export default Menu;