import * as React from "react";
import styled from 'styled-components';
import { StoryData } from '../api'

const LoadingStory = styled.div`
  background-color: red;
  width: 100%;
  height: 100px;
`;

const Story = (props: StoryData) => {
  if (props.loading) {
    return <LoadingStory>
      <h3>...</h3>
      <small>...</small>
    </LoadingStory>
  }
  return (
    <div>
      <h3>
        <a href={props.url}>{props.title}</a>
      </h3>
      <small>by: {props.by}</small>
    </div>
  );
};

export default Story;
