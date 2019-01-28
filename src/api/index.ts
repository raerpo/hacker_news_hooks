import React, { useState, useEffect } from "react";

const API_URL = "https://hacker-news.firebaseio.com/v0/";

interface TopStoriesAPIResponse {
  stories: number[],
  loading: boolean
}

function useHNTopStories(): TopStoriesAPIResponse {
  const [stories, useStories] = useState(null);
  const [loading, useLoading] = useState(true);
  useEffect(() => {
    fetch(API_URL + "topstories.json")
      .then(res => res.json())
      .then(res => {
        useLoading(false);
        useStories(res);
      });
  }, []);
  return { stories, loading };
}

export interface StoryData {
  loading: boolean,
  by: string
  descendants: number
  id: number
  kids: number[]
  score: number
  time: number
  title: string
  type: string
  url: string
}

const defaultStoryData: StoryData = {
  loading: true,
  by: '',
  descendants: 0,
  id: 0,
  kids: [0],
  score: 0,
  time: 0,
  title: '',
  type: '',
  url: ''
}

function useHNStoriesData(storiesIds: number[], offset = 0, range = 20): StoryData[] {
  // Little hack to create an empty array
  const initialStoriesData: StoryData[] = '_'.repeat(range - 1).split('_').map(x => ({...defaultStoryData}));
  const [storiesData, setStoriesData] = useState(initialStoriesData);
  if (!storiesIds) {
    return []
  }
  useEffect(() => {
    for (let i = offset; i < range; i++) {
      fetch(`${API_URL}item/${storiesIds[i]}.json`)
      .then(res => res.json())
      .then(res => setStoriesData(stories => {
        let storiesCopy = [...stories];
        storiesCopy[i] = {...res, loading: false};
        return storiesCopy
      }));
    }
  }, [])
  return storiesData;
}

export { useHNTopStories, useHNStoriesData };
