import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { ReactNode, useState } from 'react';
import { detailedMenuTypeList, IDetailedMenuType, IMenu } from '../Order/Menu';
import AddressSelectorView from './addressSelectorView';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { IOrder } from '../Order/Order';
import { Badge, Form } from 'react-bootstrap';

const Hover=styled.div`
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  :hover{
    transition:transform 0.1s linear;
    transform:scale(1.02);
    z-index:2;
  }
`;

function Menu(params:IMenu) {
  const [show, setShow] = useState(false);
  const { register, handleSubmit, formState:{errors},clearErrors, setValue, setError, reset} = useForm<IOrder>();
  const handleOpen = () => {
    reset();
    setValue("dinnerID", params.dinnerID);
    setShow(true);
  }
  const handleClose = () => setShow(false);
  const onValid = async (data:IOrder) => {
    //TODO: ordermanager에서 장바구니에 추가하기/장바구니 새로고침
    if(data.address1==null||data.address2==null){
      setError('address1',{message:"주소지를 선택해주세요."})
      return;
    }
    console.log(data);
    handleClose();
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
            {detailedMenuTypeList.map((detail:IDetailedMenuType,idx)=>(
              detail.name in params && params[detail.name as keyof IMenu]!==undefined?
              <Form.Group key={idx} className="mb-3" controlId={`${idx}`}>
                <Form.Label>{detail.label}:</Form.Label>
                <Form.Label>{{
                      "Q": "보통",
                      "C": 1,
                      "B": "넣기",
                    }[detail.type]}</Form.Label>
                <Form.Range                   
                    step={1}
                    min={0}
                    max={{
                      "Q": 3,
                      "C": 10,
                      "B": 1,
                    }[detail.type]}
                    defaultValue={{
                      "Q": 2,
                      "C": 1,
                      "B": 1,
                    }[detail.type]}
                    {...register((detail.name as keyof IOrder))}
                    onChange={(e)=>{
                      setValue(detail.name as keyof IOrder,e.currentTarget.value)
                      if(e.currentTarget.previousElementSibling)
                      switch(detail.type){
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
              :
              null
            ))}
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