import styled from "styled-components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import React from "react";
import Container from 'react-bootstrap/Container';

function Event(){
    return (
        <>
            <Helmet>
                    <title>이벤트</title>
            </Helmet>
            <Container>
                <span>Event</span>
            </Container>
        </>
    )
}
export default Event;