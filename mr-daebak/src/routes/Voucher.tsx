import { Helmet, HelmetProvider } from "react-helmet-async";
import VoucherList from "../Interfaces/voucherListView";

function Voucher(){
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>μνκΆ</title>
                </Helmet>
            </HelmetProvider>
                <VoucherList />
        </>
    )
}
export default Voucher;