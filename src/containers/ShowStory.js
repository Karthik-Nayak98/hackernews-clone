import React, { useEffect, useState } from 'react';
import { getStoryId, baseUrl } from '../services/hnApi';
import { Story } from '../components/Story.component';

export const ShowStory = () => {

  const ShowStoryUrl = `${baseUrl}showstories.json`;

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

  return <Story storyId={showStoryId} param='show' />
}




