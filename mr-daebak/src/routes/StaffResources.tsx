import styled from "styled-components";
import CarouselView from "../Interfaces/carouselView";
import { HelmetProvider, Helmet } from "react-helmet-async";
import ResourceList from "../Interfaces/resourceListView";
import { useRecoilValue } from "recoil";
import { userDataAtom } from "../People/PeopleManager";

const Container = styled.div`
    padding: 0px 20px;
    margin:0 auto;
    position:relative;
`;

function Resources(){
    const userData = useRecoilValue(userDataAtom);
    return (<>
            <HelmetProvider>
                <Helmet>
                    <title>자원 관리</title>
                </Helmet>
            </HelmetProvider>
        <Container>
            {userData?.isStaff?
            <ResourceList/>:"직원 계정으로 로그인 해주세요."}
        </Container>
        </>
    )
}
export default Resources;