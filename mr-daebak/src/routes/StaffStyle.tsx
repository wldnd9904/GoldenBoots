import styled from "styled-components";
import { HelmetProvider, Helmet } from "react-helmet-async";
import DinnerList from "../interfaces/dinnerListView";
import StyleList from "../interfaces/styleListView";

const Container = styled.div`
    padding: 0px 20px;
    margin:0 auto;
    position:relative;
`;

function StaffStyle(){
    return (<>
            <HelmetProvider>
                <Helmet>
                    <title>스타일 관리</title>
                </Helmet>
            </HelmetProvider>
        <Container>
            <StyleList/>
        </Container>
        </>
    )
}
export default StaffStyle;