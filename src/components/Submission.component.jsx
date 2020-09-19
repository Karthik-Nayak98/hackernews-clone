import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getStory } from '../services/hnApi';
import { STORY_PER_PAGE } from '../constants/constant';
import { Pagination } from '../components/Pagination.component';
import { PrintStory } from './PrintStory.component';
import { useHistory } from 'react-router-dom';

export const UserSubmission = ({ location }) => {
  let history = useHistory();
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

  // get next page
  const paginate = (pageValue, pageNumber) => {
    if (pageValue === 'next' || pageValue === 'prev') setCurrentPage(pageNumber);

    if (pageNumber > 1) setPrevPage(false);
    else setPrevPage(true);

    if (pageNumber >= maxStory) setNextPage(true);
    else setNextPage(false);
    history.push(`${location.pathname}/${currentPage}`);
  };

  console.log(location);

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

UserSubmission.propTypes = {
  location: PropTypes.object,
};
