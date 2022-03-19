import React from "react";
import styled from "styled-components";

const LogoWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 15px 0px 50px 0px;
`;

const LogoSection = () => {
  return (
    <LogoWrapper>
      <img
        src={"https://image.wingeat.com/logo/images/we_logo_center.png"}
        width={300}
        height={110}
        alt={"This is wingeat logo."}
      />
    </LogoWrapper>
  );
};

export default LogoSection;
