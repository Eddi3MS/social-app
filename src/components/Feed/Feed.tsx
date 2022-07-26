import { useLocation } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import Pagination from "../Pagination";

import FeedModal from "./components/FeedModal";
import FeedPhotos from "./components/FeedPhotos";
import "./Feed.scss";

const Feed = () => {
  const photoReducer = useAppSelector((state) => state.photo);

  const location = useLocation();

  return (
    <div
      className={`feed_wrapper ${
        location.pathname.includes("account") && "feed_wrapper--account"
      }`}
    >
      {photoReducer.id_modal_photo && <FeedModal />}
      <div className="feed_photos_wrapper">
        <FeedPhotos />
      </div>

      {!photoReducer.loading && <Pagination />}
    </div>
  );
};

export default Feed;
