import { Bell, CaretDown } from "../General";
import { useContext, useState } from "react";
import { UserContext } from "../../Providers/UserContext";
import AccountModal from "../AccountModal/AccountModal";
import UserModal from "../AccountModal/UserModal";

const Header = () => {
  const {user} = useContext(UserContext);
  const [accountModalDisplay, setAccountModalDisplay] = useState(false);
  const [userModalDisplay,setUserModalDisplay] = useState(false);

  return (
    <header>
      <div className="flex justify-between px-4 py-5 lg:px-10 border-b-solid border-b-[#000] border-b-[1px]">
        <div>
          <h1 className="font-display">HubHawks</h1>
        </div>
        <div className="flex items-center gap-2 lg:gap-4">
          <div className="flex">
            <button className="">
              <Bell classes={"!w-6"} />
            </button>
          </div>
          {user && (
            <div className="flex items-center gap-1 relative">
              <div className="h-7 w-7 bg-[#9c9c9c] block rounded-full"></div>
              <p className="font-display text-[14px] font-normal capitalize">
                {user.firstName} {user.lastName || ""}
              </p>
              <button className="cursor-pointer" onClick={() =>{setUserModalDisplay((value) => !value)}}>
                <CaretDown classes={"!size-5"} />
              </button>
              {userModalDisplay && <UserModal user={user}/>}
            </div>
          )}
          {!user && (
            <button className="font-display text-[14px] bg-[#000] text-[#fff] px-4 py-1 rounded-[4px] cursor-pointer" onClick={() => setAccountModalDisplay((value) => !value)}>
              Login
            </button>
          )}
        </div>
      </div>
      {accountModalDisplay && <AccountModal />}
    </header>
  );
};

export default Header;
