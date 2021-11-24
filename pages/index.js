import Router from "next/router";
import React, { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    Router.push("/home");
  }, []);

  return <div></div>;
};

export default Index;
