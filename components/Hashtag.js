import styles from "../styles/Home.module.css";
import LastTweets from "./LastTweets";
import Trends from "./Trends";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../reducers/user";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Tweet from "./Tweet";

function Hashtag(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.value);
  const [text, setText] = useState(""); // Tag du tweet
  let SearchJSX = <div>No tweets found </div>;
  const [searchResult, setSearchResult] = useState(SearchJSX);
  //console.log(props.tag);
  useEffect(() => {
    fetch(`http://localhost:3000/hashtags/${encodeURIComponent(props.tag)}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.Nbr == 0) {
          SearchJSX = <div>No tweets found with {text} </div>;
        } else {
          const ListTweetswithtag = data.tagresults[0].tweets.map((e, i) => {
            console.log("this is e", e);
            return <Tweet key={i} props={e} />;
          });
          SearchJSX = ListTweetswithtag.reverse();
        }
        setSearchResult(SearchJSX);
      });
  }, [props.tag]);

  const handleLogout = () => {
    // Gérer la déconnexion ici
    dispatch(logout());
    router.push("/Login");
  };
  function HandleSearch(text) {
    router.push(`/Hashtag/${text.slice(1)}}`);

    fetch(`http://localhost:3000/hashtags/${encodeURIComponent(text)}`)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);

        //console.log(data.Nbr);
        if (data.Nbr == 0) {
          SearchJSX = <div>No tweets found with {text} </div>;
        } else {
          const ListTweetswithtag = data.tagresults[0].tweets.map((e, i) => {
            return <Tweet key={i} props={e} />;
          });
          SearchJSX = ListTweetswithtag.reverse();
        }
        setSearchResult(SearchJSX);
      });
  }

  return (
    <div>
      <div className="min-h-screen  bg-slate-900 text-white flex flex-row justify-items-center justify-center py-5 px-5">
        <div className="Login basis-1/4 flex flex-col  justify-between ">
          <div className="logo  " onClick={() => router.push("/Home")}>
            <img className=" rounded-full h-12" src="/logo.png"></img>
          </div>
          {user.userid && (
            <div>
              <div className="user-info flex justify-start">
                <img className="rounded-full h-10" src="/user.jpg "></img>
                <div className="flex flex-col px-2">
                  <span className="font-semibold">{user.firstname} </span>
                  <span className="text-slate-700">@ {user.username}</span>
                </div>
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
          )}
        </div>
        <div className="main-content basis-2/4">
          <div className="Home text-3xl font-bold  text-sky-400/100 py-2">
            Hashtag
          </div>
          <div className="Search Hashtag grid justify-items-stretch ">
            <div className="py-2 px-10">
              <input
                className=" bg-slate-800 w-11/12 h-10 rounded-lg"
                type="text"
                placeholder="Search Hashtag ?"
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
            </div>
            <div className="justify-self-end px-10">
              <button
                className="bg-blue-500 shadow-lg shadow-blue-500/50  rounded-full w-32"
                onClick={() => HandleSearch(text)}
              >
                Search by tag
              </button>
            </div>
          </div>
          <div className="divide-y divide-dotted py-3">{searchResult}</div>
        </div>
        <div className="trends-section basis-1/4 mx-5">
          <div className="Home text-2xl font-bold  text-sky-400/100 py-2">
            Trends
          </div>
          <Trends></Trends>
        </div>
      </div>
    </div>
  );
}
export default Hashtag;
