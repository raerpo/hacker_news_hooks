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

function useHNStoriesData(storiesIds: number[], offset = 0, range = 20): StoryData[] {
  const [storiesData, setStoriesData] = useState([]);
  if (!storiesIds) {
    return []
  }
  useEffect(() => {
    for (let i = offset; i < range; i++) {
      fetch(`${API_URL}item/${storiesIds[i]}.json`)
      .then(res => res.json())
      .then(res => setStoriesData(stories => stories.concat(res)));
    }
  }, [])
  return storiesData;
}

export { useHNTopStories, useHNStoriesData };
