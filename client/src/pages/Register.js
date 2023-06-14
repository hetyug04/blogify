import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "../components";
import {
  faSignature,
  faEnvelope,
  faLock,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
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
    h3 {
      color: black;
    }
    .st {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 5rem;
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
        flex-direction: row;
        margin-top: 0rem;
        margin-bottom: 1rem;
        border-radius: 35px;
        width: 25rem;
        height: 3rem;
        .icons {
          font-size: 1.5rem;
          margin-left: 1rem;
          justify-self: center;
          align-self: center;
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
        margin-top: 1rem;
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
      .st{
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

const Register = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const initalState = {
    email: "",
    userName: "",
    password: "",
    confirm: "",
  };
  const [values, setValues] = useState(initalState);

  const {showAlert, displayAlert, registerUser, registerAlert } =
    useAppContext();
    
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, userName, password, confirm } = values;
    const currUser = { email, userName, password };
    if (!userName || !email || !password || !confirm) {
      registerAlert("Please Provide All Values");
    } else if (userName.length > 15) {
      registerAlert("Name Is Too Long");
    } else if (userName.length < 2) {
      registerAlert("Name Is Too Short");
    } else if (password.length < 6) {
      registerAlert("Password Is Too Short");
    } else if (password !== confirm) {
      registerAlert("Passwords Do Not Match");
    } else {
      if (!userName || !password) {
        displayAlert();
      } else {
        registerUser(currUser);
      }
    }
  };

  const handleKeyDown = (e) =>{
    if(e.key==='Enter'){
      const { email, userName, password, confirm } = values;
      const currUser = { email, userName, password };
      if (!userName || !email || !password || !confirm) {
        registerAlert("Please Provide All Values");
      } else if (userName.length > 20){
        registerAlert("Name Is Too Long");
      } else if (userName.length < 2) {
        registerAlert("Name Is Too Short");
      } else if (password.length < 6) {
        registerAlert("Password Is Too Short");
      } else if (password !== confirm) {
        registerAlert("Passwords Do Not Match");
      } else {
        if (!userName || !password) {
          displayAlert();
        } else {
          registerUser(currUser);
        }
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
        <div className="st">
          <h1>Register</h1>
          <h3>Let's Get You Started</h3>

          <div className="textInput">
            {" "}
            <FontAwesomeIcon className="icons" icon={faEnvelope} />{" "}
            <input
              type="email"
              placeholder="Email"
              value={values.email}
              name="email"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="textInput">
            {" "}
            <FontAwesomeIcon className="icons" icon={faSignature} />
            <input
              type="userName"
              placeholder="Username"
              value={values.userName}
              name="userName"
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
              value={values.password}
              name="password"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="textInput">
            {" "}
            <FontAwesomeIcon className="icons" icon={faCheck} />
            <input
              type="password"
              placeholder="Confirm Password"
              value={values.confirm}
              name="confirm"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          {showAlert && <Alert />}
          <button className="submit" onClick={handleSubmit}>
            Sign Up
          </button>
          <h3>
            Have an Account? <Link to="/login">Login</Link>
          </h3>
        </div>
      </div>
    </Wrapper>
  );
};

export default Register;
