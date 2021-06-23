import styled from "styled-components";

export const Main = styled.main`
  h1,
  h2 {
    color: #170c3a;
    font-style: normal;
    font-weight: 600;
    font-family: "Source Sans Pro", sans-serif;
  }

  h1 {
    font-size: 42px;
    line-height: 50px;
    letter-spacing: 0.84px;
  }

  h2 {
    font-size: 36px;
    line-height: 40px;
    letter-spacing: 0.72px;
  }

  nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    button {
      background: #365df0 0% 0% no-repeat padding-box;
      border-radius: 5px;
      border: none;

      text-align: center;
      font: normal normal 600 18px/24px Source Sans Pro;
      letter-spacing: 0.36px;
      color: #ffffff;
      padding: 14px 26px;

      cursor: pointer;

      &:hover {
        background-color: #2f55cc;
      }

      &:active {
        background-color: #244aa8;
      }
    }

    input {
      text-align: left;
      background: #fff 0% 0% no-repeat padding-box;
      border: 1px solid #ebeaed;
      border-radius: 5px;
      padding: 13px 25px;
    }
  }
`;
