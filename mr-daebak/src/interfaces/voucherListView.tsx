import { Row, Col } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { IVoucher } from '../Homepage/Voucher';
import { userDataAtom } from '../People/PeopleManager';
import VoucherView from './voucherView';

const voucherList:IVoucher[] = [
    {   
        voucherID: 0,
        voucherName: "웰컴 3000원 할인 쿠폰",
        price: 3000,
        expire: "2022-12-28",
    },
    {   
        voucherID: 0,
        voucherName: "벡만원 할인 쿠폰",
        price: 1000000,
        expire: "2022-12-28",
    },
    {   
        voucherID: 0,
        voucherName: "4달러",
        price: 5360,
        expire: "2030-12-28",
    },
];

function VoucherList(){
  const userData = useRecoilValue(userDataAtom);
    return(
        <div style={{padding:"20px"}}>
        {userData?
            <Row xs={1} md={2} lg={3} className="g-4">
                { voucherList?null:"진행중인 이벤트가 없습니다."}
                { voucherList.map((voucherItem:IVoucher, idx) => (
                    <Col>
                        <VoucherView key={idx} {...voucherItem}/>
                    </Col>
                ))
                }
            </Row>
            :
            "로그인 해주세요."
        }
        </div>
    );
}

export default VoucherList;