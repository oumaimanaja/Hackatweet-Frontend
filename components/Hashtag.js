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
  console.log(props.tag);
  useEffect(() => {
    // console.log(
    //   "url:",
    //   `http://localhost:3000/hashtags/${encodeURIComponent(props.tag)}`
    // );
    fetch(`http://localhost:3000/hashtags/${encodeURIComponent(props.tag)}`)
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
      <h1>Hashtag Component</h1>
      {/* Contenu du composant Hashtag */}
      <div className={styles.Home}>
        <div className="sidebar">
          <div className="logo" onClick={() => router.push("/Home")}>
            {/* Logo ici */}
            LOGO
          </div>
          <div className="user-info">
            <p>{user.name}</p>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="main-content">
          <div className="Search Hashtag">
            <input
              type="text"
              placeholder="Search Hashtag ?"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button onClick={() => HandleSearch(text)}>Search by tag</button>
          </div>
          //Hashtag search: {searchResult}
          {/* <LastTweets user={user}></LastTweets> */}
        </div>
        <div className="trends-section"></div>
        //Composant Hashtags Trends
        <Trends></Trends>
      </div>
    </div>
  );
}
export default Hashtag;
