import styles from "../styles/Home.module.css";
import { useSelector } from "react-redux";
import LastTweets from "./LastTweets";
import Trends from "./Trends";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../reducers/user";
import { useRouter } from "next/router";
function Home() {
  const user = useSelector((state) => state.user.value);
  console.log(user);
  const [text, setText] = useState(""); // Text du tweet

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    // Gérer la déconnexion ici
    dispatch(logout());
    router.push("/Login");
  };

  const handleTweet = (text) => {
    fetch("http://localhost:3000/tweets/createTweet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: text,
        userId: user.userid,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(
          login({
            firstname: user.firstname,
            username: user.username,
            userid: user.userid,
            token: user.token,
            tweetsNumber: data.tweetsNumber,
          })
        );
        setText("");
      });
  };

  return (
    <div className="min-h-screen  bg-slate-900 text-white flex flex-row justify-items-center justify-center py-5 px-5">
      <div className="Login basis-1/4 flex flex-col  justify-between ">
        <div className="logo  " onClick={() => window.location.reload()}>
          <img className=" rounded-full h-12" src="/logo.png"></img>
        </div>
        <div>
          <div className="user-info flex justify-start">
            <img className="rounded-full h-10" src="/user.jpg "></img>
            <p className="flex flex-col px-2">
              <span className="font-semibold">{user.firstname} </span>
              <span className="text-slate-700">@ {user.username}</span>
            </p>
          </div>
          <div className="Logout  py-5">
            <button
              className="bg-slate-400 rounded-full w-20 h-10 "
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="main-content basis-2/4">
        <div className="Home text-3xl font-bold  text-sky-400/100 py-2">
          Home
        </div>
        <div className="AddTweet grid justify-items-stretch ">
          <div className="py-2 px-10">
            <input
              className=" bg-slate-800 w-11/12 h-10 rounded-lg"
              type="text"
              placeholder="Whats up ?"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </div>
          <div className="justify-self-end px-10">
            <button
              className="bg-blue-500 shadow-lg shadow-blue-500/50  rounded-full w-32"
              onClick={() => handleTweet(text)}
            >
              Tweet
            </button>
          </div>
        </div>

        <LastTweets user={user}></LastTweets>
      </div>
      <div className="trends-section basis-1/4 mx-5">
        <div className="Home text-2xl font-bold  text-sky-400/100 py-2">
          Trends
        </div>
        <Trends user={user}></Trends>
      </div>
    </div>
  );
}
export default Home;
