import axios from 'axios';

export const baseUrl = `https://hacker-news.firebaseio.com/v0/`;

export const story = `${baseUrl}item/`;
export const user = `${baseUrl}user/`;

// To get the all storyId using the URL
export const getStoryId = async (storyUrl) => {
  const result = await axios.get(storyUrl).then(({ data }) => data);
  return result;
};

// To get the story for particular storyId
export const getStory = async (storyId) => {
  const result = await axios.get(`${story + storyId}.json`).then(({ data }) => data);
  return result;
};

// Getting the user information
export const getUser = async (name) => {
  const result = await axios.get(`${user + name}.json`).then(({ data }) => data);
  return result;
};
