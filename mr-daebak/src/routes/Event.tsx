import { Helmet } from "react-helmet";
import Container from 'react-bootstrap/Container';
import EventList from "../interfaces/eventListView";

function Event(){
    return (
        <>
            <Helmet>
                    <title>이벤트</title>
            </Helmet>
            <Container>
                <EventList />
            </Container>
        </>
    )
}
export default Event;