import React from "react";
import ErrorModal from "../UI/ErrorModal";
import Item from "./Item";
import "bootstrap/dist/css/bootstrap.min.css";

const Items = ({ items, isLoading, hasError }) => {
  console.log(items);
  const lists = items.map((item) => <Item key={item.id} item={item} />);

  return (
    <div className="items-container">
      {isLoading && <p className="loading-text">Loading....</p>}
      {hasError && (
        <p className="loading-text error-text">Error... Just Try To Refresh</p>
      )}
      {lists}
    </div>
  );
};

export default Items;
