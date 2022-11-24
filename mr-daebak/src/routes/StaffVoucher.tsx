import styled from "styled-components";
import { HelmetProvider, Helmet } from "react-helmet-async";
import DinnerList from "../interfaces/dinnerListView";
import StyleList from "../interfaces/styleListView";
import StaffVoucherList from "../interfaces/staffVoucherListView";

const Container = styled.div`
    padding: 0px 20px;
    margin:0 auto;
    position:relative;
`;

function StaffVoucher(){
    return (<>
            <HelmetProvider>
                <Helmet>
                    <title>상품권 관리</title>
                </Helmet>
            </HelmetProvider>
        <Container>
            <StaffVoucherList/>
        </Container>
        </>
    )
}
export default StaffVoucher;