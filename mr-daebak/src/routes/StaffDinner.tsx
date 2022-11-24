import styled from "styled-components";
import { HelmetProvider, Helmet } from "react-helmet-async";
import DinnerList from "../interfaces/dinnerListView";

const Container = styled.div`
    padding: 0px 20px;
    margin:0 auto;
    position:relative;
`;

function StaffDinner(){
    return (<>
            <HelmetProvider>
                <Helmet>
                    <title>디너 관리</title>
                </Helmet>
            </HelmetProvider>
        <Container>
            <DinnerList/>
        </Container>
        </>
    )
}
export default StaffDinner;