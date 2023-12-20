import { useRef, useState } from "react";
import classes from "./auth-form.module.css";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const createUser = async (email, password) => {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(email, password),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Couldnt create user");
    }

    return data;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (isLogin) {
      return;
    }

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    
    createUser(email, password);
  };
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
