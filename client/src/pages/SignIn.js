import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignature, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Alert } from "../components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  .title {
    width: 100%;
    color: white;
    margin-top: 1rem;
    padding-left: 3rem;
  }
  .registerBlock {
    margin: auto auto;
    height: 40rem;
    width: 35rem;
    border-radius: 35px;
    background-color: white;
    display: flex;
    justify-content: center;
    .sti {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 7rem;
      h1 {
        font-weight: 900;
        font-size: 3rem;
      }
      h3 {
        color: #9a9a9a;
        font-weight: 500;
        font-size: 0.9rem;
        margin-bottom: 3rem;
      }
      .textInput {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        margin-top: 0rem;
        margin-bottom: 1rem;
        border-radius: 35px;
        width: 25rem;
        height: 3rem;
        .icons {
          font-size: 1.5rem;
          margin-left: 1rem;
        }
        input {
          font-weight: 800;
          font-size: 1.3rem;
          padding-left: 1rem;
          margin-left: auto;
          height: 100%;
          width: 85%;
          border-radius: 35px;
          border: none;
          background-color: #f1f1f1;
        }
        input::placeholder {
          font-size: 1.5rem;
          color: #9a9a9a;
          font-weight: 400;
          font-size: 1rem;
        }
      }
      .submit {
        margin-top: 8rem;
        margin-bottom: 1rem;
        background-color: #6bde58;
        width: 10rem;
        height: 3rem;
        border: none;
        border-radius: 35px;
        font-size: 1.3rem;
        font-weight: 800;
        cursor: pointer;
      }
    }
  }

  @media screen and (max-width: 600px) {
    .title {
      padding-left: 0rem;
      margin: 1rem auto 0;
      width: fit-content;
      justify-self: center;
    }
    .registerBlock {
      
      width: 100%;
      height: 90%;
      .sti{
        .textInput{
          width: auto;
        }
      }
      div {
        h3 {
          margin-bottom: 5rem;
        }
        .textInput {
          height: 5rem;
        }
        .submit {
          margin-top: 5rem;
          width: 15rem;
          height: 4rem;
        }
      }
    }
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const initialState = {
    email: "",
    password: "",
  };
  const [values, setValues] = useState(initialState);
  const { showAlert, registerAlert, loginUser } = useAppContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;
    const currUser = { email, password };
    if (!email || !password) {
      registerAlert("Please Provide All Values");
    } else {
      loginUser(currUser);
    }
  };

  const handleKeyDown = (event) =>{
    if(event.key === 'Enter'){
      const { email, password } = values;
      const currUser = { email, password };
      if (!email || !password) {
        registerAlert("Please Provide All Values");
      } else {
        loginUser(currUser);
      }
    }
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper>
      <h1 className="title">Blogify</h1>
      <div className="registerBlock" onSubmit={handleSubmit}>
        <div className="sti">
          <h1>Login</h1>
          <h3>Welcome Back</h3>
          <div className="textInput">
            {" "}
            <FontAwesomeIcon className="icons" icon={faSignature} />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={values.userName}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="textInput">
            {" "}
            <FontAwesomeIcon className="icons" icon={faLock} />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          {showAlert && <Alert />}
          <button className="submit" onClick={handleSubmit} >
            Let's Go
          </button>
          <h3>
            Don't Have An Account? <Link to="/register">Register</Link>
          </h3>
        </div>
      </div>
    </Wrapper>
  );
};

export default Login;
