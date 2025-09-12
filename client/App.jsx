import { useRoutes,Link } from "raviger";
import routes from "./Routes";

const App = () =>{
    console.log(routes)
    const route = useRoutes(routes);

    return <>
    {route}
    </>
};

export default App;