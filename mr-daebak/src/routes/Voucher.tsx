import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import React from "react";

const Container = styled.div`
    padding: 0px 20px;
    max-width:480px;
    margin:0 auto;
    position:relative;
`;

function Voucher(){
    return (
        <Container>
            <Helmet>
                <title>쿠폰</title>
            </Helmet>
            <span>Voucher</span>
        </Container>
    )
}
export default Voucher;