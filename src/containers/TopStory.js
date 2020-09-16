import React, { useEffect, useState } from 'react';
import { getStoryId, baseUrl } from '../services/hnApi';
import { TopStories } from '../components/TopStories.component';
import { InfiniteScroll } from '../hooks/infiniteScroll';

export const TopStory = () => {

  const topStoryUrl = `${baseUrl}topstories.json`;

  // const { loading, count } = InfiniteScroll();
  const [topStoryId, setTopStoryId] = useState([]);

  useEffect(() => {
    let mounted = true
    getStoryId(topStoryUrl).then(data => {
      if (mounted) {
        setTopStoryId(data)
      }
    });
    return () => {
      mounted = false
    }
  }, [])

  return <TopStories storyId={topStoryId} />
}