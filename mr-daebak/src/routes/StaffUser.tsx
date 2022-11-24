import styled from "styled-components";
import { HelmetProvider, Helmet } from "react-helmet-async";
import ResourceList from "../interfaces/resourceListView";
import UserList from "../interfaces/userListView";

const Container = styled.div`
    padding: 0px 20px;
    margin:0 auto;
    position:relative;
`;

function StaffUser(){
    return (<>
            <HelmetProvider>
                <Helmet>
                    <title>사용자 관리</title>
                </Helmet>
            </HelmetProvider>
        <Container>
            <UserList/>
        </Container>
        </>
    )
}
export default StaffUser;