import styled from "styled-components";
import CarouselView from "../Interfaces/carouselView";
import { HelmetProvider, Helmet } from "react-helmet-async";

const Container = styled.div`
    padding: 0px 20px;
    margin:0 auto;
    position:relative;
`;

function Manage(){
    return (<>
            <HelmetProvider>
                <Helmet>
                    <title>홈페이지 관리</title>
                </Helmet>
            </HelmetProvider>
        <Container>
            <span>Manage</span>
            <CarouselView />
            <CarouselView />
            <CarouselView />
            <CarouselView />
            <CarouselView />
            <CarouselView />
            <CarouselView />
            <CarouselView />
        </Container>
        </>
    )
}
export default Manage;