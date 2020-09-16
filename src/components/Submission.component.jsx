import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getStory } from '../services/hnApi';
import caret from '../caret.svg';
import { getTime } from '../helper/convertTime';
import { Link } from 'react-router-dom';

export const UserSubmission = ({ location }) => {
  const [loading, setLoading] = useState(false);
  const [userStory, setUserStory] = useState([]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    location.state.map((id) =>
      getStory(id).then((data) => {
        // console.log(data);
        if (mounted && data.url && data.type === 'story')
          setUserStory((userStory) => [...userStory, data]);
      })
    );
    setLoading(false);
    return () => {
      mounted = false;
    };
  }, []);

  return !loading ? (
    userStory.map((item) => (
      <div className="pt-2" key={item.id}>
        <a href={item.url}>
          <p className="text-sm">
            <img className="w-3 inline-block" src={caret} alt="caret" />
            {item.title}{' '}
            <span className="text-secondary-200 text-xxs">
              (
              {
                // Trimming the url
                item.url
                  .replace(
                    /^(?:https?:\/\/)?(?:www\.)?(?:forum\.)?(?:tech\.)?(?:en\.)?/i,
                    ''
                  )
                  .split('/')[0]
              }
              )
            </span>
          </p>
        </a>
        <p className="text-secondary-200 px-5 text-xxs">
          {item.score} points by{' '}
          <Link className="hover:underline" to={`/user/${item.by}`}>
            {item.by}
          </Link>{' '}
          | {getTime(item.time)} | {item.descendants} comments
        </p>
        <hr />
      </div>
    ))
  ) : (
    <p>Loading...</p>
  );

  //   <div className="pt-2 pb-3" key={userStory.id}>
  //     <a href={userStory.url}>
  //       <p className="text-sm">
  //         <img className="w-3 inline-block" src={caret} alt="caret" />
  //         {userStory.title}{" "}
  //         <span className="text-secondary-200 text-xxs">
  //           ({shortenUrl(userStory.url)})
  //         </span>
  //       </p>
  //     </a>
  //     <p className="text-secondary-200 px-5 text-xxs">
  //       {userStory.score} points by{" "}
  //       <Link className="hover:underline" to={`/user/${userStory.by}`}>
  //         {userStory.by}
  //       </Link>{" "}
  //       | {getTime(userStory.time)} | {userStory.descendants} comments
  //     </p>
  //     <hr />
  //   </div>
  // );
};

UserSubmission.propTypes = {
  location: PropTypes.object,
};
