import { useContext, useEffect, useState } from "react";
import { GoogleIcon } from "../icons/AccountIcons";
import { Loader } from "../General";
import { loginUser } from "../../helpers/user";
import { UserContext } from "../../Providers/UserContext";

const LoginForm = ({ toggleLoginForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formValid, setFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const {user,updateUser} = useContext(UserContext);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePassChange = (e) => setPassword(e.target.value);

  const handleFormSubmission = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (!formValid) {
        throw new Error("Form validation failed");
      }
      const { user, token } = await loginUser({
        email: email,
        password: password,
      });
      if(!user){
        throw new Error("Failed to login user");
      }
      updateUser(user);
    } catch (err) {
      console.log(
        "❌Failed to handle login form submission reason -->" + err.message
      );
    }finally{
      setLoading(false)
    }
  };
  useEffect(() => {
    let emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    let passwordValid = password.trim().length >= 4;

    if (emailValidation && passwordValid) {
      setFormValid(true);
    }
  }, [email, password]);
  return (
    <div>
      <div>
        <div>
          <p className="font-display text-[20px] font-semibold">Login</p>
          <p className="font-display text-[10px] text-[#525252]">
            Please login to your account
          </p>
        </div>
        <div className="mt-4">
          <form onSubmit={handleFormSubmission}>
            <div className="flex flex-col gap-2">
              <label
                className="text-[#525252] font-display text-[12px]"
                for="email"
              >
                Email Address
              </label>
              <input
                className="border-[1px]  border-solid font-display text-[14px] border-[#b8b7b7] focus:border-[#b8b7b7] p-2 rounded-xl !outline-0"
                id="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="flex flex-col gap-2 mt-3">
              <label
                className="text-[#525252] font-display text-[12px]"
                for="password"
              >
                Password
              </label>
              <input
                className="border-[1px]  border-solid font-display text-[14px] border-[#b8b7b7] focus:border-[#b8b7b7] p-2 rounded-xl !outline-0"
                type="password"
                placeholder="Password"
                id="password"
                value={password}
                onChange={handlePassChange}
              />
            </div>
            <button
              className="bg-[#000] disabled:bg-[#f0f0f0] text-white font-display font-semibold text-[14px] w-full py-[10px] mt-4 rounded-xl"
              type="submit"
              disabled={!formValid ? "disabled" : ""}
            >
              {loading && (
                <span className="mx-auto w-full flex justify-center items-center">
                  <Loader classes={"!fill-black !dark:text-white"} />
                </span>
              )}
              {!loading && "Login"}
            </button>
            <div className="additional-methods mt-3">
              <div className="flex gap-1 items-center">
                <span className="w-full bg-[#b8b7b7] h-[2px] rounded-2xl"></span>
                <p className="font-display text-[14px] text-[#525252]">Or</p>
                <span className="w-full bg-[#b8b7b7] h-[2px] rounded-2xl"></span>
              </div>
              <button className="flex gap-2 items-center justify-center border-[1px] border-solid border-[#b8b7b7] w-full py-[6px] mt-4 rounded-xl">
                <span>
                  <GoogleIcon />
                </span>
                <p className="font-display text-[14px]">Continue with Google</p>
              </button>
              <div className="flex gap-[2px] items-center mx-auto mt-2">
                <p className="font-display text-[12px] text-[#525252]">
                  Don't have an account?
                </p>
                <button
                  className="font-display text-[14px]"
                  onClick={toggleLoginForm}
                >
                  Sign up
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
