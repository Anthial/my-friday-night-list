import { Link } from "react-router-dom";
import react from "react";
import { useState } from "react";
function RegisterView(props: any /* Model */) {
  function emailValueChangedACB(e: any) {
    props.onEmailChange(e.target.value);
  }
  function nicknameValueChangedACB(e: any) {
    props.onNicknameChange(e.target.value);
  }
  function passwordValueChangedACB(e: any) {
    props.onPasswordChange(e.target.value);
  }
  function repeatedPasswordValueChangedACB(e: any) {
    props.onRepeatedPasswordChange(e.target.value);
  }
  function loginButtonPressedACB() {
    props.attemptRegistration();
  }
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container mx-auto max-w-sm m-8 bg-gradient-to-br from-[#312244] via-purple-900 to-[#312244] rounded-xl bg-contain mx-auto px-2 py-2 ">
      <div className="bg-gradient-to-br from-[#101E34] via-purple-900 to-[#101E34]">
      <Link to="/"><button className="hover:bg-[#4D194D] bg-transparent rounded-none rounded-r-lg">Back</button></Link>
      <div className=" pb-10 flex flex-col items-center rounded-lg">  
        <label className="text-white" htmlFor="Login">
          Register an account
        </label>
        <div>
          <input
            className="text-white mt-2 mb-1 px-2 py-1 rounded-lg bg-[#312244]"
            type="text"
            name="Email"
            id="email"
            placeholder="Email"
            onChange={emailValueChangedACB}
            onKeyDown={(e)=> {if (e.key === "Enter") loginButtonPressedACB()}}
            required
          ></input>
        </div>
        <div>
          <input
            className="text-white mt-1 mb-1 px-2 py-1 rounded-lg bg-[#312244]"
            type="text"
            name="Nickname"
            id="Nickname"
            placeholder="Nickname"
            onChange={nicknameValueChangedACB}
            onKeyDown={(e)=> {if (e.key === "Enter") loginButtonPressedACB()}}
            required
          ></input>
        </div>
        <div>
          <label className="mt-1 mb-1 px-2 py-1">Show Password</label><input type="checkbox" value="Show Password" onChange={() => setShowPassword(!showPassword)}></input>
        </div>
        <div>
          <input
            className="text-white mt-1 mb-1 px-2 py-1 rounded-lg bg-[#312244]"
            type={showPassword ? "text" : "password"}
            name="Password"
            id="Password"
            placeholder="Password"
            onChange={passwordValueChangedACB}
            onKeyDown={(e)=> {if (e.key === "Enter") loginButtonPressedACB()}}
            required
          ></input>
        </div>
        
        <div>
          <input
            className="text-white mt-1 mb-2 px-2 py-1 rounded-lg bg-[#312244]"
            type={showPassword ? "text" : "password"}
            name="PasswordRepeated"
            id="PasswordRepeated"
            placeholder="Repeat password"
            onChange={repeatedPasswordValueChangedACB}
            onKeyDown={(e)=> {if (e.key === "Enter") loginButtonPressedACB()}}
            required
          ></input>
        </div>
        <div className="text-white">
          <button
            className="px-11 py-1 bg-[#312244]"
            onClick={loginButtonPressedACB}
          >
            Register account
          </button>
        </div>
        <div className="mt-1 text-red-500 justify-end" hidden={props.registerErrorMessage == ""}>
          {props.registerErrorMessage
          /* "Enter a name and password to register an account / Passwords must be the same / Email already taken" */
          }
        </div>
      </div>
      </div>
    </div>
  );
}
export default RegisterView;
