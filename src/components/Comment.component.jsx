import React, { useState, useEffect } from 'react';
import { getStory } from '../services/hnApi';
import { shortenUrl } from '../helper/urlShortener';
import caret from '../caret.svg';
import { getTime } from '../helper/convertTime';
import { Link } from 'react-router-dom';

export const Comment = ({ location, match }) => {
  const [loading, setLoading] = useState(false);
  const [userComment, setUserComment] = useState([]);
  const [story, setStory] = useState({});

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getStory(match.params.id).then((data) => setStory(data));

    location.state.map((id) =>
      getStory(id).then((data) => {
        if (mounted) setUserComment((userComment) => [...userComment, data]);
      })
    );
    setLoading(false);
    return () => {
      mounted = false;
    };
  }, []);

  console.log(story);
  return !loading ? (
    userComment.map((item) => (
      <div className="p-1" key={item.id}>
        <p className="text-secondary-200 px-1 text-xs">
          <Link className="hover:underline" to={`/user/${item.by}`}>
            {item.by}
          </Link>{' '}
          {getTime(item.time)}
        </p>
        {/* <img className="w-3 inline-block" src={caret} alt="caret" /> */}
        <div
          className="text-sm px-2"
          dangerouslySetInnerHTML={{ __html: item.text }}
        ></div>
        <hr />
      </div>
    ))
  ) : (
    <p>Loading...</p>
  );
};
