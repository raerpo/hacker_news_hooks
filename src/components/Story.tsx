import * as React from "react";
import styled from "styled-components";
import { formatRelative } from "date-fns";
import { StoryData } from "../api";

const LoadingStory = styled.div`
  width: 100%;
  min-height: 36px;
`;

const StoryWrapper = styled.li`
  line-height: 1rem;
  margin-bottom: 1rem;
`;

const StoryTitle = styled.p`
  margin: 0px;
`;

const StoryLink = styled.a`
  color: black;
  text-decoration: none;
`;

const StoryLinkLoading = styled(StoryLink)`
  background-color: #e4e4e4;
  color: #e4e4e4;
  display: block;
  width: 500px;
  height: 1rem;
`;

const StoryURL = styled.small`
  font-size: 0.8rem;
  color: #666;
  margin-left: .3rem;
  &:hover {
    text-decoration: underline;
  }
`;

const StorySubtitle = styled.small`
  font-size: 0.6rem;
  color: #666;
`;

const StorySubtitleLoading = styled(StorySubtitle)`
  background-color: #e4e4e4;
  display: block;
  width: 400px;
  height: 1rem;
`;

const Story = (props: StoryData) => {
  if (props.loading) {
    return (
      <StoryWrapper>
        <StoryTitle>
          <StoryLinkLoading href='#'>...</StoryLinkLoading>
        </StoryTitle>
        <StorySubtitleLoading></StorySubtitleLoading>
      </StoryWrapper>
    );
  }
  const storyURL = new URL(props.url);
  return (
    <StoryWrapper>
      <StoryTitle>
        <StoryLink href={props.url}>{props.title}</StoryLink>
        <StoryURL>
          ({`${storyURL.protocol}//${storyURL.hostname}`})
        </StoryURL>
      </StoryTitle>
      <StorySubtitle>
        {props.score} points by {props.by}{" "}
        {formatRelative(props.time * 1000, new Date())}
      </StorySubtitle>
    </StoryWrapper>
  );
};

export default Story;
