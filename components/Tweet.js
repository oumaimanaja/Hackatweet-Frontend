import styles from "../styles/Tweet.module.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../reducers/user";

function Tweet({ props }) {
  console.log("this is props tweet", props);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const isLikedByUser = props.likedBy.some((like) => like._id === user.userid);
  //console.log(isLikedByUser);
  const [likeStatus, setLikeStatus] = useState(isLikedByUser);

  const [likesCount, setLikesCount] = useState(props.likedBy.length);
  console.log("NOMBRE DE LIKE", props.likedBy.length);

  const handleLikeClick = () => {
    if (!user.token) {
      return;
    }

    // router.put("/like", async (req, res) => {
    //   const { tweetId, userId, isLiked } = req.body;

    fetch(`http://localhost:3000/tweets/like`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tweetId: props._id,
        userId: user.userid,
        isLiked: likeStatus,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log("likeStatus", likeStatus);
        setLikeStatus(!likeStatus);
        setLikesCount(likeStatus ? likesCount - 1 : likesCount + 1);
        //console.log("likeStatus", likeStatus);
      });
  };

  let iconStyle = likeStatus ? { color: "red" } : {};
  const handleDeleteClick = () => {
    fetch(`http://localhost:3000/tweets/delete/${props._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              firstname: user.firstname,
              username: user.username,
              userid: user.userid,
              token: user.token,
              tweetsNumber: user.tweetsNumber - 1,
            })
          );
        }
      });
  };

  return (
    <div className="py-2">
      <div className="Userdetails flex items-center ">
        <img className="rounded-full h-12" src="/user.jpg "></img>
        <div className="Userdetails px-2 ">
          <span className="font-semibold">{props.userId.firstname}</span>
          <span className="text-slate-700"> @{props.userId.username}. </span>
          <span className="text-slate-700 italic">
            {new Date(props.CreateDate).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="Tweet py-2">{props.text}</div>
      <div className="Like Button">
        <FontAwesomeIcon
          icon={faHeart}
          onClick={handleLikeClick}
          style={iconStyle}
          className=""
        />
        <span className="ml-2">{likesCount}</span>
        {props.userId._id === user.userid && (
          <FontAwesomeIcon
            icon={faTrash}
            onClick={handleDeleteClick}
            className="cursor-pointer ml-4"
          />
        )}
      </div>
    </div>
  );
}

export default Tweet;
