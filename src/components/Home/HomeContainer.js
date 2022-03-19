import React from "react";
import { useNavigate } from "react-router-dom";

const HomeContainer = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/cart`);
      }}
    >
      HomeContainer
    </div>
  );
};

export default HomeContainer;
