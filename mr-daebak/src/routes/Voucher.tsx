import { Helmet, HelmetProvider } from "react-helmet-async";
import VoucherList from "../Interfaces/voucherListView";

function Voucher(){
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>상품권</title>
                </Helmet>
            </HelmetProvider>
                <VoucherList />
        </>
    )
}
export default Voucher;