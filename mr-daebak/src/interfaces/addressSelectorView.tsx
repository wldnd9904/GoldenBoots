import React, { Component, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Badge, Button, Card, CloseButton, Placeholder } from "react-bootstrap";
import { IAddress, IPeople } from "../People/People";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";
import PeopleManager, { addressDataAtom, userDataAtom } from "../People/PeopleManager";
import { setMaxIdleHTTPParsers } from "http";

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


interface IAddressSelectorView{
  selectable:boolean;
  onSelect: (address:IAddress)=>void;
  onDelete: (a:number)=>void;
  selected?: string;
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
  const userData = useRecoilValue<IPeople>(userDataAtom);
  const [addMode, setAddMode] = useState<boolean>(false);
  const [addressList,setAddressList] = useRecoilState<IAddress[]>(addressDataAtom);
  const [selected, setSelected] = useState<number>(-1);
  const [name, setName] = useState<string>("");
  const [address1, setAddress1] = useState<string>("");
  const [address2, setAddress2] = useState<string>("");
  const onValid = ()=>{
    if(name==""||address1==""||address2=="")return;
    const data:IAddress = {
      name: name, address1: address1, address2: address2,
      addressID: 0,
      userID: userData.userID,
    };
    setAddressList(PeopleManager.addAddress([...addressList],data));
    setAddMode(false);
  }
  const addAddress = () => {
    setAddMode(true);
    setName("")
    setAddress1("");
    setAddress2("");
  }
  const deleteAddress = (index:number) =>{
    setAddressList(PeopleManager.removeAddress([...addressList],index));
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
          addressList.map((data:IAddress, idx:number)=>(
            <Card 
            key={idx}
            border={(params.selected==addressList[idx].address1&&selected==-1)||selected==idx?"primary":""}
            onClick={()=>{
              if(params.selectable){
                setSelected(idx); params.onSelect(data)
              }
            }
          }
        >
              <Card.Header>
                <div style={{top:"-3px",position:"relative",float:"right"}}>
                  <CloseButton onClick={()=>deleteAddress(idx)}/>
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
            <Card.Header>
              <Input value={name} onChange={(e)=>setName(e.currentTarget.value)} type="text" placeholder="우리집" />
            </Card.Header>
            <Card.Body>
              <Card.Title>
              <Input value={address1} onChange={(e)=>setAddress1(e.currentTarget.value)} type="text" placeholder="서울특별시 동대문구 전농동 서울시립대로" />
              </Card.Title>
              <Card.Text>
              <Input value={address2} onChange={(e)=>setAddress2(e.currentTarget.value)} type="text" placeholder="정보기술관 326호" />
              </Card.Text>
              <Box style={{left:"90%"}}>
                <Button variant="outline-secondary" onClick={onValid}>+</Button>
              </Box>
            </Card.Body>
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