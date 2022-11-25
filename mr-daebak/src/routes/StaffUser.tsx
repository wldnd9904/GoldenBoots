import styled from "styled-components";
import { HelmetProvider, Helmet } from "react-helmet-async";
import ResourceList from "../interfaces/resourceListView";
import UserList from "../interfaces/userListView";
import { useRecoilValue } from "recoil";
import { userDataAtom } from "../People/PeopleManager";

const Container = styled.div`
    padding: 0px 20px;
    margin:0 auto;
    position:relative;
`;

function StaffUser(){
    const userData = useRecoilValue(userDataAtom);
    return (<>
            <HelmetProvider>
                <Helmet>
                    <title>사용자 관리</title>
                </Helmet>
            </HelmetProvider>
        <Container>
            {userData?.isStaff?
            <UserList/>:"직원 계정으로 로그인 해주세요."}
        </Container>
        </>
    )
}
export default StaffUser;