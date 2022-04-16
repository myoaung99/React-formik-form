import React from "react";
import Item from "./Item";
import useHTTP from "../hooks/useHTTP";

const Items = ({ items, onAdd }) => {
  const { isLoading, error, sendHttp, isModalShow, modalHandler } = useHTTP();

  const requestConfig = {
    url: "https://react-5826f-default-rtdb.firebaseio.com/shop-items.json",
  };

  const transformData = (data) => {
    console.log(data);
  };

  const fetchItems = async () => {
    const requestConfig = {
      url: "https://react-5826f-default-rtdb.firebaseio.com/shop-items.json",
    };

    sendHttp(requestConfig, transformData);
  };

  const lists = items.map((item) => <Item key={item.id} item={item} />);

  return <div className="items-container">{lists}</div>;
};

export default Items;
