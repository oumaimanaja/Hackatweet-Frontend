import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Hashtag from "../../components/Hashtag";
import LastTweets from "../../components/Hashtag";
import Trends from "../../components/Trends";
import styles from "../../styles/Home.module.css";

function HashtagPage() {
  const router = useRouter();
  const { tag } = router.query;

  return <Hashtag tag={`#${tag}`}></Hashtag>;
}

export default HashtagPage;
