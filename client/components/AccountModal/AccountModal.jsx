import { useState } from "react";
import LoginForm from "./LoginForm";
import { CloseIcon } from "../icons/AccountIcons";
import RegisterForm from "./RegisterForm";

const AccountModal = () => {
  const [loginForm, setLoginForm] = useState(true);

  const toggleLoginForm = () => {
    setLoginForm(!loginForm);
  };
  return (
    <div>
      <div className="content fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white py-6 px-8 rounded-lg shadow-lg w-[calc(100%_-_40px)]">
        <div className="flex justify-end mb-3">
          <button>
            <CloseIcon />
          </button>
        </div>
        {loginForm && <LoginForm toggleLoginForm={toggleLoginForm} />}
        {!loginForm && <RegisterForm toggleLoginForm={toggleLoginForm}/>}
      </div>
    </div>
  );
};
export default AccountModal;
