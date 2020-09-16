
import React, { useEffect, useState } from 'react';
import { getStoryId, baseUrl } from '../services/hnApi';
import { JobStories } from '../components/JobStories.component';
import { InfiniteScroll } from '../hooks/infiniteScroll';

export const JobStory = () => {

  const JobStoryUrl = `${baseUrl}jobstories.json`;

  const { loading, count } = InfiniteScroll();
  const [jobStoryId, setJobStoryId] = useState([]);

  useEffect(() => {
    let mounted = true;

    getStoryId(JobStoryUrl).then(data => {
      if (mounted)
        setJobStoryId(data)
    });

    return () => {
      mounted = false
    }
  }, [])

  return jobStoryId.slice(0, count).map(storyId => <JobStories key={storyId} storyId={storyId} loading={loading} />)
}




