import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Avatar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faX } from "@fortawesome/free-solid-svg-icons";
const Wrapper = styled.div`
  width: 100%;
  .post {
    z-index: -1;
    color: black;
    margin: 0 auto;
    margin-top: 2rem;
    width: 48rem;
    background-color: #d9d9d9;
    height: max-content;
    border-radius: 35px;
    display: flex;
    flex-direction: column;
    .readMore {
      color: blue;
      font-size: inherit;
    }
    .tags {
  margin: 1rem 0 1rem 2rem;
  display: flex;
  flex-wrap: wrap; /* Added flex-wrap property */
  width: auto;
  .tag {
    height: 1rem;
    font-weight: 600;
    border-radius: 30px;
    background: #b5b1b1;
    color: white;
    padding: .5rem .5rem;
    margin-right: 0.5rem;
    margin-top: .5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
}

    .userInfo {
      width: 100%;
      display: flex;
      flex-direction: row;
      .delete {
        align-self: center;
        margin-left: auto;
        margin-right: 3rem;
        font-size: 1.5rem;
        z-index: 100;
        transition: color 0.15s;
      }
      .check {
        align-self: center;
        margin-left: auto;
        margin-right: 1.5rem;
        font-size: 1.5rem;
        z-index: 100;
        transition: color 0.15s;
      }
      .delete:hover {
        color: red;
      }
      .check:hover {
        color: green;
      }
      .confirmContainer {
        align-self: center;
        margin-left: auto;
        font-size: 1.5rem;
      }
      .pfp {
        height: 7rem;
        width: 7rem;
        border-radius: 60px;
        margin-top: 2rem;
        margin-left: 2rem;
        font-size: 1.9rem;
      }
      .postTitle {
        margin-left: 2rem;
        margin-top: 3rem;
        align-self: center;
        h3 {
          font-size: 1rem;
          font-weight: 500;
        }
      }
      .postTitle:link {
        color: black;
      }
    }
    .postBody {
      width: 70%;
      margin: 0 auto;
      height: fit-content;
      max-height: 30rem;
      overflow-y: hidden;
      margin-bottom: 2rem;
      word-wrap: break;
    }
    .date {
      width: 100%;
      text-align: right;
      padding-right: 3rem;
      margin-bottom: 1rem;
    }
  }
  @media screen and (max-width: 800px) {
    .post {
      width: 90%;
      height: 70%;
      .userInfo {
        .pfp {
          height: 6rem;
          width: 6rem;
        }
      }
      .postBody {
        margin-top: 1.9rem;
      }
    }
  }
  @media screen and (max-width: 500px) {
    .post {
      .userInfo {
        flex-direction: column;
        align-items: center;
        margin-left: 0rem;
        text-align: center;
        .pfp{
          margin-left: 0;
        }
        .postTitle{
          margin-left: 0%;
        }
    }
  }
}
`;

const Post = ({
  author,
  title,
  body,
  userId,
  timePosted,
  tags,
  isPostPage,
  id,
}) => {
  const navigate = useNavigate();
  const { user, stringAvatar, deletePost } = useAppContext();
  const [confirmDelete, setDelete] = useState(false);
  const userUrl = `/user/${author}`;
  const postUrl = `/post/${id}`;
  const getRidOfIt = async (id) => {
    await deletePost({ _id: id });
    await navigate("/home");
    window.location.reload();
  };
  return (
    <Wrapper>
      <div className="post">
        <div className="userInfo">
          <Link to={userUrl}>
            <Avatar className="pfp" {...stringAvatar(author)} />
          </Link>
          <Link className="postTitle" to={postUrl}>
            <h1>{title}</h1> <h3>{author}</h3>
          </Link>
          {user.user._id === userId &&
            (!confirmDelete ? (
              <FontAwesomeIcon
                onClick={() => setDelete(!confirmDelete)}
                className="delete"
                icon={faTrash}
                title="Delete Post"
              />
            ) : (
              <div className="confirmContainer">
                <FontAwesomeIcon
                  onClick={() => getRidOfIt(id)}
                  className="check"
                  icon={faCheck}
                  title="Delete"
                />
                <FontAwesomeIcon
                  onClick={() => setDelete(!confirmDelete)}
                  className="delete"
                  icon={faX}
                  title="Cancel"
                />
              </div>
            ))}
        </div>
        <div className="tags">
          {tags.map((tag) => {
            return <div className="tag">{tag.text}</div>;
          })}
        </div>
        <div className="postBody">
          {isPostPage ? (
            body
          ) : (
            <>
              {!isPostPage ? body.substring(0, 500) : body}
              {body.length > 500 && !isPostPage && (
                <Link to={postUrl} className="readMore">
                  ...Read More
                </Link>
              )}
            </>
          )}
        </div>{" "}
        <div className="date">{timePosted}</div>
      </div>
    </Wrapper>
  );
};

export default Post;
