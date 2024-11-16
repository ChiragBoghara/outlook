import "./PaginationBar.scss";

const PaginationBar = ({
  selected,
  onPageChange,
  setCurrentPage,
  totalPages,
}) => {
  return (
    <section className="pagination-bar">
      <button
        className={`pagination-bar__prev ${selected === 1 ? "disabled" : ""}`}
        onClick={() => onPageChange(-1)}
        disabled={selected === 1}
      >
        ← Prev
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => setCurrentPage(pageNumber)}
            className={`pagination-bar__box ${
              selected === pageNumber ? "selected" : ""
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        className={`pagination-bar__next ${
          selected === totalPages ? "disabled" : ""
        }`}
        onClick={() => onPageChange(1)}
        disabled={selected === totalPages}
      >
        Next →
      </button>
    </section>
  );
};

export default PaginationBar;
