import { GoogleIcon } from "../icons/AccountIcons";

const RegisterForm = ({ toggleLoginForm }) => {
  return (
    <div>
      <div>
        <p>Register</p>
      </div>
      <form className="mt-4">
        <div className="flex gap-2">
          <div className="flex flex-col gap-2">
            <label
              for="firstName"
              className="text-[#525252] font-display text-[12px]"
            >
              First name
            </label>
            <input
              className="border-[1px] max-w-[130px] border-solid font-display text-[14px] border-[#b8b7b7] focus:border-[#b8b7b7] p-2 rounded-xl !outline-0"
              id="firstName"
              type="text"
              placeholder="First name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-[#525252] font-display text-[12px]"
              for="lastName"
            >
              Last name
            </label>
            <input
              className="border-[1px] max-w-[130px] border-solid font-display text-[14px] border-[#b8b7b7] focus:border-[#b8b7b7] p-2 rounded-xl !outline-0"
              id="lastName"
              type="text"
              placeholder="Last name"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-[6px]">
          <label
            className="text-[#525252] font-display text-[12px]"
            for="phone"
          >
            Phone
          </label>
          <input
            className="border-[1px]  border-solid font-display text-[14px] border-[#b8b7b7] focus:border-[#b8b7b7] p-2 rounded-xl !outline-0"
            id="phone"
            type="text"
            placeholder="Phone number"
          />
        </div>
        <div className="flex flex-col gap-2 mt-[6px]">
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
        <div className="flex flex-col gap-2 mt-[6px]">
          <label
            className="text-[#525252] font-display text-[12px]"
            for="password"
          >
            Password
          </label>
          <input
            className="border-[1px]  border-solid font-display text-[14px] border-[#b8b7b7] focus:border-[#b8b7b7] p-2 rounded-xl !outline-0"
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div className="flex flex-col gap-2 mt-[6px]">
          <label
            className="text-[#525252] font-display text-[12px]"
            for="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="border-[1px]  border-solid font-display text-[14px] border-[#b8b7b7] focus:border-[#b8b7b7] p-2 rounded-xl !outline-0"
          />
        </div>
        <div className="mt-[6px]">
          <p className="text-[#525252] font-display text-[12px]">Choose Uer Type</p>
          <div className="flex border-[1px]  border-solid border-[#b8b7b7] rounded-xl mt-2 overflow-hidden">
            <input
              type="radio"
              id="sniper"
              value="sniper"
              name="user_type"
              className="hidden peer/sniper"
            />
            <label for="sniper" className="font-display text-[14px] flex-[0_0_50%] text-center p-2 peer-checked/sniper:bg-[#000] peer-checked/sniper:text-[#fff]">Sniper</label>
            <input
              type="radio"
              id="freelancer"
              value="freelancer"
              name="user_type"
              className="hidden peer/freelancer"
            />
            <label for="freelancer" className="font-display text-[14px] flex-[0_0_50%] text-center p-2 peer-checked/freelancer:bg-[#000] peer-checked/freelancer:text-[#fff]">Freelancer</label>
          </div>
        </div>
        <button
          className="bg-[#000] text-white font-display font-semibold text-[14px] w-full py-[10px] mt-4 rounded-xl"
          type="submit"
        >
          Register
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
        </div>
        <div className="flex gap-[2px] items-center mx-auto mt-2">
          <p className="font-display text-[12px] text-[#525252]">
            Have an account?
          </p>
          <button
            className="font-display text-[14px]"
            onClick={toggleLoginForm}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
