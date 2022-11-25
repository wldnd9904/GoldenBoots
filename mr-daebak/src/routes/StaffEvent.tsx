import styled from "styled-components";
import { HelmetProvider, Helmet } from "react-helmet-async";
import StaffEventList from "../interfaces/staffEventListView";
import { useRecoilValue } from "recoil";
import { userDataAtom } from "../People/PeopleManager";

const Container = styled.div`
    padding: 0px 20px;
    margin:0 auto;
    position:relative;
`;

function StaffEvent(){
    const userData = useRecoilValue(userDataAtom);
    return (<>
            <HelmetProvider>
                <Helmet>
                    <title>이벤트 관리</title>
                </Helmet>
            </HelmetProvider>
        <Container>
            {userData?.isStaff?
            <StaffEventList/>:"직원 계정으로 로그인 해주세요."}
        </Container>
        </>
    )
}
export default StaffEvent;