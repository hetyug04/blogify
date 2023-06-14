import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Post, Navbar } from "../components/index.js";
import { useParams, } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Avatar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMinus, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .shit {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .postWrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .line {
    margin-top: 1rem;
    background-color: black;
    width: 80%;
  }
  .userInf {
    display: flex;
    width: 80%;
    height: 19rem;

    .largePfp {
      align-self: center;
      margin-left: 2rem;
      height: 13rem;
      width: 13rem;
      border-radius: 110px;
      font-size: 5rem;
      transition: 1s background-color;
    }
    div {
      width: 30%;
      margin-left: 10%;
      flex-direction: column;
      display: flex;
      align-items: center;
      justify-content: center;
      width: fit-content;
      height: 100%;
      .name {
        display: flex;
        font-size: 3rem;
        .icon {
          margin-left: 1rem;
          margin-right: -1rem;
          font-size: 1.5rem;
          align-self: center;
          cursor: pointer;
        }
      }
      .sub {
        align-self: flex-start;
        font-size: 0.9rem;
        color: #b7b7b7;
      }
      .stat {
        margin-top: 1rem;
        font-size: 2rem;
        font-weight: 700;
      }
      .count {
        color: #b7b7b7;
      }
    }
  }
  @media screen and (max-width: 600px) {
    .userInf {
      margin-bottom: -2rem;
      width: 90%;
      justify-content: space-between;
      flex-wrap: wrap;

      .largePfp {
        height: 7rem;
        width: 7rem;
        margin-left: 0;
        font-size: 1.9rem;
        margin-right: 100%;
      }
      div {
        margin-left: 0;
        height: 3rem;
        .name {
          font-size: 1.5rem;
          margin-right: 1rem;
          .icon {
            margin-right: 0;
            width: fit-content;
            margin-left: 0rem;
            
          }
        }
        margin: 0;
        .stat {
          font-size: 0.9rem;
        }
        .count {
          font-size: 0.8rem;
        }
      }
    }
  }
`;

const UserPage = () => {
  const { id } = useParams();
  const { user, stringAvatar,} = useAppContext();
  const initialUser = {};
  const [currUser, setCurrUser] = useState(initialUser);
  const initialUserPost = [];
  const [userPosts, setUserPosts] = useState(initialUserPost);
  const { userName, dateJoined, followers } = currUser;
  const [isFriend, setFriend] = useState(false);
  const getUser = async () => {
    try {
      const resp = await axios.post("/api/v1/user/getUser", { userName: id });
      setCurrUser(resp.data);

    } catch (error) {
    }
  };
  const getUserPosts = async () => {
    try {
      const resp = await axios.post("/api/v1/user/getUserPosts", {
        userName: id,
      });
      setUserPosts(resp.data.reverse());
    } catch (error) {

    }
  };
  const addFriend = async () => {
    try {
      await axios.post("/api/v1/user/add", {
        userName: id,
        friendAdd: user.user.userName,
      });
    } catch (error) {
    }
    checkFriend();
  };
  const delFriend = async () => {
    try {
      await axios.post("/api/v1/user/del", {
        userName: id,
        friendRemove: user.user.userName,
      });
    } catch (error) {
    }
    checkFriend();
  };
  const checkFriend = async () => {
    try {
      const checkFriend = await axios.post("/api/v1/user/checkFriend", {
        userName: id,
        friend: user.user.userName,
      });
      setFriend(checkFriend.data);
    } catch (error) {
    }
  };
  useEffect(() => {
    getUser();
    getUserPosts();
    checkFriend();
  }, []);

  return (
    <Wrapper>
      <Navbar />
      {currUser.userName ? (
        <div className="shit">
          <hr className="line" />
          <div className="userInf">
            {userName && (
              <Avatar className="largePfp" {...stringAvatar(userName)}></Avatar>
            )}
            <div>
              <h1 className="name">
                {userName}
                {user.user.userName !== id &&
                  (!isFriend ? (
                    <FontAwesomeIcon
                      className="icon"
                      title="Follow"
                      icon={faUserPlus}
                      onClick={addFriend}
                    />
                  ) : (
                    <FontAwesomeIcon
                      className="icon"
                      title="Unfollow"
                      icon={faUserMinus}
                      onClick={delFriend}
                    />
                  ))}
              </h1>
              <h2 className="sub">Joined {dateJoined}</h2>
            </div>
            <div>
              <h1 className="stat">Posts</h1>
              <h2 className="count">{userPosts.length}</h2>
            </div>
            <div>
              <h1 className="stat">Followers</h1>
              <h2 className="count">{followers && followers.length}</h2>
            </div>
          </div>
          <div className="postWrapper">
            {userPosts.map((posts) => {
              const { author, title, body, userId, timePosted, tags, _id } =
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
                ></Post>
              );
            })}
            {userPosts.length === 0 && (
              <h3 style={{ justifySelf: "center" }}>No Posts Yet...</h3>
            )}
          </div>
        </div>
      ) : (
        <div>...</div>
      )}
    </Wrapper>
  );
};

export default UserPage;
