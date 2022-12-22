import { useState } from "react";

const Pagination = (props) => {
  const {page, pages, setPage} = props

  let middlePaginationList

  if (pages <= 5) {
    middlePaginationList = [...Array(pages)].map((_, index) => (
      <button key={index + 1} className={`${page === index + 1 ? 'text-blue-700 rounded-full bg-white p-1 font-bold cursor-pointer mx-2' : 'text-white font-bold cursor-pointer p-1'}`} onClick={() => setPage(index + 1)} disabled={page === index + 1}>
        {index + 1}
      </button>
    ))
  }

  // const middlePaginationList = () => {

  // }

  return pages > 1 && (
    <div>
      <button className="text-red-700 cursor-pointer p-1 mr-1" onClick={() => setPage(Number(page) - 1)} disabled={page === 1 ? true : false}>Previous</button>
      {middlePaginationList}
      <button className="text-red-700 cursor-pointer p-1 mr-1" onClick={() => setPage(Number(page) + 1)} disabled={page === pages ? true : false}>Next</button>
    </div>
  )

  return (
    <>
    <ul className="flex">
        <li className="text-red-700 cursor-pointer p-1 mr-1" onClick={() => setPage(page - 1)}>Previous</li>
        {/* {pages.map(pgNum => (
          <li key={pgNum} onClick={() => setPage(pgNum)} className={`${page === pgNum ? 'text-blue-700 rounded-full bg-white p-1 font-bold cursor-pointer mx-2' : 'text-white font-bold cursor-pointer p-1'}`}>{pgNum}</li>
        ))} */}
        <li className="text-red-700 cursor-pointer p-1 ml-1" onClick={() => setPage(page + 1)}>Next</li>
      </ul>
    </>
  )
//   const { nPages, currentPage, setCurrentPage } = props;

//   const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

//   const nextPage = () => {
//     if(currentPage !== nPages) 
//         setCurrentPage(currentPage + 1)
// }
// const prevPage = () => {
//     if(currentPage !== 1) 
//         setCurrentPage(currentPage - 1)
// }

//   return (
//     <>
      // <ul className="flex">
      //   <li className="text-red-700 cursor-pointer p-1 mr-1" onClick={prevPage}>Previous</li>
      //   {pageNumbers.map(pgNum => (
      //     <li key={pgNum} onClick={() => setCurrentPage(pgNum)} className={`${currentPage === pgNum ? 'text-blue-700 rounded-full bg-white p-1 font-bold cursor-pointer mx-2' : 'text-white font-bold cursor-pointer p-1'}`}>{pgNum}</li>
      //   ))}
      //   <li className="text-red-700 cursor-pointer p-1 ml-1" onClick={nextPage}>Next</li>
      // </ul>
//     </>
//   );
};

export default Pagination;
