import { useRoutes } from "raviger";
import routes from "./Routes";
import Layout from "./Layout";
import { UserContextProvider } from "./Providers/UserContext";

const App = () => {
  const route = useRoutes(routes);

  return (
    <UserContextProvider>
      <Layout />
      {route}
    </UserContextProvider>
  );
};

export default App;
