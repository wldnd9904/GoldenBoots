import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import React from "react";
import CarouselView from "../interfaces/carouselView";

const Container = styled.div`
    padding: 0px 20px;
    margin:0 auto;
    position:relative;
`;

function Home(){
    return (<>
            <Helmet>
                <title>미스터 대박 디너 서비스!</title>
            </Helmet>
        <Container>
            <span>Home</span>
            <CarouselView />
        </Container>
        </>
    )
}
export default Home;