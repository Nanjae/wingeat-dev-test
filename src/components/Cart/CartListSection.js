import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { CartContext } from "../../context/cartContext";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  width: 100%;
`;

const SectionTitle = styled.span`
  margin: 40px 0px 40px 0px;
  font-size: 28px;
  font-weight: 800;
`;

const CartItemArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const RowDiv = styled.div`
  display: flex;
`;

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const OrderDiv = styled(ColumnDiv)`
  width: 500px;
  margin-left: 40px;
  margin-top: 40px;
`;

const ItemOrderBox = styled.div`
  display: flex;
  height: fit-content;
  padding: 30px 20px;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0;
`;

const ItemOrderLabel = styled.span`
  font-size: 20px;
`;

const ItemOrderPrice = styled.span`
  font-size: 24px;
  font-weight: 800;
  color: #ff4555;
`;

const OrderButton = styled.div`
  display: flex;
  background-color: #ff4555;
  color: #ffffff;
  align-self: center;
  justify-content: center;
  align-items: center;
  width: 480px;
  height: 60px;
  margin-top: 40px;
  border-radius: 6px;
  font-size: 20px;
  cursor: pointer;
`;

const CartListSection = () => {
  const [cartItemList, setCartItemList] = useState([]);

  const { setCountHandler } = useContext(CartContext);

  useEffect(() => {
    if (localStorage.getItem("cartItem")) {
      let tempItemList = JSON.parse(localStorage.getItem("cartItem"));
      setCartItemList(
        tempItemList.map((item) => {
          item["isChecked"] = true;
          return item;
        })
      );
    }
  }, []);

  const getTotalOrderPrice = () => {
    let totalPrice = 0;
    cartItemList.map((item) => {
      if (item.isChecked) totalPrice += item.price * item.count;
      return 0;
    });
    return totalPrice;
  };

  return (
    <Wrapper>
      <SectionTitle>장바구니</SectionTitle>
      <RowDiv>
        <CartItemArea>
          {cartItemList &&
            cartItemList.length > 0 &&
            cartItemList.map((item, index) => {
              return (
                <CartItem
                  item={item}
                  decreaseItemCount={() => {
                    setCartItemList(
                      cartItemList.map((i) =>
                        i.id === item.id
                          ? { ...i, count: i.count > 1 ? i.count - 1 : i.count }
                          : i
                      )
                    );
                  }}
                  increaseItemCount={() => {
                    setCartItemList(
                      cartItemList.map((i) =>
                        i.id === item.id ? { ...i, count: i.count + 1 } : i
                      )
                    );
                  }}
                  toggleCheck={() => {
                    setCartItemList(
                      cartItemList.map((i) =>
                        i.id === item.id ? { ...i, isChecked: !i.isChecked } : i
                      )
                    );
                  }}
                  removeItem={() => {
                    let tempList = cartItemList.filter((i) => i.id !== item.id);
                    setCartItemList(tempList);
                    localStorage.setItem("cartItem", JSON.stringify(tempList));
                    setCountHandler();
                  }}
                  itemIndex={index}
                  key={index}
                />
              );
            })}
          {cartItemList && cartItemList.length === 0 && <CartItemNull />}
        </CartItemArea>
        <OrderDiv>
          <ItemOrderBox>
            <ItemOrderLabel>결제 예정 금액</ItemOrderLabel>
            <ItemOrderPrice>
              {getTotalOrderPrice().toLocaleString("en-US")}원
            </ItemOrderPrice>
          </ItemOrderBox>
          <OrderButton>주문하기</OrderButton>
        </OrderDiv>
      </RowDiv>
    </Wrapper>
  );
};

const CartItemContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 15px;
  border: 2px solid black;
  width: 800px;
  :not(:first-child) {
    border-top: 0px;
  }
`;

const ItemInputBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const ItemName = styled.span`
  margin-left: 8px;
  font-size: 18px;
  font-weight: 500;
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
`;

const ItemPrice = styled.span`
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 8px;
`;

const ItemRemove = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
`;

const ItemTotalBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  font-size: 20px;
  font-weight: 800;
`;

const ItemTotalLabel = styled.span`
  margin-right: 4px;
`;

const ItemTotalPrice = styled.span``;

const ItemCounterBox = styled.div`
  display: flex;
  padding: 10px;
  width: 120px;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  background-color: #e0e0e0;
  border-radius: 6px;
  color: #666666;
`;

const ItemCounter = styled.div`
  font-weight: 900;
  cursor: pointer;
`;

const ItemCountNumber = styled.span`
  font-weight: 600;
`;

const CartItemNull = () => {
  return (
    <CartItemContainer
      style={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: 250,
        fontSize: 20,
      }}
    >
      장바구니에 담긴 상품이 없습니다.
    </CartItemContainer>
  );
};

const CartItem = (props) => {
  const IMG_PRE_URL = "https://image.wingeat.com/";

  return (
    <CartItemContainer>
      <ItemInputBox className="round">
        <input
          style={{ width: 24, height: 24, margin: "0px" }}
          id={`checkbox${props.item.id}`}
          type={"checkbox"}
          checked={props.item.isChecked}
          onChange={props.toggleCheck}
        />
        <label for={`checkbox${props.item.id}`}></label>
        <ItemName>{props.item.itemName}</ItemName>
      </ItemInputBox>
      <RowDiv>
        <ItemImage src={`${IMG_PRE_URL}${props.item.image}`} />
        <ColumnDiv style={{ marginLeft: 10 }}>
          <ItemPrice>{props.item.price.toLocaleString("en-US")}원</ItemPrice>
          <ItemCounterBox>
            <ItemCounter onClick={props.decreaseItemCount}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#666666"
              >
                <path d="M0 10h24v4h-24z" />
              </svg>
            </ItemCounter>
            <ItemCountNumber>{props.item.count}</ItemCountNumber>
            <ItemCounter onClick={props.increaseItemCount}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="#666666"
              >
                <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
              </svg>
            </ItemCounter>
          </ItemCounterBox>
        </ColumnDiv>
      </RowDiv>
      <ItemTotalBox>
        <ItemTotalLabel>합계:</ItemTotalLabel>
        <ItemTotalPrice>
          {(props.item.price * props.item.count).toLocaleString("en-US")}원
        </ItemTotalPrice>
      </ItemTotalBox>
      <ItemRemove onClick={props.removeItem}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
        >
          <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
        </svg>
      </ItemRemove>
    </CartItemContainer>
  );
};

export default CartListSection;
