import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ErrorModalContext } from "../../../../context/ErrorFeedbackContext";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectPhoto } from "../../../../store/photo/photoSlice";
import { getPhotos } from "../../../../store/photo/thunks";
import Loading from "../../../Loading";
import NoContent from "../../../NoContent";
import FeedPhotosItem from "../FeedPhotosItem";
import "./FeedPhotos.scss";

const FeedPhotos = () => {
  const dispatch = useAppDispatch();
  const photoReducer = useAppSelector((state) => state.photo);
  const userReducer = useAppSelector((state) => state.user);

  const location = useLocation();
  const { setErrorModal } = useContext(ErrorModalContext);

  const { user } = useParams();

  const getPhotosList = useCallback(() => {
    let id: number | string = 0;
    if (userReducer.user && location.pathname === "/account")
      id = userReducer.user.id;

    if (user) {
      id = user;
    }

    dispatch(
      getPhotos({ page: photoReducer.current_page, total: 6, user: id })
    );
  }, [photoReducer.current_page]);

  useEffect(() => {
    getPhotosList();
  }, [getPhotosList]);

  useEffect(() => {
    if (photoReducer.error) {
      setErrorModal(photoReducer.error);
    }
  });

  const selectPhotoToModal = (id: number) => {
    dispatch(selectPhoto({ id }));
  };

  return (
    <section>
      {photoReducer.loading ? (
        <Loading />
      ) : (
        <Fragment key={2}>
          {!photoReducer.data ||
            (photoReducer.data.length === 0 && (
              <NoContent message="Ainda não há nenhuma foto na galeria." />
            ))}
          {photoReducer.data && (
            <ul className="photos_list animeLeft">
              {photoReducer.data.map((photo) => (
                <FeedPhotosItem
                  photo={photo}
                  key={photo.id}
                  onClick={() => selectPhotoToModal(photo.id)}
                />
              ))}
            </ul>
          )}
        </Fragment>
      )}
    </section>
  );
};

export default FeedPhotos;
