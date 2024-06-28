import styles from "../styles/SignUp.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { login, logout } from "../reducers/user";

function SignUp() {
  const [userDetails, setUserDetails] = useState({
    firstname: "",
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSignup = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname: userDetails.firstname,
        username: userDetails.username,
        password: userDetails.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              firstname: data.firstname,
              username: userDetails.username,
              token: data.token,
              userid: data.userid,
              tweetsNumber: data.tweetsNumber,
            })
          );
          setSignUpFirstname("");
          setSignUpUsername("");
          setSignUpPassword("");
          router.push("/Home");
        }
      });
  };

  const setSignUpFirstname = (firstname) => {
    setUserDetails({
      ...userDetails,
      firstname: firstname,
    });
  };

  const setSignUpUsername = (username) => {
    setUserDetails({
      ...userDetails,
      username: username,
    });
  };

  const setSignUpPassword = (password) => {
    setUserDetails({
      ...userDetails,
      password: password,
    });
  };

  return (
    <>
      <div className={styles.registerSection}>
        <p>Connect to hackatweet</p>
        <input
          type="text"
          placeholder="Firstname"
          id="signInUFirstname"
          onChange={(e) => setSignUpFirstname(e.target.value)}
          value={userDetails.firstname}
        />
        <input
          type="text"
          placeholder="Username"
          id="signInUsername"
          onChange={(e) => setSignUpUsername(e.target.value)}
          value={userDetails.username}
        />
        <input
          type="password"
          placeholder="Password"
          id="signInPassword"
          onChange={(e) => setSignUpPassword(e.target.value)}
          value={userDetails.password}
        />
        <button id="connection" onClick={() => handleSignup()}>
          Signup
        </button>
      </div>
    </>
  );
}

export default SignUp;
