import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

interface Props {
  setTitleEvent: (newTitle: string) => void;
}
export default function Editor({ setTitleEvent }: Props) {
  const [params, setParams] = useState<URLSearchParams>();
  const [hasError, setHasError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setTitleEvent("LitCode - ");

    const timer = setTimeout(() => {
      setHasError(true);
    }, 7500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setParams(new URLSearchParams(location.search));
  }, [location]);

  const sendToServer = () => {
    axios.post(
      "http://localhost:8080/compile",
      {
        id: "1_sumNums",
        source_code: ,
        lang: "java",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  };

  if (!params?.get("problem")) {
    if (hasError)
      return (
        <div>
          <h1>No required params</h1>
        </div>
      );
    return (
      <div>
        <h1>Loading args</h1>
      </div>
    );
  }

  return (
    <>
      <div>
        <div>
          <span>{params.get("problem")}</span>
          <span></span>
        </div>
      </div>
      <div></div>
    </>
  );
}
