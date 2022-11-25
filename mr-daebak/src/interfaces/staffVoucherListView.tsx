import { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { IVoucher } from '../Homepage/Voucher';
import VoucherManager, { voucherDataAtom } from '../Homepage/VoucherManager';
import StaffVoucher from './staffVoucherView';

function StaffVoucherList(){
  const [voucherListData, setVoucherListData] = useRecoilState(voucherDataAtom);
  const newVoucher = () => {(async ()=>{
    await VoucherManager.addVoucher();
    alert("새 상품권이 추가되었습니다.");
  })();}
  useEffect(()=>{
    (async()=>{
        await setVoucherListData(await VoucherManager.getVoucherList());
    })();
  },[])
    return(
        <div style={{padding:"20px"}}>
            <Row xs={1} md={1} lg={1} className="g-4">
                { voucherListData?
                voucherListData.map((Voucher:IVoucher, idx) => (
                    <Col key={idx}>
                        <StaffVoucher key={idx} {...Voucher}/>
                    </Col>
                )):null
                }
            </Row>
            <Button style={{marginTop:"20px"}} variant="primary" onClick={newVoucher}>새 상품권</Button>
        </div>
    );
}

export default StaffVoucherList;