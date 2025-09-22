import { GoogleIcon } from "../icons/AccountIcons";
import { useEffect, useState } from "react";
import { Loader } from "../General";
import { registerUser } from "../../helpers/user.js";

const RegisterForm = ({ toggleLoginForm }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [formValidate, setFormValidate] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFormSubmission = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      let payload = {
        firstName,
        lastName,
        email,
        phone,
        password,
        userType,
      };
      const registerRequest = await registerUser(payload);
    } catch (err) {
      console.log(
        "❌ Failed to handle register form submission reason -->" + err.message
      );
    } finally {
      setLoading(false);
    }
  };
  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);
  const handlePhoneChange = (e) => setPhone(e.target.value);
  const handleUserTypeChange = (e) => setUserType(e.target.value);

  useEffect(() => {
    let firstNameValidation = firstName.trim().length > 1 ? true : false;
    let emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    let phoneValidation =
      /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(
        phone
      );
    let passwordValid = password.trim().length >= 4;
    let confirmPasswordValid = password == confirmPassword;
    let userTypeValid = userType == "sniper" || userType == "freelancer";

    if (
      firstNameValidation &&
      emailValidation &&
      phoneValidation &&
      passwordValid &&
      confirmPasswordValid &&
      userTypeValid
    ) {
      setFormValidate(true);
    } else {
      setFormValidate(false);
    }
    console.log(formValidate);
  }, [firstName, email, phone, password, confirmPassword, userType]);
  return (
    <div>
      <div>
        <p>Register</p>
      </div>
      <form className="mt-4" onSubmit={handleFormSubmission}>
        <div className="flex gap-2">
          <div className="flex flex-col gap-2">
            <label
              for="firstName"
              className="text-[#525252] font-display text-[12px]"
            >
              First name
            </label>
            <input
              onChange={handleFirstNameChange}
              className="border-[1px] max-w-[130px] border-solid font-display text-[14px] border-[#b8b7b7] focus:border-[#b8b7b7] p-2 rounded-xl !outline-0"
              id="firstName"
              type="text"
              placeholder="First name"
              value={firstName}
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
              onChange={handleLastNameChange}
              className="border-[1px] max-w-[130px] border-solid font-display text-[14px] border-[#b8b7b7] focus:border-[#b8b7b7] p-2 rounded-xl !outline-0"
              id="lastName"
              type="text"
              placeholder="Last name"
              value={lastName}
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
            onChange={handlePhoneChange}
            className="border-[1px]  border-solid font-display text-[14px] border-[#b8b7b7] focus:border-[#b8b7b7] p-2 rounded-xl !outline-0"
            id="phone"
            type="text"
            placeholder="Phone number"
            value={phone}
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
            onChange={handleEmailChange}
            className="border-[1px]  border-solid font-display text-[14px] border-[#b8b7b7] focus:border-[#b8b7b7] p-2 rounded-xl !outline-0"
            id="email"
            type="text"
            placeholder="Email"
            value={email}
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
            onChange={handlePasswordChange}
            className="border-[1px]  border-solid font-display text-[14px] border-[#b8b7b7] focus:border-[#b8b7b7] p-2 rounded-xl !outline-0"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
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
            onChange={handleConfirmPasswordChange}
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            className="border-[1px]  border-solid font-display text-[14px] border-[#b8b7b7] focus:border-[#b8b7b7] p-2 rounded-xl !outline-0"
            value={confirmPassword}
          />
        </div>
        <div className="mt-[6px]">
          <p className="text-[#525252] font-display text-[12px]">
            Choose Uer Type
          </p>
          <div className="flex border-[1px]  border-solid border-[#b8b7b7] rounded-xl mt-2 overflow-hidden">
            <input
              checked={userType == "sniper"}
              onChange={handleUserTypeChange}
              type="radio"
              id="sniper"
              value="sniper"
              name="user_type"
              className="hidden peer/sniper"
            />
            <label
              for="sniper"
              className="font-display text-[14px] flex-[0_0_50%] text-center p-2 peer-checked/sniper:bg-[#000] peer-checked/sniper:text-[#fff]"
            >
              Sniper
            </label>
            <input
              checked={userType == "freelancer"}
              onChange={handleUserTypeChange}
              type="radio"
              id="freelancer"
              value="freelancer"
              name="user_type"
              className="hidden peer/freelancer"
            />
            <label
              for="freelancer"
              className="font-display text-[14px] flex-[0_0_50%] text-center p-2 peer-checked/freelancer:bg-[#000] peer-checked/freelancer:text-[#fff]"
            >
              Freelancer
            </label>
          </div>
        </div>
        <button
          className="bg-[#000] disabled:bg-[#f0f0f0] text-white font-display font-semibold text-[14px] w-full py-[10px] mt-4 rounded-xl"
          type="submit"
          disabled={!formValidate ? "disabled" : ""}
        >
          {loading && (
            <span className="mx-auto w-full flex justify-center items-center">
              <Loader classes={"!fill-black !dark:text-white"} />
            </span>
          )}
          {!loading && "Register"}
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
