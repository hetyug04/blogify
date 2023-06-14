import React, { useState } from "react";
import styled from "styled-components";
import { Navbar, Alert } from "../components/index.js";
import "../style.css";
import { WithContext as ReactTags } from "react-tag-input";
import { useAppContext } from "../context/AppContext.js";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .newPostWrapper {
    margin-top: 2rem;
    height: 80vh;
    width: 70%;
    display: flex;
    flex-direction: column;
    .ReactTags__tagInput input.ReactTags__tagInputField,
    .ReactTags__tagInput input.ReactTags__tagInputField:focus {
      height: 3rem;
      width: fit-content;
      border: none;
      outline: none;
      border-bottom: 1px solid black;
      font-size: 2rem;
      font-weight: 900;
      margin-bottom: 1rem;
    }
    .ReactTags__selected {
      margin-left: 2rem;
      margin-bottom: 1rem;
      display: flex;
    }
    .ReactTags__selected span.ReactTags__tag {
      font-weight: 600;
      padding: 0.5rem 1.3rem;
      border-radius: 30px;
      background: #b5b1b1;
      color: white;
      margin-right: 0.5rem;
      display: flex;
    }
    .ReactTags__remove {
      outline: none;
      background: none;
      border: none;
      margin-left: 0.3rem;
    }
    input {
      margin-left: 2rem;
      margin-bottom: 3rem;
    }
    .postTitle {
      margin-top: 4rem;
      height: 3rem;
      width: fit-content;
      border: none;
      outline: none;
      border-bottom: 1px solid black;
      font-size: 2rem;
      font-weight: 900;
    }
    .tags {
    }
    .body {
      margin-left: 2rem;
      width: 90%;
      height: 30rem;
      padding: 12px 20px;
      box-sizing: border-box;
      background-color: #d9d9d9;
      border: none;
      outline: none;
      border-bottom: 1px solid black;
      font-size: 1.3rem;
      font-weight: 500;
    }
  }
  .submit {
    margin-top: 2rem;
    margin-left: 2rem;
    height: 4rem;
    width: 14rem;
    background-color: #6bde58;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.3rem;
    font-weight: 800;
    cursor: pointer;
  }

  @media screen and (max-width: 600px) {
    .newPostWrapper {
      width: 90%;
      .postTitle {
        margin: 3rem 0 3rem 0;
        width: 100%;
      }
      .tags {
        margin: 0 0 3rem 0;
        width: 100%;
      }
      .body {
        margin: 0 0 3rem 0;
        width: 100%;
      }
      .submit {
        margin: 0;
      }
      .ReactTags__selected {
        margin-left: 0rem;
        margin-bottom: 1rem;
      }
      .ReactTags__tagInput input.ReactTags__tagInputField,
      .ReactTags__tagInput input.ReactTags__tagInputField:focus {
        margin-left: 0rem;
        margin-bottom: 1rem;
        width: 100%;
      }
    }
  }
`;
const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const NewPost = () => {
  const navigate = useNavigate();
  const { user, postNewPost, showAlert, alertType} = useAppContext();
  const { userName, _id } = user.user;
  const [tags, setTags] = React.useState([]);
  const initialPost = {
    title: "",
    body: "",
    author: userName,
    userId: _id,
    tags: tags,
  };
  const [post, setPost] = useState(initialPost);
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const handleSubmit = async(e) => {
    await alertType
    e.preventDefault();
    const redirect = await postNewPost({
        title: post.title,
        body: post.body,
        author: userName,
        userId: _id,
        tags: tags,
      });
      if(redirect){
        setTimeout(()=>{
          navigate('/home')
        }, 1000)
      }
  };

  const handleKeyDown = async(e) =>{
    if(e.key==='Enter'){
      const redirect = await postNewPost({
        title: post.title,
        body: post.body,
        author: userName,
        userId: _id,
        tags: tags,
      });
      if(redirect){
        setTimeout(()=>{
          navigate('/home')
        }, 1000)
      }
    }
  }
  return (
    <Wrapper>
      <Navbar />
      <div className="newPostWrapper" onSubmit={handleSubmit}>
        {showAlert && <Alert style={{ justifySelf: "center" }} />}
        <input
          type="text"
          className="postTitle"
          placeholder="New Post"
          name="title"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <ReactTags
          className="tags"
          tags={tags}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          inputFieldPosition="top"
          autocomplete
        />
        <textarea
          className="body"
          placeholder="Body"
          name="body"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></textarea>
        <div className="submit" onClick={handleSubmit}>
          Submit
        </div>
      </div>
    </Wrapper>
  );
};

export default NewPost;
