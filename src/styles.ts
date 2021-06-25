import styled from "styled-components";

export const Main = styled.main`
  padding: 100px 450px;

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

    div {
      display: flex;
      flex: 1 1 600px;
    }

    #search-container {
      display: inline-flex;
      flex: 1 1 300px;
      position: relative;
      border: 1px solid #ebeaed;
      border-radius: 5px;
      overflow: hidden;
      background: #f5f4f6 0% 0% no-repeat padding-box;
      margin-right: 12px;

      svg {
        width: 20px;
        height: 23px;
        align-self: center;
        margin-left: 16px;
        margin-right: 12px;
      }

      input {
        border: 0;
        padding: 13px 0px 11px 0px;
        flex: 1;
        width: 100%;
        background: #f5f4f6 0% 0% no-repeat padding-box;

        text-align: left;
        font: normal normal normal 16px/20px "Source Sans Pro";
        letter-spacing: 0px;
        color: #170c3a;
      }
    }

    #checkbox-container {
      align-items: center;

      label {
        text-align: left;
        font: normal normal normal 16px/20px "Source Sans Pro";
        letter-spacing: 0.4px;
        color: #170c3a;
      }
    }

    #tag-only {
      margin-right: 8px;
    }

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

  @media screen and (max-width: 1600px) {
    padding: 100px 300px;
    nav {
      div {
        flex-direction: row;
        flex-basis: 400px;
      }
    }
  }

  @media screen and (max-width: 1100px) {
    padding: 100px 100px;
    nav {
      div {
        flex-direction: row;
        flex-basis: 300px;
      }
    }
  }

  @media screen and (max-width: 715px) {
    padding: 100px 50px;
    nav {
      div {
        flex-direction: row;
        flex-basis: 200px;
      }
    }
  }

  @media screen and (max-width: 610px) {
    nav {
      flex-direction: column;

      div {
        flex-direction: row;
        flex: 1 1 10px;
        margin-bottom: 16px;

        #tag-only {
          align-self: center;
        }

        #search-container {
          flex: 1 1 140px;

          input {
            flex-basis: 50px;
          }
        }
      }
    }
  }

  @media screen and (max-width: 400px) {
    nav {
      div {
        flex-direction: column;
        margin-bottom: 8px;
      }

      #checkbox-container {
        flex-direction: row;
        margin: 12px 0px;
      }

      #search-container {
        display: flex;
        flex-direction: row;
        flex-basis: 50px !important;
      }
    }
  }
`;
