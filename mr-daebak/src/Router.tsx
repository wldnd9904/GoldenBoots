import {BrowserRouter, Routes, Route} from "react-router-dom";
import Order from "./routes/Order"
import Voucher from "./routes/Voucher";

function Router() {
    return <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
        <Route path={`/order`} element={<Order/>}/>
        <Route path={`/voucher`} element={<Voucher/>}/>
    </Routes>
    </BrowserRouter>
}
export default Router;