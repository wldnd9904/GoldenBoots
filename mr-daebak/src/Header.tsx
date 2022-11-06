import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import React, { useEffect, useState } from "react";

const Container = styled.div`
    width: 100%;
    height: auto;
    padding: 0px 40px;
    background-color: tomato;
    position:fixed;
    z-index: 1;
`;
const TopBar = styled.div`
    width:100%;
    display:flex;
    align-items: center;
    justify-content: space-between;
    padding : 5px;
    position:relative;
`;

const Search = styled.input`
    font-size:20px;
`;
const MenuList = styled.ul`
    list-style: none;
	width:100%;
	height: 100%;
    padding: 5px;
	display: flex;
    align-items: center;
	justify-content: space-between;
`;
const Menu = styled.li`
	font-size:20px;
	height: 100%;
	display: flex;
	align-items: center;
`;
const Spacer = styled.div`
    height:80px;
`;

function Header(){
    const [scrollY, setScrollY] = useState(0);
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      setScrollY(scrollPosition)
    };
    useEffect( () => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }, []);
    return (
        <>
        <Container>
            {scrollY<10?
            <TopBar>
                <Menu>MrDaebak</Menu>
                <Search/>
                <Menu>로그인/회원가입</Menu>
            </TopBar>
            :
            null
            }
            <MenuList>
                <Menu>
                   <Link to={`order`}>Order</Link>
               </Menu>
                <Menu>
                    <Link to={`voucher`}>Voucher</Link>
                </Menu>
                <Menu>mamama</Menu>
                <Menu>papapa</Menu>
                <Menu>lalala</Menu>
            </MenuList>
        </Container>
        <Spacer/>
        </>
    )
}
export default Header;