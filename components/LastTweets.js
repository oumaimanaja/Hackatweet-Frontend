import styles from "../styles/LastTweets.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Tweet from "./Tweet";

function LastTweets({ user }) {
  //const User = useSelector((state) => state.user.value);
  const [tweetData, setTweetData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tweets/all")
      .then((response) => response.json())
      .then((data) => {
        setTweetData(data);
      });
  }, [user.tweetsNumber]);

  const ListTweets = tweetData.map((data, i) => {
    return <Tweet key={i} props={data} />;
  });

  return <p className="divide-y divide-dotted py-3">{ListTweets.reverse()}</p>;
}

export default LastTweets;
