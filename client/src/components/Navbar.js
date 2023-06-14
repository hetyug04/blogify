import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Avatar } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .menu {
    width: 80%;
    z-index: 10;
    margin-bottom: -4rem;
    height: 4rem;
    display: flex;
    justify-content: flex-end;
    .test {
      border: 1px solid black;
      font-weight: 700;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      font-size: 1.3rem;
      border-radius: 10px 00px 10px 10px;
      margin-top: 0.5rem;
      height: 12rem;
      width: 10rem;
      background-color: #d9d9d9;
      h3 {
        border-bottom: 1px solid black;
      }
    }
  }
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
      .menuWrapper {
        display: flex;
        align-items: center;
      }
      .pfImage {
        margin-left: 1rem;
        margin-right: 0.5rem;
        height: 4rem;
        width: 4rem;
        border-radius: 35px;
      }
    }
  }
  @media screen and (max-width: 600px) {
    .navBar {
      .user {
        .userName {
          display: none;
        }
      }
    }
  }
`;

const Navbar = () => {
  const { user, stringAvatar, clearLocalStorage } = useAppContext();
  const { userName } = user.user;
  const userUrl = `/user/${userName}`;
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const signOut = () => {
    clearLocalStorage();
    navigate("/");
  };

  return (
    <Wrapper>
      <div className="navBar">
        <Link to="/home">
          <h1 className="title">Blogify</h1>
        </Link>

        <div className="user">
          <Link
            style={{ display: "flex", alignItems: "center", color: "black" }}
          >
            <h1 className="userName">{userName}</h1>{" "}
            <div className="menuWrapper">
              <Avatar className="pfImage" {...stringAvatar(userName)} />
              <FontAwesomeIcon
                onClick={() => setShowMenu(!showMenu)}
                className="icons"
                icon={faCaretDown}
              />
            </div>
          </Link>
        </div>
      </div>
      {showMenu && (
        <div className="menu">
          <div className="test">
            <Link to="/home">
              <h3>Home</h3>
            </Link>
            <Link to="/new">
              <h3>New Post</h3>
            </Link>
            <Link to={userUrl}>
              <h3>Profile</h3>
            </Link>
            <h3 onClick={() => signOut()} style={{ cursor: "pointer" }}>
              Sign Out
            </h3>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Navbar;
