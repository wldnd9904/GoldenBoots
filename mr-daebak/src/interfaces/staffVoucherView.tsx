import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { CloseButton, Form } from 'react-bootstrap';
import { IVoucher, VoucherClass } from '../Homepage/Voucher';
import VoucherManager, { voucherDataAtom } from '../Homepage/VoucherManager';
import { useRecoilState } from 'recoil';


const Hover=styled.div`
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  :hover{
    transition:transform 0.1s linear;
    transform:scale(1.02);
    z-index:2;
  }
`;

function StaffVoucher(param:IVoucher) {
  const [voucherListData, setVoucherListData] = useRecoilState(voucherDataAtom);
  const [show, setShow] = useState(false);
  const [keys, setKeys] = useState<string[]>([]);
  const { register, handleSubmit, formState:{errors},clearErrors, setValue, setError, reset, getValues, watch} = useForm<IVoucher>();
  const handleOpen = () => {
    setShow(true);
    setKeys(Object.keys(param));
    reset(param);
  }
  const handleClose = () => setShow(false);
  const remove = async (voucherID:string) => {
    await VoucherManager.deleteVoucher(voucherID);
    alert("삭제되었습니다.");
    await setVoucherListData(await VoucherManager.getVoucherList());
  } 
  const onValid = async (data:IVoucher) => {
    Object.keys(data).forEach(key => {
    if (data[key] === '' || data[key] == null) {
      delete data[key];
    }})
    await VoucherManager.editVoucher(data);
    alert("수정 완료.")
    await setVoucherListData(await VoucherManager.getVoucherList());
    handleClose();
  };
  return (
    <>
      <Card as={Hover} style={{ width: '40rem' }}>
        <Card.Body>
          <CloseButton style={{float:"right"}} onClick={()=>{remove(`${param.voucherID}`)}}/>
          <Card.Title>{`${param.voucherID}: ${param.voucherName}`}</Card.Title>
          <Card.Subtitle>{`${param.expire} 까지`}</Card.Subtitle>
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
        <Modal.Title>상품권 정보 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onValid)}>
          {param?
          Object.keys(new VoucherClass()).map((key,idx)=>(
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

export default StaffVoucher;