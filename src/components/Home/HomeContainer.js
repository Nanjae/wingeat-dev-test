import React from "react";
import styled from "styled-components";
import HomeFeatureSection from "./HomeFeatureSection";
import HomeListSection from "./HomeListSection";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const HomeContainer = () => {
  return (
    <Wrapper>
      <HomeFeatureSection />
      <HomeListSection />
    </Wrapper>
  );
};

export default HomeContainer;
