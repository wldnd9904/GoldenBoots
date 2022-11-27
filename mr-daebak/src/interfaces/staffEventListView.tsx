import { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { IEvent } from '../Homepage/Event';
import EventManager, { eventDataAtom } from '../Homepage/EventManager';
import StaffEvent from './staffEventView';

function StaffEventList(){
  const [eventListData, setEventListData] = useRecoilState(eventDataAtom);
  const newEvent = () => {(async ()=>{
    await EventManager.addEvent();
    alert("새 이벤트가 추가되었습니다.");
    await setEventListData(await EventManager.getEvents());
  })();}
  useEffect(()=>{
    (async()=>{
        await setEventListData(await EventManager.getEvents());
    })();
  },[])
    return(
        <div style={{padding:"20px"}}>
            <Row xs={1} md={1} lg={1} className="g-4">
                { eventListData?
                eventListData.map((event:IEvent, idx) => (
                    <Col key={idx}>
                        <StaffEvent key={idx} {...event}/>
                    </Col>
                )):null
                }
            </Row>
            <Button style={{marginTop:"20px"}} variant="primary" onClick={newEvent}>새 이벤트</Button>
        </div>
    );
}

export default StaffEventList;