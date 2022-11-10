import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import React from "react";
import Container from 'react-bootstrap/Container';

function Voucher(){
    return (
        <Container>
            <Helmet>
                <title>상품권</title>
            </Helmet>
            <span>Voucher</span>
        </Container>
    )
}
export default Voucher;