import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import React from "react";

const Container = styled.div`
    width: 100%;
    height: 80px;
    background-color: tomato;
    position: fixed;
    align-items: center;
    justify-content: space-between;
h2 {
	margin-left:20px;
}
nav {
	width:600px;
	height:100%;
}
ul {
    list-style: none;
	width:100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
}
ul > li {
	font-size:20px;
	height: 100%;
	display: flex;
	align-items: center;
}
`

function Header(){
    return (
        <Container>
            <ul>
                <li>Order</li>
                <li>Voucher</li>
                <li>mamama</li>
                <li>papapa</li>
            </ul>
        </Container>
    )
}
export default Header;