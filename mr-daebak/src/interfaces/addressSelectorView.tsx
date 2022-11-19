import React, { Component, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Badge, Button, Card, CloseButton, Placeholder } from "react-bootstrap";
import { IAddress } from "../People/People";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";

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

const Box = styled.div`
  width:50px;
  height:50px;
  position:absolute;
  top:50%;
  left:50%;
  margin: -25px 0px -25px -25px;
  .btn {
    width:50px;
    height:50px;
  }
`;

const Input = styled.input`
  background: none;
  border: none;
  padding: none;
`;

function AddressSelectorView(params:IAddressSelectorView){
  const [addMode, setAddMode] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>(-1);
  const { register, handleSubmit, formState:{errors},reset, setValue} = useForm<IAddress>();
  const onValid = (data:IAddress)=>{
    demoAddress.push(data);
    console.log(data);
    reset();
    setAddMode(false);
  }
  const addAddress = () => {
    setAddMode(true);
  }
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
        { 
          addMode?
          <Card>
            <form onSubmit={handleSubmit(onValid)}>
            <Card.Header>
              <Input {...register("name", {required:"값이 필요합니다."})} type="text" placeholder="우리집" />
              {errors?.name? (<Badge bg="secondary">{`${errors?.name?.message}`}</Badge>):null}
            </Card.Header>
            <Card.Body>
              <Card.Title>
              <Input {...register("address1", {required:"값이 필요합니다."})} type="text" placeholder="서울특별시 동대문구 전농동 서울시립대로" />
              {errors?.address1? (<Badge bg="secondary">{`${errors?.address1?.message}`}</Badge>):null}
              </Card.Title>
              <Card.Text>
              <Input {...register("address2", {required:"값이 필요합니다."})} type="text" placeholder="정보기술관 326호" />
              {errors?.address2? (<Badge bg="secondary">{`${errors?.address2?.message}`}</Badge>):null}
              </Card.Text>
              <Box style={{left:"90%"}}>
                <Button variant="outline-secondary" type="submit">+</Button>
              </Box>
            </Card.Body>
            </form>
          </Card>
          :
          <Card>
            <Card.Body>
            <Card.Title>
                <span style={{opacity:0}}>_</span>
              </Card.Title>
              <Card.Title>
                <span style={{opacity:0}}>_</span>
              </Card.Title>
              <Card.Text>
                <span style={{opacity:0}}>_</span>
              </Card.Text>
              <Box>
                <Button variant="outline-secondary" onClick={addAddress}>+</Button>
              </Box>
            </Card.Body>
          </Card>
        }
      </Slider>
    </Container>
  );
}

export default AddressSelectorView;