import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import styled from 'styled-components';
import { IVoucher } from '../Homepage/Voucher';

const Hover=styled.div`
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  :hover{
    transition:transform 0.1s linear;
    transform:scale(1.02);
    z-index:2;
  }
`;

function VoucherView(params:IVoucher) {
  return (
      <Card as={Hover} style={{ width: '22rem' }}>
        <Card.Body>
          <Card.Title>{params.voucherName}</Card.Title>
          <Card.Subtitle>{params.price}원</Card.Subtitle>
          <Card.Text style={{color:"gray"}}>~{params.expire}</Card.Text>
        </Card.Body>
        <Card.Footer>
        </Card.Footer>
      </Card>
  );
}

export default VoucherView;