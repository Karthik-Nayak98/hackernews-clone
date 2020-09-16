/* eslint-disable react-hooks/exhaustive-deps*/

import { useEffect, useState } from 'react'
import { MAX_STORIES, STORY_PER_PAGE } from '../constants/constant';
import { debounce } from '../utils/debounce';

export const InfiniteScroll = () => {
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState(STORY_PER_PAGE)

  const handleScroll = debounce(() => {

    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return false;

    setLoading(true);
  }, 500);

  useEffect(() => {

    if (!loading) return;

    if (count + STORY_PER_PAGE >= MAX_STORIES)
      setCount(MAX_STORIES);
    else
      setCount(count + STORY_PER_PAGE);

    setLoading(false);
  }, [loading])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);

  }, [])
  return { loading, count };
}
