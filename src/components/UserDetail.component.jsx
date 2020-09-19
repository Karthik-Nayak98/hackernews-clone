import React, { useState, useEffect } from 'react';
import { getUser } from '../services/hnApi';
import { getDays } from '../helper/convertTime';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

export const UserDetail = ({ match }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUser(match.params.id).then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  return !loading ? (
    <div className="bg-primary-400 text-secondary-200 my-1 mx-40 p-4 flex">
      <div className="px-2">
        <p className="text-xl">User: </p>
        <p>Created: </p>
        <p>Karma: </p>
        {user.about ? <p>About: </p> : null}
      </div>
      <div className="text-secondary-300 pl-4">
        <p className="text-xl"> {user.id}</p>
        <p> {getDays(user.created)}</p>
        <p> {user.karma}</p>
        {user.about ? (
          <div dangerouslySetInnerHTML={{ __html: user.about }} className="text-sm"></div>
        ) : null}
        <Link
          className="underline hover:text-primary-200"
          to={{ pathname: `/submit/${user.id}`, state: user.submitted }}
        >
          submission
        </Link>{' '}
        |{' '}
        {user.submitted ? (
          <Link
            className="underline hover:text-primary-200"
            to={{ pathname: `/comments/${user.id}`, state: user.submitted }}
          >
            comments
          </Link>
        ) : null}
      </div>
    </div>
  ) : (
    <p>Loading....</p>
  );
};

UserDetail.propTypes = {
  match: PropTypes.object,
};
