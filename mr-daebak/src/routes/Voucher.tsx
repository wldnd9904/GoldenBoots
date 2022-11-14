import {Helmet, HelmetProvider} from 'react-helmet-async'
import Container from 'react-bootstrap/Container';

function Voucher(){
    return (
        <>
        <HelmetProvider>
            <Helmet>
                <title>상품권</title>
            </Helmet>
        </HelmetProvider>
            <Container>
                <span>Voucher</span>
            </Container>
        </>
    )
}
export default Voucher;