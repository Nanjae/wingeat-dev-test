import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "../../context/cartContext";

const CartNavWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  background-color: #f5f5f5;
`;

const CartNavInner = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  height: 100%;
`;

const CartLinkDiv = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  cursor: pointer;
`;

const CartLinkCount = styled.div`
  display: flex;
  width: 20px;
  height: 20px;
  justify-content: center;
  align-items: center;
  background-color: #ff4555;
  color: white;
  border-radius: 50%;
  margin-right: 6px;
  padding-bottom: 0.5px;
`;

const CartLinkText = styled.div`
  color: #444;
  font-weight: bold;
  margin-bottom: 1px;
`;

const CartNavSection = () => {
  const navigate = useNavigate();

  const { count, setCountHandler } = useContext(CartContext);

  useEffect(() => {
    if (localStorage.getItem("cartItem")) {
      setCountHandler();
    } else {
      localStorage.setItem("cartItem", []);
    }
  }, [setCountHandler]);

  return (
    <CartNavWrapper>
      <CartNavInner>
        <CartLinkDiv
          onClick={() => {
            navigate(`/cart`);
          }}
        >
          <CartLinkCount>{count}</CartLinkCount>
          <CartLinkText>장바구니</CartLinkText>
        </CartLinkDiv>
      </CartNavInner>
    </CartNavWrapper>
  );
};

export default CartNavSection;
