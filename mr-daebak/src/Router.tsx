import {BrowserRouter, Routes, Route} from "react-router-dom";
import Client from "./routes/Client";
import Staff from "./routes/Staff";

function Router() {
    return <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
        <Route path={`/client/*`} element={<Client/>}/>
        <Route path={`/staff/*`} element={<Staff/>}/>
    </Routes>
    </BrowserRouter>
}
export default Router;