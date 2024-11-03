import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import profile1 from "../img/profile1.jpeg";
import profile2 from "../img/profile2.jpeg";
import profile3 from "../img/profile3.jpeg";
import profile4 from "../img/profile4.jpeg";

function Registration() {
  const [profilePicActive1, setProfilePicActive1] = useState(false);
  const [profilePicActive2, setProfilePicActive2] = useState(false);
  const [profilePicActive3, setProfilePicActive3] = useState(false);
  const [profilePicActive4, setProfilePicActive4] = useState(false);

  const initialValues = {
    profilePicture: "profile1.jpeg",
    username: "",
    email: "",
    password: "",
  };

  const history = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      history("/");
    }
  }, []);

  const validationSchema = Yup.object({
    profilePicture: Yup.string().required(),
    username: Yup.string().min(3).max(20).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(4).max(20).required(),
  });

  const onSubmit = (data) => {
    axios
      .post(
        "https://twitter-clone-api-vini-b52fcd914831.herokuapp.com/auth",
        data
      )
      .then((response) => {
        history("/login");
      });
  };

  const allNotSelected = (index) => {
    if (index != 1) {
      setProfilePicActive1(false);
    }
    if (index != 2) {
      setProfilePicActive2(false);
    }
    if (index != 3) {
      setProfilePicActive3(false);
    }
    if (index != 4) {
      setProfilePicActive4(false);
    }
  };

  return (
    <div className="registration-content">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainerLog">
          <div className="container-field">
            <div className="profile-picture-container">
              <label>Image: </label>
              <Field name="profilePicture">
                {({ field, form }) => (
                  <div className="profile-picture-field">
                    <img
                      className={
                        profilePicActive1 == true
                          ? "profile-picture-active"
                          : "profile-picture"
                      }
                      src={profile1}
                      alt="profile picture 1"
                      {...field}
                      onClick={() => {
                        allNotSelected(1);
                        setProfilePicActive1(true);

                        form.setFieldValue("profilePicture", "profile1");
                      }}
                    />
                    <img
                      className={
                        profilePicActive2 == true
                          ? "profile-picture-active"
                          : "profile-picture"
                      }
                      src={profile2}
                      alt="profile picture 2"
                      {...field}
                      onClick={() => {
                        allNotSelected(2);
                        setProfilePicActive2(true);

                        form.setFieldValue("profilePicture", "profile2");
                      }}
                    />
                    <img
                      className={
                        profilePicActive3 == true
                          ? "profile-picture-active"
                          : "profile-picture"
                      }
                      src={profile3}
                      alt="profile picture 3"
                      {...field}
                      onClick={() => {
                        allNotSelected(3);
                        setProfilePicActive3(true);

                        form.setFieldValue("profilePicture", "profile3");
                      }}
                    />
                    <img
                      className={
                        profilePicActive4 == true
                          ? "profile-picture-active"
                          : "profile-picture"
                      }
                      src={profile4}
                      alt="profile picture 4"
                      {...field}
                      onClick={() => {
                        allNotSelected(4);
                        setProfilePicActive4(true);

                        form.setFieldValue("profilePicture", "profile4");
                      }}
                    />
                  </div>
                )}
              </Field>
            </div>

            <label>Username: </label>
            <Field
              id="input-form-default"
              name="username"
              placeholder="Type the username"
            />
            <ErrorMessage id="message-error" name="username" component="span" />
          </div>
          <div className="container-field">
            <label>Email: </label>

            <Field
              id="input-form-default"
              name="email"
              placeholder="Type the email"
            />
            <ErrorMessage id="message-error" name="email" component="span" />
          </div>
          <div className="container-field">
            <label>Password: </label>

            <Field
              autocomplete="false"
              id="input-form-default"
              name="password"
              placeholder="Type the password"
              type="password"
            />
            <ErrorMessage id="message-error" name="password" component="span" />
          </div>
          <span className="register-btn-container">
            <button className="btn" type="submit">
              Register
            </button>
            <button className="btn">
              <a className="go-to-register" href="/login">
                Login
              </a>
            </button>
          </span>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
