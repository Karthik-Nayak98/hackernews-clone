import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { getStory } from '../services/hnApi';
import caret from '../caret.svg';
import { getTime } from '../helper/convertTime';
import { shortenUrl } from '../helper/urlShortener';

export const JobStories = memo(function JobStories({ storyId }) {
  const [jobStory, setJobStory] = useState({});

  useEffect(() => {
    let mounted = true;
    getStory(storyId).then((data) => {
      if (mounted) data.url && setJobStory(data);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return jobStory && jobStory.url ? (
    <div className="pt-2" key={jobStory.id}>
      <a href={jobStory.url}>
        <p className="text-sm">
          <img className="w-3 inline-block" src={caret} alt="caret" /> {jobStory.title}{' '}
          <span className="text-secondary-200 text-xxs">
            ({shortenUrl(jobStory.url)})
          </span>
        </p>
      </a>
      <p className="text-secondary-200 px-5 text-xxs pb-2">{getTime(jobStory.time)}</p>
      <hr />
    </div>
  ) : null;
});

JobStories.propTypes = {
  storyId: PropTypes.number.isRequired,
};
