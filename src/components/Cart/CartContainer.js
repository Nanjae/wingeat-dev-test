import React from "react";
import { useNavigate } from "react-router-dom";

const CartContainer = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/`);
      }}
    >
      CartContainer
    </div>
  );
};

export default CartContainer;
