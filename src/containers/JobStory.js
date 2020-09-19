
import React, { useEffect, useState } from 'react';
import { getStoryId, baseUrl } from '../services/hnApi';
import { Story } from '../components/Story.component';

export const JobStory = () => {

  const JobStoryUrl = `${baseUrl}jobstories.json`;

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

  return <Story storyId={jobStoryId} param='jobs' />
}




