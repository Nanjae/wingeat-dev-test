import React, { createContext, useState } from "react";

export const CartContext = createContext({
  count: 0,
  setCountHandler: () => {},
});

const CartContextProvider = (props) => {
  const [count, setCount] = useState(0);

  const setCountHandler = () => {
    let cartItemList = JSON.parse(localStorage.getItem("cartItem"));
    setCount(cartItemList.length);
  };

  return (
    <CartContext.Provider value={{ count, setCountHandler }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
