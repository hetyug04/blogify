import React from "react";
import { useAppContext } from "../context/AppContext.js";
import styled from "styled-components";

const Wrapper = styled.div`
  align-self: center;
  .alertWrapper {
    height: 3rem;
    width: fit-content;
    border-radius: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .danger {
    color: rgba(255, 0, 0, 0.7);
    background-color: rgba(255, 0, 0, 0.37);
  }
  .success {
    color: rgba(0, 199, 0, 0.7);
    background-color: rgba(0, 255, 0, 0.37);
  }
  .alertText {
    margin: 0.5rem 1.5rem;
    font-size: 0.5rem;
    font-weight: 500;
  }
`;

const Alert = () => {
  const { alertText, alertType } = useAppContext();

  return (
    <Wrapper>
      <div className={`alertWrapper ${alertType}`}>
        <div>
          <h1
            className="alertText"
            style={{ fontSize: "1rem", fontWeight: "700" }}
          >
            {alertText}
          </h1>
        </div>
      </div>
    </Wrapper>
  );
};

export default Alert;
