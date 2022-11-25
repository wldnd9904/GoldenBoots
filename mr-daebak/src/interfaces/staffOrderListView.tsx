import { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { IOrder } from '../Order/Order';
import OrderManager, { pendingOrderListAtom } from '../Order/OrderManager';
import StaffOrder from './staffOrderView';

function StaffOrderList(){
  const [pendingOrderListData, setPendingOrderListData] = useRecoilState(pendingOrderListAtom);
  useEffect(()=>{
    (async()=>{
        await setPendingOrderListData(await OrderManager.getPendingOrder());
    })();
  },[])
    return(
        <div style={{padding:"20px"}}>
            <Row xs={1} md={1} lg={1} className="g-4">
                { pendingOrderListData?
                pendingOrderListData.map((order:IOrder, idx) => (
                    <Col key={idx}>
                        <StaffOrder key={idx} {...order}/>
                    </Col>
                )):null
                }
            </Row>
        </div>
    );
}

export default StaffOrderList;