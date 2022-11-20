import { Row, Col } from 'react-bootstrap';
import {IEvent} from '../Homepage/Event';
import EventView from './eventView';

const eventList:IEvent[] = [
    {   
        eventID: 1,
        name: "이벤트",
        from: "2020-02-02",
        to: "2020-02-03",
        src_thumbnail: "https://cdn.dominos.co.kr/admin/upload/event/20221108_lj4LAFLa.png",
        src_big: "https://cdn.dominos.co.kr/renewal2018/w/event/221112_doubleUp/img.jpg",
        voucherID: -1,
    },
    {   
        eventID: 2,
        name: "이벤트",
        from: "2020-02-02",
        to: "2020-02-03",
        src_thumbnail: "https://cdn.dominos.co.kr/admin/upload/event/20221101_WUe2aN3t.jpg",
        src_big: "http://cdn.dominos.co.kr/renewal2018/w/event/221004_wildWestSteak/img.jpg",
        voucherID: -1,
    },
    {   
        eventID: 3,
        name: "이벤트",
        from: "2020-02-02",
        to: "2020-02-03",
        src_thumbnail: "https://cdn.dominos.co.kr/admin/upload/event/20221108_lj4LAFLa.png",
        src_big: "https://cdn.dominos.co.kr/renewal2018/w/event/221112_doubleUp/img.jpg",
        voucherID: -1,
    },
];

function EventList(){
    return(
        <div style={{padding:"20px"}}>
            <Row xs={1} md={2} lg={3} className="g-4">
                { eventList?null:"진행중인 이벤트가 없습니다."}
                { eventList.map((eventItem:IEvent, idx) => (
                    <Col>
                        <EventView key={idx} {...eventItem}/>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default EventList;