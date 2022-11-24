import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { CloseButton, Form } from 'react-bootstrap';
import MenuManager, {  } from '../Order/MenuManager';
import { StyleClass, IStyle } from '../Order/Menu';


const Hover=styled.div`
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  :hover{
    transition:transform 0.1s linear;
    transform:scale(1.02);
    z-index:2;
  }
`;

function Style(params:IStyle) {
  const [show, setShow] = useState(false);
  const [keys, setKeys] = useState<string[]>([]);
  const { register, handleSubmit, formState:{errors},clearErrors, setValue, setError, reset, getValues, watch} = useForm<IStyle>();
  const handleOpen = () => {
    setShow(true);
    setKeys(Object.keys(params));
    reset(params);
  }
  const handleClose = () => setShow(false);
  const remove = async (styleID:string) => {
    await MenuManager.deleteStyle(styleID);
    alert("삭제되었습니다.");
  } 
  const onValid = async (data:IStyle) => {
    Object.keys(data).forEach(key => {
    if (data[key] === '' || data[key] == null) {
      delete data[key];
    }})
    console.log(data);
    await MenuManager.editStyle(data);
    alert("수정 완료.")
    handleClose();
  };
  return (
    <>
      <Card as={Hover} style={{ width: '40rem' }}>
        <Card.Body>
          <CloseButton style={{float:"right"}} onClick={()=>{remove(`${params.styleID}`)}}/>
          <Card.Title>{`${params.styleID}: ${params.style_name}`}</Card.Title>
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
        <Modal.Title>스타일 정보 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onValid)}>
          {params?
          Object.keys(new StyleClass()).map((key,idx)=>(
            <Form.Group key={idx} controlId={`form${key}`}>
              <Form.Label>{key}</Form.Label>
              <Form.Control {...register(key, {required:false})} type="text"/>
            </Form.Group>)
          )
          :
          null
          }
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

export default Style;