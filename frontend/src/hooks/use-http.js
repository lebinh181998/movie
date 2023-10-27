import React, { useState } from "react";

const useHttp = () => {
  //   const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const SendToHttp = async (
    request,
    resolveData,
    method,
    body_request,
    headers
  ) => {
    try {
      setErrMessage(() => "");
      setIsError(() => false);
      const res = await fetch(
        `https://backend-movie-2xns.onrender.com/${request}`,
        {
          method: method ? method : "GET",
          body: body_request ? JSON.stringify(body_request) : null,
          headers: headers ? headers : {},
        }
      );
      // console.log(res);

      const data = await res.json();
      if (res.status !== 200) {
        setErrMessage(() => data.message);
      }
      // console.log(data);

      resolveData(data, !res.ok ? true : false);
      return res;
    } catch (error) {
      console.log(error);
      setIsError(() => true);
    }
  };

  return {
    SendToHttp,
    isError,
    errMessage,
  };
};
export default useHttp;
