import styles from "../styles/Trends.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import Hashtag from "./Hashtag";
import { useRouter } from "next/router";

function Trends() {
  const user = useSelector((state) => state.user.value);
  const router = useRouter();
  const [trendsData, setTrendsData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/hashtags/all")
      .then((response) => response.json())
      .then((data) => {
        setTrendsData(data);
      });
  }, [user.tweetsNumber]);

  const ListHashtags = trendsData.map((data, i) => {
    return (
      <div className="bg-slate-800 rounded-lg my-5 ">
        <div
          className="py-1 px-3"
          key={i}
          onClick={() => navigateToHashtagPage(data.hashtag)}
        >
          #{data.hashtag} <br></br>
          <span className="text-sm text-slate-600">
            {data.tweets.length} Tweets
          </span>
        </div>
      </div>
    );
    //<Hashtag key={i} props={data} />;
  });

  const navigateToHashtagPage = (tag) => {
    router.push(`/Hashtag/${encodeURIComponent(tag)}`);
  };
  return <p>{ListHashtags}</p>;
}

export default Trends;
