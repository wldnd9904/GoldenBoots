import { Helmet, HelmetProvider } from "react-helmet-async";
import Container from 'react-bootstrap/Container';
import EventList from "../interfaces/eventListView";

function Event(){
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>이벤트</title>
                </Helmet>
            </HelmetProvider>
            <Container>
                <EventList />
            </Container>
        </>
    )
}
export default Event;