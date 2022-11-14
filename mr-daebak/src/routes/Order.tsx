import Menu from "../interfaces/menuView";
import Container from 'react-bootstrap/Container';
import { Row } from "react-bootstrap";
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
        <Container fluid>
            <Row>
                {menuList.map(menu => 
                <Menu 
                    key={menu.dinnerID}
                    dinnerID={menu.dinnerID}
                    dinner_name={menu.dinner_name}
                    desc={menu.desc}
                    src_thumbnail={menu.src_thumbnail}
                    src_big={menu.src_big}
                    wine={menu.wine}
                    steak={menu.steak}
                    coffee={menu.coffee}
                    salad={menu.salad}
                    egg_scramble={menu.egg_scramble}
                    bacon={menu.bacon}
                    bread={menu.bread}
                    bread_baguette={menu.bread_baguette}
                    champagne={menu.champagne}
                    cheese={menu.cheese}
                    heart_little={menu.heart_little}
                    cupid={menu.cupid}
                    plate_normal={menu.plate_normal}
                    dinner_price={menu.dinner_price}
                    styleID={menu.styleID}
                    style_name={menu.style_name}
                    plate_box={menu.plate_box}
                    nepkin_normal={menu.nepkin_normal}
                    nepkin_white_cotton={menu.nepkin_white_cotton}
                    nepkin_linen={menu.nepkin_linen}
                    plate_ceramic={menu.plate_ceramic}
                    glass_plastic={menu.glass_plastic}
                    glass_ceramic={menu.glass_ceramic}
                    tray_wood={menu.tray_wood}
                    vase_flower={menu.vase_flower}
                    tray_silver={menu.tray_silver}
                    tray_plastic={menu.tray_plastic}
                    style_price={menu.style_price}
                />
                )}
            </Row>
        </Container>
        <CartList/>
        </>
    )
}
export default Order;