import { Helmet } from "react-helmet";
import React from "react";
import Menu from "../interfaces/menuView";
import Container from 'react-bootstrap/Container';
import { Row } from "react-bootstrap";
import CartList from "../interfaces/cartListView";
import { IMenu } from "../Order/Order";

const MenuList:[IMenu] = [
    {   
        ID:2,
        name:"프렌치 디너",
        desc:"커피 한 잔, 와인 한 잔, 샐러드, 스테이크 제공",
        src_thumb:"https://github.com/wldnd9904/GoldenBoots/blob/master/mr-daebak/src/Images/2_thumb.png?raw=true",
        src_big:"https://github.com/wldnd9904/GoldenBoots/blob/master/mr-daebak/src/Images/2_big.png?raw=true",
        price:15000,
        salad:true, 
        steak:true, 
        egg_scramble:true, 
        bacon:true, 
        bread:true, 
        bread_baguette:true, 
        coffee:true, 
        wine:true, 
        champagne:true, 
        box_plate:true, 
        nepkin_normal:true, 
        heart_little:true, 
        cupid:true, 
        plate_normal:true, 
        tray_plastic:true, 
        glass_plastic:true, 
        plate_ceramic:true, 
        glass_ceramic:true, 
        nepkin_white_cotton:true, 
        tray_wood:true, 
        vase_flower:true, 
        nepkin_linen:true,
    },
];

function Order(){
    return (
        <>
            <Helmet>
                <title>주문하기</title>
            </Helmet>
        <Container fluid>
            <Row>
                {MenuList.map(menu => 
                <Menu 
                    ID={menu.ID}
                    src_thumb={menu.src_thumb}
                    src_big={menu.src_big}
                    name={menu.name}
                    desc={menu.desc}
                    price={menu.price}
                    salad={menu.salad}
                    steak={menu.steak}
                    egg_scramble={menu.egg_scramble}
                    bacon={menu.bacon}
                    bread={menu.bread}
                    bread_baguette={menu.bread_baguette}
                    coffee={menu.coffee}
                    wine={menu.wine}
                    champagne={menu.champagne}
                    box_plate={menu.box_plate}
                    nepkin_normal={menu.nepkin_normal}
                    heart_little={menu.heart_little}
                    cupid={menu.cupid}
                    plate_normal={menu.plate_normal}
                    tray_plastic={menu.tray_plastic}
                    glass_plastic={menu.glass_plastic}
                    plate_ceramic={menu.plate_ceramic}
                    glass_ceramic={menu.glass_ceramic}
                    nepkin_white_cotton={menu.nepkin_white_cotton}
                    tray_wood={menu.tray_wood}
                    vase_flower={menu.vase_flower}
                    nepkin_linen={menu.nepkin_linen}
                />
                )}
            </Row>
        </Container>
        <CartList/>
        </>
    )
}
export default Order;