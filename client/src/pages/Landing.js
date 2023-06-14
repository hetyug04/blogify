import React from "react";
import "../style.css";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  background-color: black;
  div {
    margin-top: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .title {
    font-weight: 900;
    font-size: 10vh;
    color: white;
    margin-top: 15rem;
  }
  .buttonContainer {
    margin-top: 3rem;
  }
  .signIn {
      margin-top: 1.5rem;
      border-radius: 30px;
      height: 4rem;
      width: 16rem;
      background-color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }

  @media screen and (max-width: 600px) {
    .title{
      margin-top: 40%;
    }
    .buttonContainer {
      margin-top: 40%;
    }
    .title{

    }
    .signIn {
        width: 80vw;
    }
  }
`;

const Landing = () => {
  return (
    <Wrapper>
      <div>
        <h1 className="title">Blogify</h1>
        <div className="buttonContainer">
          <Link to="/login">
            <div className="signIn">
              <h3>Login</h3>
            </div>
          </Link>
          <Link to="/register">
            <div className="signIn">
              <h3>Register</h3>
            </div>
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default Landing;
