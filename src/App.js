import React from "react";
import AddForm from "./component/AddForm";
import Items from "./component/Items";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div className="body-container">
      <AddForm />
      <Items />
    </div>
  );
};

export default App;
