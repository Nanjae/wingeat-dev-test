import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LogoWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 15px 0px 50px 0px;
  cursor: pointer;
  @media screen and (max-width: 900px) {
    justify-content: flex-start;
    padding: 30px 30px 50px 30px;
  }
`;

const LogoSection = () => {
  const navigate = useNavigate();

  return (
    <LogoWrapper
      onClick={() => {
        navigate(`/`);
      }}
    >
      <img
        src={"https://image.wingeat.com/logo/images/we_logo_center.png"}
        width={180}
        height={"auto"}
        alt={"This is wingeat logo."}
      />
    </LogoWrapper>
  );
};

export default LogoSection;
