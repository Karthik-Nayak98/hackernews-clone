import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { BiChevronsLeft, BiChevronsRight } from 'react-icons/bi';
import { STORY_PER_PAGE } from '../constants/constant';

export const Pagination = ({ totalStory, paginate, page, prev, next, param }) => {
  const maxStory = Math.ceil(totalStory / STORY_PER_PAGE);

  return (
    <ul className="p-2 text-center hover:cursor-pointer bg-primary-400 pointer-events-auto">
      <Link
        className={
          'bg-primary-400 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l-full ' +
          (prev ? 'opacity-50 pointer-events-none' : 'opacity-100 pointer-events-auto')
        }
        onClick={() => paginate('prev', page - 1)}
        to={`/${param}/${page - 1}`}
      >
        <BiChevronsLeft className="inline-block pointer-events-auto" />
        prev
      </Link>
      <span className="bg-primary-400 text-gray-800 font-bold py-2 px-3">
        {page} / {maxStory}
      </span>
      <Link
        className={
          'bg-primary-400 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r-full ' +
          (next ? 'opacity-50 pointer-events-none' : 'opacity-100 pointer-events-auto')
        }
        onClick={() => paginate('next', page + 1)}
        to={`/${param}/${page + 1}`}
      >
        next
        <BiChevronsRight className="inline-block pointer-events-auto" />
      </Link>
    </ul>
  );
};

Pagination.propTypes = {
  totalStory: PropTypes.number.isRequired,
  paginate: PropTypes.func,
  page: PropTypes.number,
  prev: PropTypes.bool,
  next: PropTypes.bool,
  param: PropTypes.string,
};
