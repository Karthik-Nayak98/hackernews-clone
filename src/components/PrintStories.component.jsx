import React from 'react';
import PropTypes from 'prop-types';
import caret from '../caret.svg';
import { getTime } from '../helper/convertTime';
import { shortenUrl } from '../helper/urlShortener';
import { Link } from 'react-router-dom';

export const PrintStories = ({ story, loading }) => {
  if (loading) {
    return <h2>Loading....</h2>;
  }

  return (
    <div className="m-40 mt-1">
      {story.map((item) => (
        <div
          className="transition duration-500 ease-in-out bg-primary-400 pt-2 mb-1 shadow rounded-l rounded-r hover:bg-primary-600 transform hover:scale-105"
          key={item.id}
        >
          <a href={item.url}>
            <p className="text-base">
              <img className="w-3 inline-block text-gray-800" src={caret} alt="caret" />
              {item.title}{' '}
              <span className="text-secondary-200 text-sm hover:text-primary-200">
                ({shortenUrl(item.url)})
              </span>
            </p>
          </a>
          <p className="text-secondary-200 px-5 text-xs pb-2">
            {item.score} points by{' '}
            <Link
              className="hover:underline hover:text-primary-200"
              to={`/user/${item.by}`}
            >
              {item.by}
            </Link>{' '}
            | {getTime(item.time)} |{' '}
            <Link
              className="hover:underline hover:text-primary-200"
              to={{ pathname: `/comment/${item.id}`, state: item.kids }}
            >
              {item.descendants} comments
            </Link>
          </p>
          {/* <p className="text-secondary-200 px-5 text-xxs">
            {item.score} points by {item.by} | {getTime(item.time)} | {item.descendants}{' '}
            comments
          </p> */}
        </div>
      ))}
    </div>
  );
};

PrintStories.propTypes = {
  story: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};
