import React, { useEffect, useState } from 'react';
import { getStoryId, baseUrl } from '../services/hnApi';
import { Story } from '../components/Story.component';

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

  return <Story storyId={topStoryId} param='top' />
}