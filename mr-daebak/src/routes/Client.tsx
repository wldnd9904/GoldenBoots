import { Route, Routes } from "react-router-dom";
import Header from "../Header";
import Home from "./Home";
import Order from "./Order";
import Voucher from "./Voucher";

function Client(){
    return (
        <>
            <Header/>
            <Routes>
                <Route path={`/home`} element={<Home/>}/>
                <Route path={`/order`} element={<Order/>}/>
                <Route path={`/voucher`} element={<Voucher/>}/>
            </Routes>
        </>
    )
}
export default Client;