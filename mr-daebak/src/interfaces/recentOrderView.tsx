import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Card, CloseButton } from "react-bootstrap";
import styled from "styled-components";
import { IOrder } from "../Order/Order";
import { useRecoilState, useRecoilValue } from "recoil";
import OrderManager, { orderListAtom, recentOrderAtom } from "../Order/OrderManager";

const Container = styled.div`
  padding:10px 20px;
  .slick-dots li.slick-active button:before {
  color: black;
}

.slick-prev:before,
.slick-next:before {
  color: black;
}
`;


function RecentOrderView(){
  const recentOrderList = useRecoilValue(recentOrderAtom);
  const [orderList,setOrderList] = useRecoilState(orderListAtom);
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  const addOrder = (data:IOrder) => {
    setOrderList(OrderManager.addOrder([...orderList],data));
    console.log(data);
  }
  const cancel = async (orderID:number) => {
    //주문 취소하시습니까?
    await OrderManager.cancelOrder(orderID);
  }
  return (
    <Container>
      <Slider {...settings} >
        {
          recentOrderList.map((data:IOrder, idx)=>(
            <Card key={idx} onClick={()=>addOrder(data)}>
              <Card.Header>
                <Card.Title>{data.dinner_name}</Card.Title>
                <CloseButton style={{float:"right"}} onClick={()=>cancel(data.orderID)}/>
              </Card.Header>
              <Card.Body>
                <Card.Title>{data.style_name}</Card.Title>
                <Card.Text>{data.time}</Card.Text>
              </Card.Body>
            </Card>
          ))
        }
      </Slider>
    </Container>
  );
}

export default RecentOrderView;