import styled from "styled-components";
import { HelmetProvider, Helmet } from "react-helmet-async";
import DinnerList from "../Interfaces/dinnerListView";
import StyleList from "../Interfaces/styleListView";
import { useRecoilValue } from "recoil";
import { userDataAtom } from "../People/PeopleManager";

const Container = styled.div`
    padding: 0px 20px;
    margin:0 auto;
    position:relative;
`;

function StaffStyle(){
    const userData = useRecoilValue(userDataAtom);
    return (<>
            <HelmetProvider>
                <Helmet>
                    <title>스타일 관리</title>
                </Helmet>
            </HelmetProvider>
        <Container>
            {userData?.isStaff?
            <StyleList/>:"직원 계정으로 로그인 해주세요."}
        </Container>
        </>
    )
}
export default StaffStyle;