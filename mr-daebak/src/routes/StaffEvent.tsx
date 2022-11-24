import styled from "styled-components";
import { HelmetProvider, Helmet } from "react-helmet-async";
import DinnerList from "../interfaces/dinnerListView";
import StyleList from "../interfaces/styleListView";
import StaffEventList from "../interfaces/staffEventListView";

const Container = styled.div`
    padding: 0px 20px;
    margin:0 auto;
    position:relative;
`;

function StaffEvent(){
    return (<>
            <HelmetProvider>
                <Helmet>
                    <title>이벤트 관리</title>
                </Helmet>
            </HelmetProvider>
        <Container>
            <StaffEventList/>
        </Container>
        </>
    )
}
export default StaffEvent;