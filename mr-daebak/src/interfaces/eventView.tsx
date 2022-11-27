import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import { IEvent } from '../Homepage/Event';
import styled from 'styled-components';
import VoucherManager, { voucherDataAtom } from '../Homepage/VoucherManager';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userDataAtom } from '../People/PeopleManager';

const Hover=styled.div`
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  :hover{
    transition:transform 0.1s linear;
    transform:scale(1.02);
    z-index:2;
  }
`;

function EventView(params:IEvent) {
  const [voucherData, setVoucherData] = useRecoilState(voucherDataAtom);
  const userData = useRecoilValue(userDataAtom);
  const [show, setShow] = useState(false);
  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  const grantVoucher = async()=>{
    await VoucherManager.grantVoucher(userData.userID,params.voucherID?params.voucherID:-1);
    alert("상품권을 수령하였습니다.");
    setVoucherData(await VoucherManager.getVouchers(userData.userID));
  }
  return (
    <>
      <Card as={Hover} style={{ width: '22rem' }} onClick={handleOpen}>
        <Card.Img loading="lazy" variant="top" src={params.src_thumbnail} />
        <Card.Body>
          <Card.Title>{params.name}</Card.Title>
        </Card.Body>
      </Card>
      <Modal
      size='xl'
      show={show}
      onHide={handleClose}
      keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{params.name}</Modal.Title>
          <h2>{`${params.timefrom} ~ ${params.timeto}`}</h2>
        </Modal.Header>
        <Modal.Body>
        <img width="100%" alt={params.name} src={params.src_big} />
        </Modal.Body>
        <Modal.Footer>
            {   (userData && params.voucherID!==-1)?
                <Button variant="primary" onClick={grantVoucher}>
                쿠폰 수령하기
                </Button>
                :
                null
            }
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EventView;