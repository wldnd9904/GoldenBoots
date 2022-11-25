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
  const addOrder = (tmpData:IOrder) => {
    let data = {...tmpData};
    Object.keys(data).forEach(key=>{
      if(!data[key])delete data[key];
    });
    delete data.orderID;
    setOrderList(OrderManager.addOrder([...orderList],data));
    console.log(data);
  }
  const cancel = async (orderID:number) => {
    await OrderManager.cancelOrder(orderID);
    alert("주문이 취소되었습니다.");
  }
  return (
    <Container>
      <Slider {...settings} >
        {
          recentOrderList.map((data:IOrder, idx)=>(
            <Card key={idx} border={
              {
                "pending":"danger",
                "confirmed":"primary",
                "cooking":"warning",
                "delivering":"info",
                "deliveryfinished":"success",
                default:"dark",
              }[data.description?data.description:""]
            }>
              <Card.Header>
                <Card.Title>{`${data.dinner_name}: ${{
            "pending":"대기 중",
            "confirmed":"수락됨",
            "cooking":"요리 중",
            "delivering":"배송 중",
            "deliveryfinished":"배송 완료",
            "cancelled":"취소됨",
            "rejected":"거절됨",
            default:"",
          }[data.description?data.description:""]}`}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Card.Title>{data.style_name}</Card.Title>
                <Card.Text>{data.time}</Card.Text>
                <Button variant="outline-primary" onClick={()=>addOrder(data)}>장바구니에 추가</Button>
                {data.description=="pending"?<Button variant="outline-danger" onClick={()=>cancel(data.orderID?data.orderID:0)}>주문 취소</Button>:null}
              </Card.Body>
            </Card>
          ))
        }
      </Slider>
    </Container>
  );
}

export default RecentOrderView;