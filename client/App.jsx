import { useRoutes } from "raviger";
import routes from "./Routes";
import AccountModal from "./components/AccountModal/AccountModal";
import LoginForm from "./components/AccountModal/LoginForm";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import Footer from "./components/Footer/Footer";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  const route = useRoutes(routes);

  return (
    <>
      <Header />
      <HomePage />
      <Footer />
    </>
  );
};

export default App;
