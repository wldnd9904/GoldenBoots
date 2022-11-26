import { Route, Routes } from "react-router-dom";
import Header from "../Header";
import Home from "./Home";
import Order from "./Order";
import Voucher from "./Voucher";
import Event from "./Event";
import styled from "styled-components";
import StaffHeader from "../StaffHeader";
import Resources from "./StaffResources";
import StaffUser from "./StaffUser";
import StaffStyle from "./StaffStyle";
import StaffDinner from "./StaffDinner";
import StaffVoucher from "./StaffVoucher";
import StaffEvent from "./StaffEvent";
import StaffOrder from "./StaffOrder";

const Spacer = styled.div`
height:56px;
`;

function Staff(){
    return (
        <>
            <StaffHeader />
            <Spacer/>
            <Routes>
                <Route path={`/`} element={<Home/>}/>
                <Route path={`/resources`} element={<Resources/>}/>
                <Route path={`/order`} element={<StaffOrder/>}/>
                <Route path={`/user`} element={<StaffUser/>}/>
                <Route path={`/style`} element={<StaffStyle/>}/>
                <Route path={`/dinner`} element={<StaffDinner/>}/>
                <Route path={`/voucher`} element={<StaffVoucher/>}/>
                <Route path={`/event`} element={<StaffEvent/>}/>
            </Routes>
        </>
    )
}
export default Staff;