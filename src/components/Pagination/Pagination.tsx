import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { changePage } from "../../store/photo/photoSlice";
import "./Pagination.scss";

import { ReactComponent as Back } from "../../assets/arrow_back.svg";
import { ReactComponent as Forward } from "../../assets/arrow_forward.svg";

const Pagination = () => {
  const photoReducer = useAppSelector((state) => state.photo);
  const dispatch = useAppDispatch();

  let nextDisabled = photoReducer.data.length < 6;
  let prevDisabled = photoReducer.current_page === 1;

  function handleChangePage(page: number) {
    dispatch(changePage({ page }));
  }

  return (
    <div className="feed_actions">
      <button
        onClick={() => handleChangePage(photoReducer.current_page - 1)}
        disabled={prevDisabled}
      >
        <Back />
      </button>
      <button>{photoReducer.current_page}</button>
      <button
        onClick={() => handleChangePage(photoReducer.current_page + 1)}
        disabled={nextDisabled}
      >
        <Forward />
      </button>
    </div>
  );
};

export default Pagination;
