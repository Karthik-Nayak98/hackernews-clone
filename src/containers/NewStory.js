import React, { useEffect, useState } from 'react';
import { getStoryId, baseUrl } from '../services/hnApi';
import { NewStories } from '../components/NewStories.component';
import { InfiniteScroll } from '../hooks/infiniteScroll';

export const NewStory = () => {

  const NewStoryUrl = `${baseUrl}newstories.json`;

  const { loading, count } = InfiniteScroll();
  const [newStoryId, setNewStoryId] = useState([]);

  useEffect(() => {
    let mounted = true;

    getStoryId(NewStoryUrl).then(data => {
      if (mounted)
        setNewStoryId(data)
    });

    return () => {
      mounted = false
    }
  }, [])

  return newStoryId.slice(0, count).map(storyId => <NewStories key={storyId} storyId={storyId} loading={loading} />)
}