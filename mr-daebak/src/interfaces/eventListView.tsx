import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import {IEvent} from '../Homepage/Event';
import EventManager, { eventDataAtom } from '../Homepage/EventManager';
import EventView from './eventView';

function EventList(){
    const [eventData, setEventData] = useRecoilState(eventDataAtom);
    useEffect(()=>{(async () =>{
        setEventData(await EventManager.getEvents());
    })();
    },[]);
    return(
        <div style={{padding:"20px"}}>
            <Row xs={1} md={2} lg={3} className="g-4">
                { eventData?eventData.map((eventItem:IEvent, idx) => (
                    <Col key={idx}>
                        <EventView key={idx} {...eventItem}/>
                    </Col>
                ))
                :
                "진행중인 이벤트가 없습니다."}
            </Row>
        </div>
    );
}

export default EventList;