import React, { useState, useEffect } from 'react';
import { getUser } from '../services/hnApi';
import { getDays } from '../helper/convertTime';
import { Link } from 'react-router-dom';

export const UserDetail = ({ match }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUser(match.params.id).then((data) => {
      setUser(data);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !loading ? (
    <div className="text-secondary-200 m-4 flex h-32">
      <div>
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
          <div dangerouslySetInnerHtml={{ __html: user.about }} className="text-sm"></div>
        ) : null}
        <Link
          className="underline"
          to={{ pathname: `/submit/${user.id}`, state: user.submitted }}
        >
          submission
        </Link>{' '}
        |{' '}
        {user.submitted ? (
          <Link
            className="underline"
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
