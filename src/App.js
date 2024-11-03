import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import "./App.css";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import bgimg from "./img/bgimg.png";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://twitter-clone-api-vini-b52fcd914831.herokuapp.com/auth/auth",
        {
          headers: { accessToken: localStorage.getItem("accessToken") },
        }
      )
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ ...authState, status: false });
  };

  return (
    <>
      <div className="bg-img-div">
        <img className="bg-img" src={bgimg} alt="Logo" />
      </div>

      <div className="App container">
        <div className="row">
          <div className="app-container col-md-8 offset-md-2">
            <AuthContext.Provider value={{ authState, setAuthState }}>
              <Router>
                {authState.status && (
                  <div className="menu">
                    <Link className="btn-menu" to="/">
                      Home
                    </Link>
                    <Link
                      className="btn-menu"
                      onClick={() => setForceUpdate(true)}
                      to={`/profile/${authState.id}`}
                    >
                      Profile
                    </Link>
                    <Link className="btn-menu" to="/createpost">
                      Create A Post
                    </Link>

                    <Link
                      className="logout-btn"
                      onClick={() => logout()}
                      to="/login"
                    >
                      Logout
                    </Link>
                  </div>
                )}

                <Routes>
                  <Route path="/" exact element={<Home />} />
                  <Route path="/createpost" exact element={<CreatePost />} />
                  <Route path="/posts/byId/:id" exact element={<Post />} />
                  <Route path="/login" exact element={<Login />} />
                  <Route
                    path="/registration"
                    exact
                    element={<Registration />}
                  />
                  <Route path="/profile/:id" exact element={<Profile />} />
                  <Route
                    path="/change-password"
                    exact
                    element={<ChangePassword />}
                  />
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </Router>
            </AuthContext.Provider>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
