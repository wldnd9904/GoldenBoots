import styled from "styled-components";
import CarouselView from "../interfaces/carouselView";
import { HelmetProvider, Helmet } from "react-helmet-async";

const Container = styled.div`
    padding: 0px 20px;
    margin:0 auto;
    position:relative;
`;

function Home(){
    return (<>
            <HelmetProvider>
                <Helmet>
                    <title>미스터 대박 디너 서비스!</title>
                </Helmet>
            </HelmetProvider>
        <Container>
            <CarouselView />
        </Container>
        </>
    )
}
export default Home;