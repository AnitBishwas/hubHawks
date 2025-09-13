import { GoogleIcon } from "../icons/AccountIcons";

const RegisterForm = ({toggleLoginForm}) => {
  return (
    <div>
      <div>
        <p>Register</p>
      </div>
      <form>
        <div>
          <div>
            <label for="firstName">First name</label>
            <input id="firstName" type="text" placeholder="First name" />
          </div>
          <div>
            <label for="lastName">Last name</label>
            <input id="lastName" type="text" placeholder="Last name" />
          </div>
        </div>
        <div className="">
          <label for="phone">Phone</label>
          <input id="phone" type="text" placeholder="Phone number" />
        </div>
        <div className="">
          <label for="email">Email Address</label>
          <input id="email" type="text" placeholder="Email" />
        </div>
        <div className="">
          <label for="password">Password</label>
          <input id="password" type="password" placeholder="Password" />
        </div>
        <div>
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <button type="submit">Register</button>
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
                <p className="font-display text-[12px] text-[#525252]">Have an account?</p>
                <button className="font-display text-[14px]" onClick={toggleLoginForm}>Login</button>
              </div>
      </form>
    </div>
  );
};

export default RegisterForm;
