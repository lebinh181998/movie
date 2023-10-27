import React, { useState, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import NavBar from "../browse/browse-sub/NavBar/NavBar";

const NotFoundPage = () => {
  const { SendToHttp } = useHttp();
  const [errorMess, setErrorMess] = useState("");

  const GetResolveData = (data, error) => {
    setErrorMess(data.message);
  };

  useEffect(() => {
    const url = window.location.pathname;
    SendToHttp(url, GetResolveData);
  }, []);

  return (
    <div className="app">
      <div className="navbar-section">
        <NavBar />
      </div>

      <div className="text-center page404">
        <h1>{errorMess}</h1>
      </div>
    </div>
  );
};
export default NotFoundPage;
