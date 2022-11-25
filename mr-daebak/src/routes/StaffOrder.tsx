import styled from "styled-components";
import { HelmetProvider, Helmet } from "react-helmet-async";
import DinnerList from "../interfaces/dinnerListView";
import StaffOrderList from "../interfaces/staffOrderListView";
import { useRecoilValue } from "recoil";
import { userDataAtom } from "../People/PeopleManager";

const Container = styled.div`
    padding: 0px 20px;
    margin:0 auto;
    position:relative;
`;

function StaffOrder(){
    const userData = useRecoilValue(userDataAtom);
    return (<>
            <HelmetProvider>
                <Helmet>
                    <title>주문 관리</title>
                </Helmet>
            </HelmetProvider>
        <Container>
            {userData?.isStaff?
            <StaffOrderList/>:"직원 계정으로 로그인 해주세요."}
        </Container>
        </>
    )
}
export default StaffOrder;