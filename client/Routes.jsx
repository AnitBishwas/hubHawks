import React from "react";
import Example from "./pages/Example";
import Index from "./pages/HomePage/HomePage";

const routes = {
  "/": () => <Index />,
  "/example": () => <Example />,
};
export default routes;
