import { getUser } from "../helpers/user";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (user) =>{
    setUser(user);
  }
  useEffect(() => {
    (async () => {
      try {
        const user = await getUser();
        if (!user.ok) {
          throw new Error("Failed to get user");
        }
        setUser(user);
      } catch (err) {
        console.log("🙋No User found");
      }
    })();
  }, []);
  return <UserContext.Provider value={{user,updateUser}}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
