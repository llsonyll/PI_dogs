import "./pagination.scss";
// Icons
import { MdArrowRight, MdArrowLeft } from "react-icons/md";

const Pagination = ({
  handlePreviousPage,
  handleNextPage,
  disablePrev = false,
  disableNext = false,
  page = 1,
}) => {
  return (
    <div className="pagination">
      <button onClick={handlePreviousPage} disabled={page <= 1 || disablePrev}>
        <MdArrowLeft />
      </button>
      {page}
      <button onClick={handleNextPage} disabled={disableNext}>
        <MdArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
