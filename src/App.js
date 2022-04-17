import React, { useEffect, useState } from "react";
import AddForm from "./component/AddForm";
import Items from "./component/Items";
import useHTTP from "./hooks/useHTTP";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [items, setItems] = useState([]);

  const {
    isLoading,
    error,
    sendHttp: fetchItem,
    modalHandler,
    isModalShow,
  } = useHTTP();

  useEffect(() => {
    const transformTasks = (itemObj) => {
      const loadedTasks = [];

      for (const itemKey in itemObj) {
        loadedTasks.push({ id: itemKey, ...itemObj[itemKey] });
      }

      setItems(loadedTasks);
    };

    fetchItem(
      {
        url: "https://react-5826f-default-rtdb.firebaseio.com/shop-items.json",
      },
      transformTasks
    );
  }, []);

  const addItemHandler = (item) => {
    setItems((prevTask) => prevTask.concat(item));
  };

  return (
    <div className="body-container">
      <AddForm onAddItem={addItemHandler} />
      <Items items={items} isLoading={isLoading} hasError={error} />
    </div>
  );
};

export default App;
