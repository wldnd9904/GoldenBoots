import styled from "styled-components";
import { HelmetProvider, Helmet } from "react-helmet-async";
import DinnerList from "../Interfaces/staffDinnerListView";
import StyleList from "../Interfaces/staffStyleListView";
import StaffVoucherList from "../Interfaces/staffVoucherListView";
import { useRecoilValue } from "recoil";
import { userDataAtom } from "../People/PeopleManager";

const Container = styled.div`
    padding: 0px 20px;
    margin:0 auto;
    position:relative;
`;

function StaffVoucher(){
    const userData = useRecoilValue(userDataAtom);
    return (<>
            <HelmetProvider>
                <Helmet>
                    <title>상품권 관리</title>
                </Helmet>
            </HelmetProvider>
        <Container>
            {userData?.isStaff?
            <StaffVoucherList/>:"직원 계정으로 로그인 해주세요."}
        </Container>
        </>
    )
}
export default StaffVoucher;