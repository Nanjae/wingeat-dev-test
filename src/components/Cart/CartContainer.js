import React from "react";
import styled from "styled-components";
import CartListSection from "./CartListSection";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const CartContainer = () => {
  return (
    <Wrapper>
      <CartListSection />
    </Wrapper>
  );
};

export default CartContainer;
