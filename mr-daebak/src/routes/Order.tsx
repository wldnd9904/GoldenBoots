import Menu from "../interfaces/menuView";
import Container from 'react-bootstrap/Container';
import { Col, Row } from "react-bootstrap";
import CartList from "../interfaces/cartListView";
import { HelmetProvider, Helmet } from "react-helmet-async";
import { useEffect } from "react";
import MenuManager, { detailListAtom, dinnerListAtom, styleListAtom } from "../Order/MenuManager";
import { useRecoilState } from "recoil";
import OrderManager from "../Order/OrderManager";

function Order(){
    const [detailedMenuTypeList,setDetailedMenuTypeList] = useRecoilState(detailListAtom);
    const [dinnerList, setDinnerList] = useRecoilState(dinnerListAtom);
    const [styleList, setStyleList] = useRecoilState(styleListAtom);
    useEffect(()=>{(async () =>{
        setDetailedMenuTypeList(await MenuManager.getDetailedMenuTypeList());
        setDinnerList(await MenuManager.getDinnerList());
        setStyleList(await MenuManager.getStyleList());
    })();
    },[]);
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>주문하기</title>
                </Helmet>
            </HelmetProvider>
            <div style={{padding:"20px"}}>
                <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                {dinnerList.map((dinner, idx) =>
                    <Col key={idx}>
                        <Menu key={idx} {...dinner} />
                    </Col>
                )}                
                {dinnerList.map((dinner, idx) =>
                    <Col key={idx+100}>
                        <Menu key={idx+100} {...dinner} />
                    </Col>
                )}
                </Row>
            </div>
            <CartList/>
        </>
    )
}
export default Order;
function useRecoilValue(detailListAtom: any) {
    throw new Error("Function not implemented.");
}

