import { useState } from "react";

const useHTTP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalShow, setIsModalShow] = useState(false);

  // general fetch function
  const sendHttp = async (fetchConfig, applyData) => {
    // item name တူရင် အရင် ရှိတဲ့ qty နဲ့ ထပ်ထည့်တဲ့ qty ပေါင်းတဲ့ feature ထည့်ရန်

    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(fetchConfig.url, {
        method: fetchConfig.method ? fetchConfig.method : "GET",
        headers: fetchConfig.headers ? fetchConfig.headers : {},
        body: fetchConfig.body ? JSON.stringify(fetchConfig.body) : null,
      });
      //if fail to fetch
      if (!response.ok) {
        throw new Error("Something went wrong", response);
      }

      const responseData = await response.json();
      applyData(responseData);

      // sent to parent component
    } catch (err) {
      setError(err.message || "Something went wrong");
      setIsModalShow(true);
      console.log("error");
    }

    setIsLoading(false);
  };

  const modalHandler = () => {
    setIsModalShow((prev) => !prev);
  };

  return {
    sendHttp,
    error,
    isLoading,
    modalHandler,
    isModalShow,
  };
};

export default useHTTP;
