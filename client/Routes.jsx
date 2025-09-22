import React from "react";
import Example from "./pages/Example";
import Index from "./pages/Index";
import Account from "./pages/Account";
import Profile from "./pages/profile/Index";

const routes = {
  "/":() => <Index />,
  "/example":() => <Example />,
  "/account": () => <Account/>,
  "/profile":() => <Profile/>
};
export default routes;
