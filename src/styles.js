// @flow

import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100vh;
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
    background-color: #000;
    color: #fff;
  }

`;

export const App = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url("${props => `/images/${props.timing}.webp`}");
`;

export const Progress = styled.div`
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  letter-spacing: 0.5rem;
  margin-right: 8px;
`;

export const Select = styled.select`
  margin-left: 0.5rem;
  padding: 4px 8px;
  width: 5em;
  border: none;
  box-shadow: none;
  background: transparent;
  background-image: none;
  color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  -webkit-appearance: none;
  :focus {
    outline: none;
  }
`;

export const Option = styled.option`
  color: #282828;
  cursor: pointer;
  font-weight: normal;
  display: block;
  white-space: pre;
  min-height: 1.2em;
  padding: 0px 2px 1px;
`;

export const ProgressBar = styled.div`
  margin-top: 2rem;
  > div {
    width: 300px;
    height: 20px;
    border: 1px solid #fff;
    display: inline-block;
    margin-right: 12px;
    border-radius: 4px;
  }
  > span {
    font-weight: bold;
  }
`;

export const Completion = styled.div`
  width: calc(${props => `${props.progress}%`} - 7px);
  background-color: #fff;
  border: 1px solid #fff;
  height: 100%;
`;
