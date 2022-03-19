import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CartNavWrapper = styled.div`
  width: 100%;
  height: 60px;
  background-color: #f5f5f5;
`;

const CartNavInner = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 1920px;
  width: 100%;
  height: 100%;
`;

const CartLinkDiv = styled.div`
  display: flex;
  align-items: center;
  margin-right: 40px;
  cursor: pointer;
`;

const CartLinkCount = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  background-color: red;
  color: white;
  border-radius: 50%;
  margin-right: 8px;
`;

const CartLinkText = styled.div``;

const CartNavSection = () => {
  const navigate = useNavigate();

  return (
    <CartNavWrapper>
      <CartNavInner>
        <CartLinkDiv
          onClick={() => {
            navigate(`/cart`);
          }}
        >
          <CartLinkCount>1</CartLinkCount>
          <CartLinkText>장바구니</CartLinkText>
        </CartLinkDiv>
      </CartNavInner>
    </CartNavWrapper>
  );
};

export default CartNavSection;
