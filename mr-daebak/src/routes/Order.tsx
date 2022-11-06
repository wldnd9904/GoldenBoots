import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import React from "react";
import Header from "../Header";

const Container = styled.div`
    padding: 0px 20px;
    width:880px;
    margin:0 auto;
    position:relative;
    background:teal;
`;

const MenuList = styled.div`
    display:block;
`;

const MenuView = styled.div<IMenuView>`
    position: relative;
    display:inline-block;
    width:250px;
    height:250px;
    background-color: tomato;
    border:1px solid;
    margin: 15px;
`;

interface IMenuView{
    name: string;
    image: string;
    key: number;
}

function Order(){
    return (<>
            <Helmet>
                <title>주문하기</title>
            </Helmet>
        <Container>
            <MenuList>
                <MenuView name="asdf" image="a" key={1}>1212312312312313</MenuView>
                <MenuView name="asdf" image="a" key={1}>123</MenuView>
                <MenuView name="asdf" image="a" key={1}>123</MenuView>
                <MenuView name="asdf" image="a" key={1}>123</MenuView>
                <MenuView name="asdf" image="a" key={1}>1212312312312313</MenuView>
                <MenuView name="asdf" image="a" key={1}>123</MenuView>
                <MenuView name="asdf" image="a" key={1}>123</MenuView>
                <MenuView name="asdf" image="a" key={1}>123</MenuView>
                <MenuView name="asdf" image="a" key={1}>1212312312312313</MenuView>
                <MenuView name="asdf" image="a" key={1}>123</MenuView>
                <MenuView name="asdf" image="a" key={1}>123</MenuView>
                <MenuView name="asdf" image="a" key={1}>123</MenuView>
            </MenuList>
        </Container>
        </>
    )
}
export default Order;