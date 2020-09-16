
import React, { useEffect, useState } from 'react';
import { getStoryId, baseUrl } from '../services/hnApi';
import { AskStories } from '../components/AskStories.component';

export const AskStory = () => {

  const AskStoryUrl = `${baseUrl}askstories.json`;

  const [askStoryId, setAskStoryId] = useState([]);

  useEffect(() => {
    let mounted = true;

    getStoryId(AskStoryUrl).then(data => {
      if (mounted)
        setAskStoryId(data)
    });

    return () => {
      mounted = false
    }
  }, [])

  return askStoryId.map(storyId => <AskStories key={storyId} storyId={storyId} />)
}