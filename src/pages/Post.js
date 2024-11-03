import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Post() {
  let { id } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);
  const history = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://twitter-clone-api-vini-b52fcd914831.herokuapp.com//posts/byId/${id}`
      )
      .then((response) => {
        setPost(response.data);
      });

    axios
      .get(
        `https://twitter-clone-api-vini-b52fcd914831.herokuapp.com//comments/${id}`
      )
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addComment = () => {
    axios
      .post(
        `https://twitter-clone-api-vini-b52fcd914831.herokuapp.com//comments`,
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        //OPTIMISTIC REFRESH
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: response.data.commentBody,
            username: response.data.username,
            id: response.data.id,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(
        `https://twitter-clone-api-vini-b52fcd914831.herokuapp.com//comments/${id}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        //OPTIMISTIC REFRESH
        alert("Comment deleted successfully");
        setComments(
          comments.filter((val) => {
            return val.id !== id;
          })
        );
      });
  };

  const deletePost = (id) => {
    axios
      .delete(
        `https://twitter-clone-api-vini-b52fcd914831.herokuapp.com//posts/${id}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        //OPTIMISTIC REFRESH
        alert("Comment deleted successfully");
        history("/");
      });
  };

  const editPost = (option) => {
    if (option === "title") {
      let newTitle = prompt("Entrer new title");
      axios.put(
        `https://twitter-clone-api-vini-b52fcd914831.herokuapp.com//posts/edit-title`,
        {
          newTitle: newTitle,
          id: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );

      setPost((prevState) => ({ ...prevState, title: newTitle }));
    } else {
      let newPostText = prompt("Entrer new post text");

      axios.put(
        `https://twitter-clone-api-vini-b52fcd914831.herokuapp.com//posts/edit-post-text`,
        {
          newPostText: newPostText,
          id: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );

      setPost((prevState) => ({ ...prevState, postText: newPostText }));
    }
  };

  return (
    <div className="individual-post-container">
      <div className="top-side">
        <div className="post">
          <div className="user-info-post">
            <Link className="username-font-link" to={`/profile/${post.UserId}`}>
              <p className="username-font">{post.username}</p>
            </Link>
          </div>
          <div className="body-post">
            <div
              className="title"
              onClick={() => {
                if (authState.username === post.username) editPost("title");
              }}
            >
              {post.title}
            </div>
            <div
              className="body"
              onClick={() => {
                if (authState.username === post.username) editPost("post");
              }}
            >
              <p>{post.postText}</p>
            </div>
          </div>
          <div className="footer">
            {authState.username === post.username && (
              <button
                className="logout-btn delete-post"
                onClick={() => deletePost(id)}
              >
                Delete Post
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="bottom-side">
        <div className="addCommentContainer">
          <textarea
            type="text"
            placeholder="Add a comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
          <button className="addCommentBtn" onClick={() => addComment()}>
            Comment
          </button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                <label> Username: {comment.username}</label>
                {comment.commentBody}

                {authState.username === comment.username && (
                  <button
                    className="deleteCommentBtn"
                    onClick={() => deleteComment(comment.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
