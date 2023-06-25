import React from "react";
import { FaListUl } from "react-icons/fa";
import styled from "styled-components";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

export const Hamburger = (props: Props) => (
  <StyledHamburger
    open={props.open}
    onClick={() => props.setOpen(!props.open)}>
    <FaListUl size={24} color="#ffffff" />
  </StyledHamburger>
);

const StyledHamburger = styled.button<{ open: boolean }>`
  position: fixed;
  left: 3vw;
  top: 3vw;
  width: 2rem;
  height: 2rem;
  padding: 0;
  background: transparent;
  
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: none;
  cursor: pointer;
  outline: none;
  z-index: 1;
`
