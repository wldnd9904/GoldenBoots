import { Helmet } from "react-helmet";
import React from "react";
import Menu from "../interfaces/menuView";
import Container from 'react-bootstrap/Container';
import { Row } from "react-bootstrap";
import CartList from "../interfaces/cartListView";

function Order(){
    return (
        <>
            <Helmet>
                <title>주문하기</title>
            </Helmet>
        <Container fluid>
            <Row>
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
            </Row>
        </Container>
        <CartList/>
        </>
    )
}
export default Order;