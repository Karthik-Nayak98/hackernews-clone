import React, { useState, useEffect, memo } from 'react';
import { getStory } from '../services/hnApi';
import caret from '../caret.svg';
import { getTime } from '../helper/convertTime';
import { shortenUrl } from '../helper/urlShortener';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

export const NewStories = memo(function NewStories({ storyId }) {
  const [newStory, setNewStory] = useState({});

  useEffect(() => {
    let mounted = true;
    getStory(storyId).then((data) => {
      if (mounted) data && data.url && setNewStory(data);
    });
    return () => {
      mounted = false;
    };
  }, [storyId]);

  return newStory && newStory.url ? (
    <div className="pt-2" key={newStory.id}>
      <a href={newStory.url}>
        <p className="text-sm">
          <img className="w-3 inline-block" src={caret} alt="caret" /> {newStory.title}{' '}
          <span className="text-secondary-200 text-xxs">
            ({shortenUrl(newStory.url)})
          </span>
        </p>
      </a>
      <p className="text-secondary-200 px-5 text-xxs pb-2">
        {newStory.score} points by{' '}
        <Link className="hover:underline" to={`/user/${newStory.by}`}>
          {newStory.by}
        </Link>{' '}
        | {getTime(newStory.time)} | {newStory.descendants} comments
      </p>
      <hr />
    </div>
  ) : null;
});

NewStories.propTypes = {
  storyId: PropTypes.array,
};
