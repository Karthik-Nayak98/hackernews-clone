import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getStory } from '../services/hnApi';
import { STORY_PER_PAGE } from '../constants/constant';
import { Pagination } from '../components/Pagination.component';
import { PrintStory } from './PrintStory.component';

export const UserSubmission = ({ location }) => {
  const [loading, setLoading] = useState(false);
  const [userStory, setUserStory] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(true);
  const [nextPage, setNextPage] = useState(false);

  const maxStory = Math.ceil(userStory.length / STORY_PER_PAGE);

  // get current page
  const indexOfLastPost = currentPage * STORY_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - STORY_PER_PAGE;
  const currentPost = userStory.slice(indexOfFirstPost, indexOfLastPost);

  // console.log(currentPage);

  // get next page
  const paginate = (pageValue, pageNumber) => {
    if (pageValue === 'next') setCurrentPage(pageNumber);
    if (pageValue === 'prev') setCurrentPage(pageNumber);

    if (pageNumber > 1) setPrevPage(false);
    else setPrevPage(true);

    if (pageNumber >= maxStory) setNextPage(true);
    else setNextPage(false);
  };

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    location.state.map((id) =>
      getStory(id).then((data) => {
        if (mounted && !data.deleted && data && data.type === 'story') {
          console.log(data);
          setUserStory((userStory) => [...userStory, data]);
        }
      })
    );
    setLoading(false);
    return () => {
      mounted = false;
    };
  }, [location.state]);

  return (
    <>
      <Pagination
        totalStory={userStory.length}
        paginate={paginate}
        page={currentPage}
        prev={prevPage}
        next={nextPage}
        param={location.pathname}
      />
      <PrintStory story={currentPost} loading={loading} page={currentPage} />
    </>
  );
};

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

UserSubmission.propTypes = {
  location: PropTypes.object,
};
