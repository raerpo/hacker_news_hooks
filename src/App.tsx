import * as React from "react";
import styled, { createGlobalStyle } from 'styled-components';

import { useHNTopStories, useHNStoriesData } from "./api";
import Story from './components/Story';

const GlobalStyles = createGlobalStyle`
  body {
    background-color: #f6f6ef;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
    margin: 0px;
  }
`

const Titlebar = styled.div`
  background-color: #ff6600;
  padding: .3rem .5rem;
  h2 {
    font-size: 0.9rem;
    margin: 0px;
    padding: 0px;
  }
`

const App = () => {
  const { loading, stories } = useHNTopStories();
  const storiesData = useHNStoriesData(stories, 0, 20);
  return (
    <div>
      <GlobalStyles />
      <Titlebar>
        <h2>Hackernews hooks</h2>
      </Titlebar>
      {loading && <p>Getting stories...</p>}
      {storiesData && (
        <ul>
          {storiesData.map(story => (
            <li key={story.time}>
              <Story {...story} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
