import Menu from "../interfaces/menuView";
import Container from 'react-bootstrap/Container';
import { Col, Row } from "react-bootstrap";
import CartList from "../interfaces/cartListView";
import {menuList} from "../Order/Menu";
import { HelmetProvider, Helmet } from "react-helmet-async";

function Order(){
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>주문하기</title>
                </Helmet>
            </HelmetProvider>
            <div style={{padding:"20px"}}>
                <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                {menuList.map((menu, idx) =>
                    <Col>
                        <Menu key={idx} {...menu} />
                    </Col>
                )}                {menuList.map((menu, idx) =>
                    <Col>
                        <Menu key={idx} {...menu} />
                    </Col>
                )}
                </Row>
            </div>
            <CartList/>
        </>
    )
}
export default Order;
