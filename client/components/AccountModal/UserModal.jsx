import { CaretRight } from "../General";
import { Link } from "raviger";
import { logoutUser } from "../../helpers/user";
import { useState, useContext } from "react";
import { UserContext } from "../../Providers/UserContext";
import { Loader } from "../General";

const UserModal = ({ user }) => {
  const [signoutLoader, setSignoutLoader] = useState(false);
  const { updateUser } = useContext(UserContext);

  const handleSignout = async () => {
    try {
      setSignoutLoader(true);
      const logout = await logoutUser();
      updateUser(null);
    } catch (err) {
      console.log("Failed to handle signout reason -->" + err.message);
    } finally {
      setSignoutLoader(false);
    }
  };

  return (
    <div className="absolute bottom-0 translate-y-[110%] right-0 w-full bg-[#fff] shadow-2xl rounded-[8px] min-w-[300px]">
      <div className="relative px-4 py-4">
        <div className="flex flex-col items-center gap-1 border-b-solid border-b-[1px] border-b-[#d9d9d9] pb-2">
          <div className="w-[40px] h-[40px] bg-[#9c9c9c] rounded-full block"></div>
          <p className="font-display text-[14px] capitalize">
            {user.firstName} {user.lastName || ""}
          </p>
          <p className="font-display text-[12px] capitalize text-[#5b5b5b]">
            {user.email}
          </p>
        </div>
        <div className="border-b-[1px] border-b-[#d9d9d9]">
          <Link
            href="/profile"
            className="flex justify-between w-full cursor-pointer hover:bg-[#ececec] py-2 px-1 rounded-[4px]"
          >
            <span className="font-display text-[14px]">Your Profile</span>
            <span>
              <CaretRight classes={"!w-4"} />
            </span>
          </Link>
        </div>
        <div className="">
          <button
            onClick={handleSignout}
            className="flex justify-between w-full cursor-pointer hover:bg-[#ececec] py-2 px-1 rounded-[4px]"
          >
            <span className="font-display text-[14px]">Sign out</span>
            {signoutLoader && (
              <span className="">
                <Loader classes={"!fill-black !dark:text-white !w-[20px]"} />
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
