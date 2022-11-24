import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IVoucher } from '../Homepage/Voucher';
import VoucherManager, { voucherDataAtom } from '../Homepage/VoucherManager';
import { IPeople } from '../People/People';
import PeopleManager, { userDataAtom, userDataListAtom } from '../People/PeopleManager';
import User from './userView';
import VoucherView from './voucherView';


function UserList(){
  const [userListData, setUserListData] = useRecoilState(userDataListAtom);
  useEffect(()=>{
    (async()=>{
        await setUserListData(await PeopleManager.getUserListData());
    })();
  })
    return(
        <div style={{padding:"20px"}}>
            <Row xs={1} md={1} lg={1} className="g-4">
                { userListData?
                userListData.map((user:IPeople, idx) => (
                    <Col key={idx}>
                        <User key={idx} {...user}/>
                    </Col>
                )):null
                }
            </Row>
        </div>
    );
}

export default UserList;