import React, { Component, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Card, CloseButton, Placeholder } from "react-bootstrap";
import { IAddress } from "../People/People";
import styled from "styled-components";
import { IOrder } from "../Order/Order";

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

const demoOrders:IOrder[]=[
{
  userID: "sdf",
  menuID: 0,
  time: "1986-11-23 11:20",
  address1: "뫄뫄",
  address2: "솨솨",
  voucherID: 0,
  dinnerID: 0,
  dinner_name: "라라",
  desc: "sdfdsf",
  src_thumbnail: undefined,
  src_big: undefined,
  wine: undefined,
  steak: undefined,
  coffee: undefined,
  salad: undefined,
  egg_scramble: undefined,
  bacon: undefined,
  bread: undefined,
  bread_baguette: undefined,
  champagne: undefined,
  cheese: undefined,
  heart_little: undefined,
  cupid: undefined,
  plate_normal: undefined,
  dinner_price: undefined,
  styleID: undefined,
  style_name: undefined,
  plate_box: undefined,
  nepkin_normal: undefined,
  nepkin_white_cotton: undefined,
  nepkin_linen: undefined,
  plate_ceramic: undefined,
  glass_plastic: undefined,
  glass_ceramic: undefined,
  tray_wood: undefined,
  vase_flower: undefined,
  tray_silver: undefined,
  tray_plastic: undefined,
  style_price: undefined
},{
  userID: "sdf",
  menuID: 0,
  time: "1986-11-23 11:20",
  address1: "뫄뫄",
  address2: "솨솨",
  voucherID: 0,
  dinnerID: 0,
  dinner_name: "라라",
  desc: "sdfdsf",
  src_thumbnail: undefined,
  src_big: undefined,
  wine: undefined,
  steak: undefined,
  coffee: undefined,
  salad: undefined,
  egg_scramble: undefined,
  bacon: undefined,
  bread: undefined,
  bread_baguette: undefined,
  champagne: undefined,
  cheese: undefined,
  heart_little: undefined,
  cupid: undefined,
  plate_normal: undefined,
  dinner_price: undefined,
  styleID: undefined,
  style_name: undefined,
  plate_box: undefined,
  nepkin_normal: undefined,
  nepkin_white_cotton: undefined,
  nepkin_linen: undefined,
  plate_ceramic: undefined,
  glass_plastic: undefined,
  glass_ceramic: undefined,
  tray_wood: undefined,
  vase_flower: undefined,
  tray_silver: undefined,
  tray_plastic: undefined,
  style_price: undefined
},
];
interface IRecentOrderView{
  onAdd: (order:IOrder)=>void;
}

function RecentOrderView(params:IRecentOrderView){
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Container>
      <Slider {...settings} >
        {
          demoOrders.map((data:IOrder, idx)=>(
            <Card key={idx}>
              <Card.Header>
                {data.dinner_name}
              </Card.Header>
              <Card.Body>
                <Card.Title>{data.style_name}</Card.Title>
                <Card.Text>{data.time}</Card.Text>
              </Card.Body>
            </Card>
          ))
        }
        <Card>
          <Card.Header>
            <span style={{opacity:0}}>_</span>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              <span style={{opacity:0}}>_</span>
            </Card.Title>
            <Card.Text>
              <span style={{opacity:0}}>_</span>
            </Card.Text>
          </Card.Body>
        </Card>
      </Slider>
    </Container>
  );
}

export default RecentOrderView;