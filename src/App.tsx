import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import screens
import HomePage from "./screens/HomePage";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #f6f6ef;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    margin: 0px;
  }
`;

const Titlebar = styled.div`
  background-color: #ff6600;
  padding: 0.3rem 0.5rem;
  h2 {
    font-size: 0.9rem;
    margin: 0px;
    padding: 0px;
  }
`;

const App = () => {
  return (
    <Router>
      <div>
        <GlobalStyles />
        <Titlebar>
          <h2>Hackernews hooks</h2>
        </Titlebar>
        <Route path="/" exact render={() => <HomePage storiesPerPage={20} />} />
      </div>
    </Router>
  );
};

export default App;
