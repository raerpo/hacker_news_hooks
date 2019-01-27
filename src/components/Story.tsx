import * as React from "react";
import { StoryData } from '../api'

const Story = ({ title, url, by}: StoryData) => {
  return (
    <div>
      <h3>
        <a href={url}>{title}</a>
      </h3>
      <small>by: {by}</small>
    </div>
  );
};

export default Story;
