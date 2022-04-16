import React, { useState } from "react";
import AddForm from "./component/AddForm";
import Items from "./component/Items";

import "bootstrap/dist/css/bootstrap.min.css";

const DUMMY_ITEMS = [
  {
    id: 0.12232,
    name: "Keyboard",
    price: 123,
    quantity: 1,
    description: "some thing",
  },
  {
    id: 0.4535,
    name: "Mouse",
    price: 123,
    quantity: 1,
    description: "some thing",
  },
  {
    id: 0.1213112,
    name: "Monitor",
    price: 123,
    quantity: 1,
    description: "some thing",
  },
  {
    id: 0.8686,
    name: "Monitor",
    price: 123,
    quantity: 1,
    description: "some thing",
  },
  {
    id: 0.080808,
    name: "Monitor",
    price: 123,
    quantity: 1,
    description: "some thing",
  },
  {
    id: 0.6458,
    name: "Monitor",
    price: 123,
    quantity: 1,
    description: "some thing",
  },
];

const App = () => {
  const [items, setItems] = useState(DUMMY_ITEMS);

  const addItems = (item) => {
    setItems((prev) => prev.push(item));
  };

  return (
    <div className="body-container">
      <AddForm />
      <Items items={items} onAdd={addItems} />
    </div>
  );
};

export default App;
