import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [post, setPost] = useState("");

  const initialValues = {
    title: "",
    postText: "",
  };

  const history = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history("/login");
    }
  }, []);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    postText: Yup.string().max(255).required(),
  });

  const onSubmit = (data) => {
    axios
      .post(
        "https://twitter-clone-api-vini-b52fcd914831.herokuapp.com//posts",
        data,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          history("/");
        }
      });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <div className="container-field">
            <Field
              id="input-form-default"
              name="title"
              placeholder="Type the title"
            />
            <ErrorMessage id="message-error" name="title" component="span" />
          </div>
          <div className="container-field">
            <label>Post: </label>

            <Field name="postText">
              {({ field, form }) => (
                <textarea
                  {...field}
                  id="input-form-default"
                  className="textarea-post-text"
                  placeholder="Type the Post"
                  onChange={(event) => {
                    form.setFieldValue("postText", event.target.value);
                    setPost(event.target.value);
                  }}
                  maxLength={255}
                />
              )}
            </Field>
            <span className="qtd-characters-post-text">{post.length}</span>
            <ErrorMessage id="message-error" name="postText" component="span" />
          </div>
          <span className="tweet-btn-container">
            <button className="tweet-btn" type="submit">
              Tweet
            </button>
          </span>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
