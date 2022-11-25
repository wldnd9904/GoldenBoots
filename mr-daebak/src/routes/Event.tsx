import { Helmet, HelmetProvider } from "react-helmet-async";
import EventList from "../Interfaces/eventListView";

function Event(){
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>이벤트</title>
                </Helmet>
            </HelmetProvider>
                <EventList />
        </>
    )
}
export default Event;