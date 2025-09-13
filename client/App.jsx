import { useRoutes } from "raviger";
import routes from "./Routes";
import AccountModal from "./components/AccountModal/AccountModal";

const App = () => {
  const route = useRoutes(routes);

  return (
    <>
      <AccountModal />
      {route}
    </>
  );
};

export default App;
