import styled from "styled-components";
import CarouselView from "../interfaces/carouselView";
import { HelmetProvider, Helmet } from "react-helmet-async";
import ResourceList from "../interfaces/resourceListView";

const Container = styled.div`
    padding: 0px 20px;
    margin:0 auto;
    position:relative;
`;

function Resources(){
    return (<>
            <HelmetProvider>
                <Helmet>
                    <title>자원 관리</title>
                </Helmet>
            </HelmetProvider>
        <Container>
            <ResourceList/>
        </Container>
        </>
    )
}
export default Resources;