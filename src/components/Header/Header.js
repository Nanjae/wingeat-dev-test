import React from "react";
import styled from "styled-components";
import CartNavSection from "./CartNavSection";
import LogoSection from "./LogoSection";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid lightgray;
`;

const Header = () => {
  return (
    <Wrapper>
      <CartNavSection />
      <LogoSection />
    </Wrapper>
  );
};

export default Header;
