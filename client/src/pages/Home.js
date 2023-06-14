/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Post, Navbar } from "../components/index.js";
import { useAppContext } from "../context/AppContext.js";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .navBar {
    margin-top: 1rem;
    width: 80%;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user {
      align-items: center;
      display: flex;
      font-size: 1.9rem;
      .userName {
        font-size: inherit;
        font-weight: inherit;
      }
      .pfImg {
        margin-left: 1rem;
        height: 4rem;
        width: 4rem;
        border-radius: 35px;
        background-color: grey;
      }
    }
  }
  .postFlipper {
    margin-top: 1rem;
    display: flex;
    justify-content: space-around;
    height: 1.9rem;
    align-items: center;
    width: 18rem;
    h1 {
      border-radius: 30px;
      width: 8rem;
      text-align: center;
      font-size: 1.3rem;
      font-weight: 600;
      background-color: #d9d9d9;
      transition: 0.3s background-color;
      cursor: pointer;
    }
    h1:hover {
      background-color: #b0b0b0;
    }
  }
  .newPostWrapper {
    margin-top: 1rem;
    height: 6rem;
    width: 80%;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    .newPost {
      border-radius: 35px;
      width: 35rem;
      height: 4rem;
      background-color: #d9d9d9;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 700;
      font-size: 1.5rem;
    }
  }
  .postWrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  @media screen and (max-width: 600px) {
  }
`;

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [allFollowerPosts, setFollowerPosts] = useState([]);
  const [postState, setPostState] = useState("allPosts");
  const getAllPosts = async () => {
    const allPosts = await axios.get("/api/v1/post/getAllPosts");
    setAllPosts(allPosts.data.reverse());
    setLoading(false);
  };
  const { user } = useAppContext();
  const getFollowingPost = async () => {
    try {
      const allFolPosts = await axios.post("/api/v1/user/getFollowingPosts", {
        userName: user.user.userName,
      });
      setFollowerPosts(allFolPosts.data.reverse());
    } catch (error) {
    }
  };
  useEffect(() => {
    getAllPosts();
    getFollowingPost();
  }, [user]);

  return (
    <Wrapper>
      <Navbar />
      {!isLoading ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="newPostWrapper">
            <Link
              to="/new"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="newPost">New Post +</div>
            </Link>
          </div>
          <div className="postFlipper">
            <h1 onClick={() => setPostState("allPosts")}>All</h1>
            <h1 onClick={() => setPostState("allFollowerPosts")}>Following</h1>
          </div>
          {eval(postState).map((posts) => {
            const { author, title, body, userId, _id, timePosted, tags } =
              posts;
            return (
              <Post
                author={author}
                title={title}
                body={body}
                userId={userId}
                timePosted={timePosted}
                tags={tags}
                isPostPage={false}
                id={_id}
                key={_id}
              ></Post>
            );
          })}
        </div>
      ) : (
        <div>...</div>
      )}
    </Wrapper>
  );
};

export default Home;
