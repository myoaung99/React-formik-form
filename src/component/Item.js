import React from "react";
import { Card } from "react-bootstrap";

const Item = (props) => {
  return (
    <div className="item-box">
      <Card body>
        <Card.Title tag="h1">
          <p className="h3">{props.item.name}</p>
        </Card.Title>
        <Card.Text>{props.item.description}</Card.Text>
        <p className="bg-primary text-light rounded p-2 d-inline-block h5">
          {props.item.price} MMK
        </p>
      </Card>
    </div>
  );
};

export default Item;
