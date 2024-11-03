import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import profile1 from "../img/profile1.jpeg";
import profile2 from "../img/profile2.jpeg";
import profile3 from "../img/profile3.jpeg";
import profile4 from "../img/profile4.jpeg";

function Profile() {
  let { id } = useParams();
  const [user, setUser] = useState({});
  const [listOfUserPosts, setListOfUserPosts] = useState([]);
  const { authState } = useContext(AuthContext);
  const [editProfile, setEditProfile] = useState(false);
  const [bioText, setBioText] = useState("");
  const [email, setEmail] = useState("");

  const history = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/auth/profile-info/${id}`)
      .then((response) => {
        setUser(response.data);
        setEmail(response.data.email);
        setBioText(response.data.bioText);
      });

    axios
      .get(`http://localhost:3001/posts/by-user-id/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setListOfUserPosts(response.data);
      });
  }, [id]);

  const _editProfile = () => {
    axios
      .put(
        `http://localhost:3001/auth/edit-profile`,
        {
          newBioText: bioText,
          newEmail: email,
        },
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        alert(response.data);

        history(0);
      });
  };

  const getTheProfilePic = (profilePic) => {
    if (profilePic == "profile1") return profile1;
    if (profilePic == "profile2") return profile2;
    if (profilePic == "profile3") return profile3;
    if (profilePic == "profile4") return profile4;
  };

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        <img
          className="profile-picture-just-show"
          src={getTheProfilePic(user.profilePicture)}
          alt="Profile Pic"
        />
        <h1>{user.username}</h1>
        {editProfile === false ? (
          <>
            <h4>{user.email}</h4>
            <h6>{user.bioText}</h6>
            {authState.username === user.username && (
              <div className="btn-profile">
                <button
                  className="btn-edit-profile"
                  onClick={() => {
                    setEditProfile(true);
                  }}
                >
                  Edit Profile
                </button>
                <button
                  className="change-pass-btn"
                  onClick={() => {
                    history("/change-password");
                  }}
                >
                  Change password
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="form-edit-profile-input">
              <label for="femail">Email:</label>
              <input
                className="input-text-edit-profile"
                name="femail"
                type="text"
                defaultValue={user.email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>
            <div className="form-edit-profile-input">
              <label for="fbio">Bio:</label>
              <input
                className="input-text-edit-profile"
                name="fbio"
                type="text"
                defaultValue={user.bioText}
                onChange={(event) => {
                  setBioText(event.target.value);
                }}
              />
            </div>
            {authState.username === user.username && (
              <div className="btns-edit-profile">
                <button
                  className="btn"
                  onClick={() => {
                    _editProfile();
                  }}
                >
                  Save
                </button>
                <button
                  className="btn-cancel"
                  onClick={() => {
                    setEditProfile(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <div className="listOfPosts">
        {listOfUserPosts.map((value, key) => {
          return (
            <div className="post">
              <p>{value.username}</p>
              <div className="title">{value.title}</div>
              <div
                className="body"
                //onClick={() => history(`/post/${value.id}`)}
              >
                <p>{value.postText}</p>
              </div>
              <div className="footer-profile-comment">
                {/* <span style={{ cursor: "non-pointer" }}> */}
                <span>
                  <ThumbUpIcon
                    className="like-btn"
                    color="#9e9d9d"
                    opacity="0.2"
                    // onClick={() => likePost(value.id)}
                  />
                  <label>{value.Likes.length}</label>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
