import { Route, Routes } from "react-router-dom";
import Header from "../Header";
import Home from "./Home";
import Order from "./Order";
import Voucher from "./Voucher";
import styled from "styled-components";

const Spacer = styled.div`
height:56px;
`;

function Client(){
    return (
        <>
            <Header />
            <Spacer/>
            <Routes>
                <Route path={`/home`} element={<Home/>}/>
                <Route path={`/order`} element={<Order/>}/>
                <Route path={`/voucher`} element={<Voucher/>}/>
            </Routes>
        </>
    )
}
export default Client;