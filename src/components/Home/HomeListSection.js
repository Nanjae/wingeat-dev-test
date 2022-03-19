import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getItemList } from "../../apis/getItemList";
import { CartContext } from "../../context/cartContext";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  width: 100%;
`;

const SectionTitle = styled.div`
  margin: 60px 0px 100px 0px;
  font-size: 28px;
  font-weight: 800;
`;

const FoodItemArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
  width: calc(100% - 40px);
  margin-bottom: 20px;
  @media screen and (max-width: 900px) {
    width: calc(100% - 20px);
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
  }
`;

const EndObserver = styled.div``;

const HomeListSection = () => {
  const [itemList, setItemList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentScrollY, setCurrentScrollY] = useState(0);
  const [heightChecker, setHeightChecker] = useState(false);
  const [isHeightLoading, setIsHeightLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setCurrentScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isHeightLoading) {
      setIsHeightLoading(true);
      setTimeout(() => {
        if (document.body.clientHeight <= window.innerHeight) {
          getItemList({ pageNumber: currentPage }).then((res) => {
            setItemList((itemList) => itemList.concat(res.data));
            setCurrentPage((currentPage) => currentPage + 1);
            setHeightChecker((heightChecker) => !heightChecker);
            setIsHeightLoading(false);
          });
        } else {
          setIsLoaded(true);
        }
      }, 1);
    }
  }, [isHeightLoading, heightChecker, currentPage, isLoaded]);

  useEffect(() => {
    if (
      isLoaded &&
      window.scrollY >= ref.current.offsetTop - window.innerHeight - 1 &&
      currentPage < 7
    ) {
      setIsLoaded(false);
      getItemList({ pageNumber: currentPage }).then((res) => {
        setItemList((itemList) => itemList.concat(res.data));
        setCurrentPage((currentPage) => currentPage + 1);
        setIsLoaded(true);
      });
    }
  }, [currentScrollY, currentPage, isLoaded]);

  return (
    <Wrapper>
      <SectionTitle>윙잇 MADE</SectionTitle>
      <FoodItemArea>
        {itemList &&
          itemList.length > 0 &&
          itemList.map((item, index) => {
            return <FoodItem item={item} key={index} />;
          })}
      </FoodItemArea>
      <EndObserver id={"aaa"} ref={ref} />
    </Wrapper>
  );
};

const FoodItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: center;
  margin-bottom: 15px;
`;

const FoodImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  border-radius: 12px;
  cursor: pointer;
`;

const FoodTitle = styled.span`
  margin: 10px 0px;
  font-size: 16px;
  font-weight: 500;
  padding: 0px 8px;
`;

const FoodPrice = styled.span`
  font-size: 20px;
  font-weight: 800;
  padding: 0px 8px;
`;

const FoodItem = (props) => {
  const IMG_PRE_URL = "https://image.wingeat.com/";

  const { setCountHandler } = useContext(CartContext);

  const itemClickHandler = () => {
    let cartItemList = [];
    if (localStorage.getItem("cartItem")) {
      cartItemList = JSON.parse(localStorage.getItem("cartItem"));
      let tempIndex = cartItemList.findIndex((x) => x.id === props.item.id);
      if (tempIndex !== -1) {
        cartItemList[tempIndex].count += 1;
      } else {
        cartItemList.push({ ...props.item, count: 1 });
      }
    } else {
      cartItemList = [{ ...props.item, count: 1 }];
    }
    localStorage.setItem("cartItem", JSON.stringify(cartItemList));
    alert("장바구니에 상품이 추가되었습니다.");
    setCountHandler();
  };

  return (
    <FoodItemContainer>
      <FoodImage
        onClick={() => {
          itemClickHandler();
        }}
        id={`image${props.item.id}`}
        src={`${IMG_PRE_URL}${props.item.image}`}
      />
      <FoodTitle>{props.item.itemName}</FoodTitle>
      <FoodPrice>{props.item.price}원</FoodPrice>
    </FoodItemContainer>
  );
};

export default HomeListSection;
