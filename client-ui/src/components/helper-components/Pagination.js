const Pagination = (props) => {
  const { page, pages, setPage } = props;

  let middlePaginationList;

  if (pages <= 5) {
    middlePaginationList = [...Array(pages)].map((_, index) => (
      <button
        key={index + 1}
        className={`${
          page === index + 1
            ? "text-blue-700 rounded-full bg-white p-1 font-bold cursor-pointer mx-2"
            : "text-white font-bold cursor-pointer p-1"
        }`}
        onClick={() => setPage(index + 1)}
        disabled={page === index + 1}
      >
        {index + 1}
      </button>
    ));
  }

  return (
    pages > 1 && (
      <div>
        <button
          className="text-red-700 cursor-pointer p-1 mr-1"
          onClick={() => setPage(Number(page) - 1)}
          disabled={page === 1 ? true : false}
        >
          Previous
        </button>
        {middlePaginationList}
        <button
          className="text-red-700 cursor-pointer p-1 mr-1"
          onClick={() => setPage(Number(page) + 1)}
          disabled={page === pages ? true : false}
        >
          Next
        </button>
      </div>
    )
  );
};

export default Pagination;
