import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getFeatureList } from "../../apis/getFeatureList";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
`;

const SliderItemArea = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
`;

const SliderNavBar = styled.div`
  display: flex;
  position: absolute;
  bottom: 15px;
  right: 15px;
  justify-content: space-between;
  width: 120px;
`;

const SliderNavCircle = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${(props) =>
    props.currentItem === props.itemIndex ? "#000" : "#999"};
  border-radius: 50%;
  transition: background-color 0.3s;
  cursor: pointer;
`;

const HomeFeatureSection = () => {
  const [itemList, setItemList] = useState([]);
  const [currentItem, setCurrentItem] = useState(0);

  useEffect(() => {
    getFeatureList().then((res) => {
      setItemList(res.data);
    });
  }, []);

  useEffect(() => {
    const nextItemTimeoutID = setTimeout(() => {
      setCurrentItem(currentItem === 4 ? 0 : currentItem + 1);
    }, 3000);

    return () => {
      clearTimeout(nextItemTimeoutID);
    };
  }, [currentItem]);

  return (
    <Wrapper>
      <SliderItemArea>
        {itemList &&
          itemList.length > 0 &&
          itemList.map((item, index) => {
            return (
              <SliderItem
                item={item}
                currentItem={currentItem}
                itemIndex={index}
                key={index}
              />
            );
          })}
        <SliderNavBar>
          {itemList &&
            itemList.length > 0 &&
            itemList.map((_, index) => {
              return (
                <SliderNavCircle
                  onClick={() => {
                    setCurrentItem(index);
                  }}
                  currentItem={currentItem}
                  itemIndex={index}
                  key={index}
                />
              );
            })}
        </SliderNavBar>
      </SliderItemArea>
    </Wrapper>
  );
};

// <-- Slider Item (BEGIN) -->

const SliderItemContainer = styled.div`
  user-select: none;
  display: flex;
  position: ${(props) =>
    props.currentItem === props.itemIndex ? "relative" : "absolute"};
  min-width: 100%;
  justify-content: center;
  opacity: ${(props) => (props.currentItem === props.itemIndex ? 1 : 0)};
  transition: opacity 0.3s;
`;

const SliderItemImage = styled.img`
  width: 100%;
  height: 100%;
`;

const SliderItem = (props) => {
  const IMG_PRE_URL = "https://image.wingeat.com/";

  return (
    <SliderItemContainer
      currentItem={props.currentItem}
      itemIndex={props.itemIndex}
    >
      <SliderItemImage
        src={`${IMG_PRE_URL}${props.item.image}`}
        alt={`This is wingeat feature ${props.itemIndex}.`}
      />
    </SliderItemContainer>
  );
};

// <-- Slider Item (END) -->

export default HomeFeatureSection;
