import * as React from "react";

import { useHNTopStories, useHNStoriesData } from "./api";
import Story from './components/Story';

const App = () => {
  const { loading, stories } = useHNTopStories();
  const storiesData = useHNStoriesData(stories, 0, 10);
  return (
    <div>
      <h2>Hackernew hooks</h2>
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
