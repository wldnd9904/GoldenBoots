import { Route, Routes } from "react-router-dom";
import Manage from "./Manage";
import Resources from "./Resources";

function Staff(){
    return (
    <Routes>
        <Route path={`/manage`} element={<Manage/>}/>
        <Route path={`/resources`} element={<Resources/>}/>
    </Routes>
    )
}
export default Staff;