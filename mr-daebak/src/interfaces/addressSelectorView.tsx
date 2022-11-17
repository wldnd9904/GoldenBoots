import React, { Component, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button, Card, CloseButton, Placeholder } from "react-bootstrap";
import { IAddress } from "../People/People";
import styled from "styled-components";

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

const demoAddress:IAddress[] = [
  {
    name:"ss",
    addressID:0,
    address1:"뫄뫄",
    address2:"솨솨",
    userID:"sadf"
  },
  {
    name:"gg",
    addressID:1,
    address1:"뫄뫄2",
    address2:"솨솨2",
    userID:"sadf2"
  },
];

interface IAddressSelectorView{
  selectable:boolean;
  onSelect: (a:number)=>void;
  onDelete: (a:number)=>void;
}

function AddressSelectorView(params:IAddressSelectorView){
  const [selected, setSelected] = useState<number>(-1);
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
          demoAddress.map((data:IAddress, idx)=>(
            <Card 
            key={idx}
            border={selected==idx?"primary":""}
            onClick={()=>{
              if(params.selectable){
                setSelected(idx); params.onSelect(idx)
              }
            }
          }
        >
              <Card.Header>
                <div style={{top:"-3px",position:"relative",float:"right"}}>
                  <CloseButton onClick={()=>params.onDelete(idx)}/>
                </div>
                {data.name}
              </Card.Header>
              <Card.Body>
                <Card.Title>{data.address1}</Card.Title>
                <Card.Text>{data.address2}</Card.Text>
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

export default AddressSelectorView;