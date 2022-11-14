import Container from 'react-bootstrap/Container';
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
        <Container>
        { eventList.map((eventItem:IEvent) => (
            <EventView
            key={eventItem.eventID}
            eventID={eventItem.eventID}
            name={eventItem.name}
            from={eventItem.from}
            to={eventItem.to}
            src_thumbnail={eventItem.src_thumbnail}
            src_big={eventItem.src_big}
            voucherID={eventItem.voucherID} />
        ))}
        </Container>
    );
}

export default EventList;