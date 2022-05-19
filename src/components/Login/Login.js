import React, { useReducer, useContext } from "react";
import AuthContext from "../../store/auth-context";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// const emailReducer = (prevState, action) => {
//   if (action.type === "EMAIL_INPUT") {
//     return { value: action.val, isValid: action.val.includes("@") };
//   }
//   return { value: "", isValid: false };
// };
// const passReducer = (prevState, action) => {
//   if (action.type === "PASS_INPUT") {
//     return { value: action.val, isValid: action.val.trim().length > 6 };
//   }
//   return { value: "", isValid: false };
// };

const identityReducer = (prevState, action) => {
  if (action.type === "EMAIL_INPUT") {
    return {
      email: action.email,
      emailValid: action.email.includes("@"),
      pass: prevState.pass,
      passValid: prevState.passValid,
    };
  }
  if (action.type === "PASS_INPUT") {
    return {
      email: prevState.email,
      emailValid: prevState.emailValid,
      pass: action.pass,
      passValid: action.pass.trim().length > 6,
    };
  }
  return { email: "", emailValid: null, pass: "", passValid: null };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [formIsValid, setFormIsValid] = useState(false);

  const [identityState, dispatchIdentity] = useReducer(identityReducer, {
    email: "",
    emailValid: null,
    pass: "",
    passValid: null,
  });

  // const [emailState, dispatchEmail] = useReducer(emailReducer, {
  //   value: "",
  //   isValid: null,
  // });

  // const [passState, dispatchPass] = useReducer(passReducer, {
  //   value: "",
  //   isValid: null,
  // });

  // useEffect(() => {
  //   console.log("EFFECT RUNNING");

  //   return () => {
  //     console.log("EFFECT CLEANUP");
  //   };
  // }, []);

  // useEffect(() => {
  //   const identifier = setTimeout(() => {
  //     console.log("Checking form validity!");
  //     setFormIsValid(
  //       identityState.emailValid && identityState.passValid
  //     );
  //   }, 500);

  //   return () => {
  //     console.log("CLEANUP");
  //     clearTimeout(identifier);
  //   };
  // }, [identityState.emailValid, identityState.passValid]);

  const emailChangeHandler = (event) => {
    dispatchIdentity({ type: "EMAIL_INPUT", email: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchIdentity({ type: "PASS_INPUT", pass: event.target.value });
  };
  const ctx = useContext(AuthContext);
  const submitHandler = (event) => {
    event.preventDefault();
    ctx.onLogin(identityState.email, identityState.pass);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            identityState.emailValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={identityState.email}
            onChange={emailChangeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            identityState.passValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={identityState.pass}
            onChange={passwordChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!(identityState.emailValid && identityState.passValid)}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
