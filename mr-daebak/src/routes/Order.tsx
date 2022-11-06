import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import React from "react";
import Header from "../Header";

const Container = styled.div`
    padding: 0px 20px;
    max-width:480px;
    margin:0 auto;
    position:relative;
    background-color: white;
`;

function Order(){
    return (<>
            <Helmet>
                <title>주문하기</title>
            </Helmet>
        <Container>
            <ul>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
                <li>order</li>
            </ul>
        </Container>
        </>
    )
}
export default Order;