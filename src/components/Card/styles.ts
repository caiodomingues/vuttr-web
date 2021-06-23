import styled from "styled-components";

export const Container = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 5px 7px #0000000d;
  border: 1px solid #ebeaed;
  border-radius: 5px;

  margin: 16px 0;
  padding: 16px;

  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    a {
      text-align: left;
      font: normal normal 600 30px/36px "Source Sans Pro";
      letter-spacing: 0.6px;
    }

    button {
      text-align: center;
      font: normal normal 600 18px/24px "Source Sans Pro";
      letter-spacing: 0.36px;
      color: #f95e5a;
      background-color: inherit;
      border: none;

      cursor: pointer;
    }

    .remove {
      background: transparent 0% 0% no-repeat padding-box;
      width: 10px;
      height: 10px;
    }
  }
`;
