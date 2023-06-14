import React from "react";
import { Navbar } from "../components/index.js";
import styled from "styled-components";

const Wrapper = styled.div`
  flex-direction: column;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Error = () => {
  return (
    <Wrapper>
      <Navbar />
      <h1>ERROR 404</h1>
    </Wrapper>
  );
};

export default Error;
