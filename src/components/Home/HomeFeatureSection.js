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
  overflow: hidden;
`;

const SliderItemDiv = styled.div`
  display: flex;
  width: 100%;
  margin-left: ${(props) => props.currentItem * -200}%;
  transition: margin-left 0.5s;
`;

const SliderNavBar = styled.div`
  z-index: 2;
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
  const [isDragging, setIsDragging] = useState(false);
  const [downX, setDownX] = useState(-1);
  const [upX, setUpX] = useState(-1);

  useEffect(() => {
    getFeatureList().then((res) => {
      setItemList(res.data);
    });
  }, []);

  useEffect(() => {
    const nextItemTimeoutID = setTimeout(() => {
      setCurrentItem(currentItem === 4 ? 0 : currentItem + 1);
    }, 5000);

    return () => {
      clearTimeout(nextItemTimeoutID);
    };
  }, [currentItem]);

  useEffect(() => {
    if (!isDragging) {
      if (downX - upX < -10)
        setCurrentItem((currentItem) =>
          currentItem === 0 ? 4 : currentItem - 1
        );
      if (upX - downX < -10)
        setCurrentItem((currentItem) =>
          currentItem === 4 ? 0 : currentItem + 1
        );
    }
  }, [downX, upX, isDragging]);

  return (
    <Wrapper>
      <SliderItemArea>
        <SliderItemDiv
          draggable={true}
          onDragStart={(e) => {
            e.preventDefault();

            setIsDragging(true);
            setDownX(e.clientX);
          }}
          onMouseUp={(e) => {
            e.preventDefault();

            if (isDragging) setUpX(e.clientX);

            setIsDragging(false);
          }}
          currentItem={currentItem}
        >
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
        </SliderItemDiv>
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
  position: relative;
  min-width: 100%;
  width: 100%;
  justify-content: center;
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
