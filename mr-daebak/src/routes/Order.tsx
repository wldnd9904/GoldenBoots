import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import React from "react";
import Header from "../Header";
import Menu from "../interfaces/menuView";

const Container = styled.div`
    padding: 0px 20px;
    width:880px;
    margin:0 auto;
    position:relative;
    background:teal;
`;

const MenuList = styled.div`
    display:inline-block;
`;

function Order(){
    return (<>
            <Helmet>
                <title>주문하기</title>
            </Helmet>
        <Container>
            <MenuList>
                <Menu />
                <Menu />
                <Menu />
                <Menu />
                <Menu />
                <Menu />
                <Menu />
                <Menu />
                <Menu />
                <Menu />
            </MenuList>
        </Container>
        </>
    )
}
export default Order;