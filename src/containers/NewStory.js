import React, { useEffect, useState } from 'react';
import { getStoryId, baseUrl } from '../services/hnApi';
import { Story } from '../components/Story.component';

export const NewStory = () => {

  const NewStoryUrl = `${baseUrl}newstories.json`;
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

  return <Story storyId={newStoryId} param='new' />
}