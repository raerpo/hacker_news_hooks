import * as React from "react";
import styled from "styled-components";

import { useHNTopStories, useHNStoriesData } from "../api";
import Story from "../components/Story";

const StoryList = styled.ol`
  list-style: decimal;
`;

const MoreButton = styled.button`
  margin: .5rem 1rem;
`;

interface IHomePage {
  storiesPerPage: number;
}

const HomePage = ({ storiesPerPage }: IHomePage) => {
  const [offset, useOffset] = React.useState(0);
  const { loading, stories } = useHNTopStories();
  const storiesData = useHNStoriesData(stories, offset, storiesPerPage);
  const getMoreStories = () => {
    useOffset(offset + storiesPerPage)
  }
  return (
    <div>
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

export default HomePage;
