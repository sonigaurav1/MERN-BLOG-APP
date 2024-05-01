import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Loader() {  
  return (
    <div style={{height: "54vh", width: "100%", display: "flex", alignItems: "center"}} className="loader">
      <div style={{width: "fit-content", margin: "0 auto"}} className="loader__image ">
        <AiOutlineLoading3Quarters className="loading-spinner" style={{ fontSize:"3rem"}} />
      </div>
    </div>
  );
}

export default Loader;
