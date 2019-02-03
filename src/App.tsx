import * as React from "react";
import styled, { createGlobalStyle } from "styled-components";

import { useHNTopStories, useHNStoriesData } from "./api";
import Story from "./components/Story";

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

const StoryList = styled.ol`
  list-style: decimal;
`;

const MoreButton = styled.button`
  margin: .5rem 1rem;
`;

interface App {
  storiesPerPage: number;
}

const App = ({ storiesPerPage }: App) => {
  const [offset, useOffset] = React.useState(0);
  const { loading, stories } = useHNTopStories();
  const storiesData = useHNStoriesData(stories, offset, storiesPerPage);
  const getMoreStories = () => {
    useOffset(offset + storiesPerPage)
  }
  return (
    <div>
      <GlobalStyles />
      <Titlebar>
        <h2>Hackernews hooks</h2>
      </Titlebar>
      {loading && <p>Getting stories...</p>}
      {/* Show the stories or show a list of placeholders */}
      {storiesData && (
        <StoryList>
          {storiesData.map((story, index) => (
            <Story {...story} key={`story-${index}`} />
          ))}
        </StoryList>
      )}
      {!loading && <MoreButton onClick={getMoreStories}>Load more</MoreButton>}
    </div>
  );
};

export default App;
