import React, { useState, useEffect } from 'react';
import { getStory } from '../services/hnApi';
import caret from '../caret.svg';
// import { shortenUrl } from '../helper/urlShortener';
import { getTime } from '../helper/convertTime';
import { Link } from 'react-router-dom';

export const UserComments = ({ location }) => {
  const [loading, setLoading] = useState(false);
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    location.state.map((id) =>
      getStory(id).then((data) => {
        if (mounted && data.type === 'comment') {
          console.table(data);
          setUserComments((userComments) => [...userComments, data]);
        }
      })
    );
    setLoading(false);
    return () => {
      mounted = false;
    };
  }, []);

  console.log(userComments);
  return !loading ? (
    userComments.map((item) => (
      <div key={item.id}>
        <p className="text-secondary-200 px-2 pt-3 text-xxs">
          <img className="w-3 inline-block" src={caret} alt="caret" />
          <Link className="hover:underline px-1" to={`/user/${item.by}`}>
            {item.by}
          </Link>{' '}
          | {getTime(item.time)}
        </p>
        {/* Used to parse html to normal data */}
        <div
          dangerouslySetInnerHTML={{ __html: item.text }}
          className="px-8 text-sm"
        ></div>
      </div>
    ))
  ) : (
    <p>Loading...</p>
  );
};
