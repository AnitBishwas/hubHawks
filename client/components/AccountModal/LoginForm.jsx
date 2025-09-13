import { GoogleIcon } from "../icons/AccountIcons";

const LoginForm = ({toggleLoginForm}) => {
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
          <form>
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
              />
            </div>
            <button
              className="bg-[#000] text-white font-display font-semibold text-[14px] w-full py-[10px] mt-4 rounded-xl"
              type="submit"
            >
              Login
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
                <p className="font-display text-[12px] text-[#525252]">Don't have an account?</p>
                <button className="font-display text-[14px]" onClick={toggleLoginForm}>Sign up</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
