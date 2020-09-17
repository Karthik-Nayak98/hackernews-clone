import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getStory } from '../services/hnApi';
import { PrintStory } from './PrintStory.component';
import { Pagination } from './Pagination.component';
import { STORY_PER_PAGE } from '../constants/constant';

export const Story = ({ storyId, param }) => {
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [prevPage, setPrevPage] = useState(true);
  const [nextPage, setNextPage] = useState(false);

  const maxStory = Math.ceil(storyId.length / STORY_PER_PAGE);

  // get current page
  const indexOfLastPost = currentPage * STORY_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - STORY_PER_PAGE;
  const currentPost = story.slice(indexOfFirstPost, indexOfLastPost);

  // console.log(currentPage);

  // get next page
  const paginate = (pageValue, pageNumber) => {
    // console.log(`top=${pageNumber}`);
    if (pageValue === 'next') setCurrentPage(pageNumber);
    if (pageValue === 'prev') setCurrentPage(pageNumber);

    // console.log(`below=${currentPage}`);

    if (pageNumber > 1) setPrevPage(false);
    else setPrevPage(true);

    if (pageNumber >= maxStory) setNextPage(true);
    else setNextPage(false);
  };

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    // if (mounted) data && data.url && setTopStory(data);
    storyId.map((id) => {
      getStory(id).then((data) => {
        if (mounted && data) setStory((story) => [...story, data]);
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
        totalStory={storyId.length}
        paginate={paginate}
        page={currentPage}
        prev={prevPage}
        next={nextPage}
        param={param}
      />
      <PrintStory story={currentPost} loading={loading} page={currentPage} />
    </>
  );
};

Story.propTypes = {
  param: PropTypes.string,
  storyId: PropTypes.array.isRequired,
};

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
