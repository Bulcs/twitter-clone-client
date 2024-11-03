import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { AuthContext } from "../helpers/AuthContext";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  let history = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history("/login");
    } else {
      axios
        .get(
          "https://twitter-clone-api-vini-b52fcd914831.herokuapp.com//posts",
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(
            response.data.likedPosts.map((like) => {
              {
                return like.PostId;
              }
            })
          );
        });
    }
  }, []);

  const likePost = (id) => {
    axios
      .post(
        `https://twitter-clone-api-vini-b52fcd914831.herokuapp.com//like`,
        { PostId: id },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === id) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;

                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );

        if (likedPosts.includes(id)) {
          setLikedPosts(likedPosts.filter((val) => val !== id));
        } else {
          setLikedPosts([...likedPosts, id]);
        }
      });
  };

  const goToProfilePage = (id) => {
    history(`/profile/${id}`);
  };

  return (
    <div className="all-posts">
      {listOfPosts.map((value, key) => {
        return (
          <div className="post">
            <div className="user-info-post">
              <Link
                className="username-font-link"
                to={`/profile/${value.UserId}`}
              >
                {<p className="username-font">{value.username}</p>}
              </Link>
            </div>
            <div
              className="body-post"
              onClick={() => history(`/posts/byId/${value.id}`)}
            >
              <div className="title-post">{value.title}</div>
              <p className="post-text">{value.postText}</p>
            </div>
            <div className="footer-post">
              <span style={{ cursor: "pointer" }}>
                <ThumbUpIcon
                  className="like-btn"
                  sx={
                    likedPosts.includes(value.id)
                      ? { color: "9e9d9d", opacity: "1" }
                      : { color: "#9e9d9d", opacity: "0.2" }
                  }
                  onClick={() => likePost(value.id)}
                />
              </span>
              <label>{value.Likes.length}</label>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
