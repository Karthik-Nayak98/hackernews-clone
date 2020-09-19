import React, { useEffect, useState } from 'react';
import { getStoryId, baseUrl } from '../services/hnApi';
import { Story } from '../components/Story.component';
import { PropTypes } from 'prop-types';

export const TopStory = (param) => {

  let Url;
  if (param === 'top')
    Url = `${baseUrl}topstories.json`;
  else if (param === 'new')
    Url = `${baseUrl}newstories.json`;

  const [topStoryId, setTopStoryId] = useState([]);

  useEffect(() => {
    let mounted = true
    getStoryId(Url).then(data => {
      if (mounted) {
        setTopStoryId(data)
      }
    });
    return () => {
      mounted = false
    }
  }, [])


  return (
  if (param === 'top')
    <Story storyId={topStoryId} param='top' />
  else if (param === 'new')
    <Story storyId={topStoryId} param='new' />
  )
}

TopStory.proptTypes = {
  param: PropTypes.string,
}