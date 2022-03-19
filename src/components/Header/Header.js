import React from "react";
import styled from "styled-components";
import CartNavSection from "./CartNavSection";
import LogoSection from "./LogoSection";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-bottom: 1px solid lightgray;

  @media screen and (max-width: 900px) {
    flex-direction: row-reverse;
  }
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
