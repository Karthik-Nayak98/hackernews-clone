import React, { useEffect, useState } from 'react';
import { getStoryId, baseUrl } from '../services/hnApi';
import { ShowStories } from '../components/ShowStories.component';
import { InfiniteScroll } from '../hooks/infiniteScroll';

export const ShowStory = () => {

  const ShowStoryUrl = `${baseUrl}showstories.json`;

  const { loading, count } = InfiniteScroll
  const [showStoryId, setShowStoryId] = useState([]);

  useEffect(() => {
    let mounted = true;

    getStoryId(ShowStoryUrl).then(data => {
      if (mounted)
        setShowStoryId(data)
    });

    return () => {
      mounted = false
    }
  }, [])

  return showStoryId.slice(0, count).map(storyId => <ShowStories key={storyId} storyId={storyId} loading={loading} />)
}




