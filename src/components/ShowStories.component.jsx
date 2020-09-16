import React, { useState, useEffect, memo } from 'react';
import { getStory } from '../services/hnApi';
import caret from '../caret.svg';
import { shortenUrl } from '../helper/urlShortener';
import { getTime } from '../helper/convertTime';
import { Link } from 'react-router-dom';

export const ShowStories = memo(function ShowStories({ storyId }) {
  const [showStory, setShowStory] = useState({});

  useEffect(() => {
    let mounted = true;
    getStory(storyId).then((data) => {
      if (mounted) data.url && setShowStory(data);
    });
    return () => {
      mounted = false;
    };
  }, [storyId]);

  return showStory && showStory.url ? (
    <div className="pt-2" key={showStory.id}>
      <a href={showStory.url}>
        <p className="text-sm">
          <img className="w-3 inline-block" src={caret} alt="caret" /> {showStory.title}{' '}
          <span className="text-secondary-200 text-xxs">
            ({shortenUrl(showStory.url)})
          </span>
        </p>
      </a>
      <p className="text-secondary-200 px-5 text-xxs pb-2">
        {showStory.score} points by
        <Link className="hover:underline" to={`/user/${showStory.by}`}>
          {' '}
          {showStory.by}
        </Link>{' '}
        | {getTime(showStory.time)} | {showStory.descendants} comments
      </p>
      <hr />
    </div>
  ) : null;
});
