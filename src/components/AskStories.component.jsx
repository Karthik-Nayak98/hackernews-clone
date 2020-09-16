import React, { useState, useEffect, memo } from 'react';
import { getStory } from '../services/hnApi';
import caret from '../caret.svg';
import { getTime } from '../helper/convertTime';
import { Link } from 'react-router-dom';

// import { shortenUrl } from "../helper/urlShortener";

export const AskStories = memo(function AskStories({ storyId }) {
  const [askStory, setAskStory] = useState({});

  useEffect(() => {
    let mounted = true;
    getStory(storyId).then(data => {
      if (mounted) setAskStory(data);
    });

    // unmounting the lifecycle component
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return askStory ? (
    <div className='pt-2' key={askStory.id}>
      <a href>
        <p className='text-sm'>
          <img className='w-3 inline-block' src={caret} alt='caret' /> {askStory.title}{' '}
          {/* <span className="text-secondary-200 text-xxs"> ({shortenUrl(askStory.url)}) */}
        </p>
      </a>
      <p className='text-secondary-200 px-5 text-xxs pb-2'>
        {askStory.score} points by{' '}
        <Link className='hover:underline' to={`/user/${askStory.by}`}>
          {askStory.by}
        </Link>{' '}
        | {getTime(askStory.time)} | {askStory.descendants} comments
      </p>
      <hr />
    </div>
  ) : null;
});
