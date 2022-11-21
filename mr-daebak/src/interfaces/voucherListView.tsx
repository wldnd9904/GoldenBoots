import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IVoucher } from '../Homepage/Voucher';
import VoucherManager, { voucherDataAtom } from '../Homepage/VoucherManager';
import { userDataAtom } from '../People/PeopleManager';
import VoucherView from './voucherView';


function VoucherList(){
  const userData = useRecoilValue(userDataAtom);
  const [voucherData, setVoucherData] = useRecoilState(voucherDataAtom);
  const showVouchers = async () =>{
      setVoucherData(await VoucherManager.getVouchers(userData.userID));
  };
    return(
        <div style={{padding:"20px"}}>
        {userData?
            <Row xs={1} md={2} lg={3} className="g-4">
                { voucherData?
                voucherData.map((voucherItem:IVoucher, idx) => (
                    <Col key={idx}>
                        <VoucherView key={idx} {...voucherItem}/>
                    </Col>
                ))
                :
                <button onClick={showVouchers}></button>
                }
            </Row>
            :
            "로그인 해주세요."
        }
        </div>
    );
}

export default VoucherList;