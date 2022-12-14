import RegisterView from "../views/registerView";
import { useState } from "react";
import { UserAccount, createUser, UserData, loggedInUserAtom } from "../../backend/model/user";
import { useSetRecoilState } from "recoil";
import Spinner from "../views/spinnerView";

function Register(/*props: any*/) {
  const [userRegistrationData, setUserRegistrationData] = useState({ email: "", password: "", nickname: "" } as UserAccount);
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [specifiedErrorText, setErrorText] = useState("");
  const [isWaitingForPromise, setWaitingForPromise] = useState(false);
  const setLoggedInUser = useSetRecoilState(loggedInUserAtom);

  function attemptUserRegistrationACB() {
    setErrorText("");

    //First error, user must input a name and password
    //Other error, passwords must match
    //Third error, the email already exists
    try {
      if (userRegistrationData.password === repeatedPassword) {
        setWaitingForPromise(true);
        createUser(userRegistrationData)
          .then((d: UserData) => {
            setLoggedInUser(d);
          })
          .catch((e: Error) => setErrorText(e.message))
          .finally(() => setWaitingForPromise(false));
      } else {
        throw new Error("Passwords need to match");
      }
    } catch (error: any) {
      setWaitingForPromise(false);
      setErrorText(error.message);
    }
  }
  function updateEmailInputACB(emailString: string) {
    setErrorText("");
    setUserRegistrationData({...userRegistrationData, email: emailString});
  }
  function updateNicknameInputACB(nicknameString: string) {
    setErrorText("");
    setUserRegistrationData({...userRegistrationData, nickname: nicknameString});
  }
  function updatePasswordInputACB(passwordString: string) {
    setErrorText("");
    setUserRegistrationData({...userRegistrationData, password: passwordString});
  }
  function updateRepeatedPasswordInputACB(repeatedPasswordString: string) {
    setErrorText("");
    setRepeatedPassword(repeatedPasswordString);
  }

  if(isWaitingForPromise) {
    return <Spinner/>;
  }

  return (
    <RegisterView
      registerErrorMessage={specifiedErrorText}
      attemptRegistration={attemptUserRegistrationACB}
      onEmailChange={updateEmailInputACB}
      onNicknameChange={updateNicknameInputACB}
      onPasswordChange={updatePasswordInputACB}
      onRepeatedPasswordChange={updateRepeatedPasswordInputACB}
    />
  );
}
export default Register;
