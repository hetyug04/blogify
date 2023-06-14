import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import styled from "styled-components";
import { Navbar } from "../components";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Alert } from "../components/index.js";
import { useAppContext } from "../context/AppContext";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .post {
    height: fit-content;
  }
`;

const PostPage = () => {
  const initialPost = {
    title: "",
    body: "",
    author: "",
    userId: "",
    tags: "",
  };
  const { id } = useParams();
  const [post, setPost] = useState(initialPost);
  const { showAlert } = useAppContext();
  const getPost = async () => {
    try {
      const resp = await axios.post("/api/v1/post/getPost", { id });
      setPost(resp.data)
    } catch (error) {}
  };

  useEffect(() => {
    getPost();
  }, []);
  const { author, title, body, userId, _id, timePosted, tags } = post;
  return (
    <Wrapper>
      {showAlert && <Alert />}
      <Navbar />
      {post.author && (
        <Post
          author={author}
          title={title}
          body={body}
          userId={userId}
          timePosted={timePosted}
          tags={tags}
          isPostPage={true}
          id={_id}
          className="post"
        ></Post>
      )}
    </Wrapper>
  );
};

export default PostPage;
