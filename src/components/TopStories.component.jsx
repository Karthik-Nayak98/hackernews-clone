import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { getStory } from '../services/hnApi';
import { PrintStories } from './PrintStories.component';
// import caret from '../caret.svg';
// import { getTime } from '../helper/convertTime';
// import { shortenUrl } from '../helper/urlShortener';
// import { Link } from 'react-router-dom';
import { Pagination } from './Pagination.component';

export const TopStories = memo(function TopStories({ storyId }) {
  const [loading, setLoading] = useState(true);
  const [topStory, setTopStory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [prevPage, setPrevPage] = useState(true);
  const [nextPage, setNextPage] = useState(false);

  const maxStory = Math.ceil(storyId.length / postsPerPage);

  // get current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = topStory.slice(indexOfFirstPost, indexOfLastPost);

  // console.log(currentPage);

  // get next page
  const paginate = (pageValue) => {
    if (pageValue === 'next') {
      if (currentPage > 1) setPrevPage(false);
      if (currentPage === maxStory) setNextPage(true);
      else setCurrentPage((currentPage) => currentPage + 1);
    } else if (pageValue === 'prev') {
      if (currentPage < maxStory) setNextPage(false);
      if (currentPage === 1) setPrevPage(true);
      else setCurrentPage((currentPage) => currentPage - 1);
    }
  };

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    // if (mounted) data && data.url && setTopStory(data);
    storyId.map((id) => {
      getStory(id).then((data) => {
        if (mounted && data && data.url) setTopStory((topStory) => [...topStory, data]);
      });
    });
    setLoading(false);
    return () => {
      mounted = false;
    };
  }, [storyId]);

  return (
    <>
      <Pagination
        storyPerPage={postsPerPage}
        totalStory={storyId.length}
        paginate={paginate}
        page={currentPage}
        prev={prevPage}
        next={nextPage}
      />
      <PrintStories story={currentPost} loading={loading} />
    </>
  );

  // topStory.map((item) => console.log(item.by));
  //   return topStory && topStory.url ? (
  //     <div className="pt-2" key={topStory.id}>
  //       <a href={topStory.url}>
  //         <p className="text-sm">
  //           <img className="w-3 inline-block" src={caret} alt="caret" /> {topStory.title}{' '}
  //           <span className="text-secondary-200 text-xxs">
  //             ({shortenUrl(topStory.url)})
  //           </span>
  //         </p>
  //       </a>
  //       <p className="text-secondary-200 px-5 text-xxs pb-2">
  //         {topStory.score} points by{' '}
  //         <Link className="hover:underline" to={`/user/${topStory.by}`}>
  //           {topStory.by}
  //         </Link>{' '}
  //         | {getTime(topStory.time)} |{' '}
  //         <Link
  //           className="hover:underline"
  //           to={{ pathname: `/comment/${topStory.id}`, state: topStory.kids }}
  //         >
  //           {topStory.descendants} comments
  //         </Link>
  //       </p>
  //       <hr />
  //     </div>
  //   ) : null;
  // });

  // return !loading ? (
  //   topStory.map((item) => (
  //     <div className="pt-2" key={item.id}>
  //       <a href={item.url}>
  //         <p className="text-sm">
  //           <img className="w-3 inline-block" src={caret} alt="caret" />
  //           {item.title}{' '}
  //           <span className="text-secondary-200 text-xxs">
  //             (
  //             {
  //               // Trimming the url
  //               item.url
  //                 .replace(
  //                   /^(?:https?:\/\/)?(?:www\.)?(?:forum\.)?(?:tech\.)?(?:en\.)?/i,
  //                   ''
  //                 )
  //                 .split('/')[0]
  //             }
  //             )
  //           </span>
  //         </p>
  //       </a>
  //       <p className="text-secondary-200 px-5 text-xxs">
  //         {item.score} points by {item.by} | {getTime(item.time)} | {item.descendants}{' '}
  //         comments
  //       </p>
  //       <hr />
  //     </div>
  //   ))
  // ) : (
  //   <p>Loading....</p>
  // );
});

TopStories.propTypes = {
  storyId: PropTypes.array.isRequired,
};
