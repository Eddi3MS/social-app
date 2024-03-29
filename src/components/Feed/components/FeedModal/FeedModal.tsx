import React, { useCallback, useContext, useEffect, useState } from "react";
import { ErrorModalContext } from "../../../../context/ErrorFeedbackContext";
import { ErrorHandling } from "../../../../errors/errorHandling/ErrorHandling";
import { ISinglePhotoDTO } from "../../../../services/userService/dtos/userServiceDTO";
import { userService } from "../../../../services/userService/userService";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { selectPhoto } from "../../../../store/photo/photoSlice";
import Loading from "../../../Loading";
import PhotoContent from "../../../PhotoContent";
import "./FeedModal.scss";

const FeedModal = () => {
  const [data, setData] = useState<ISinglePhotoDTO | null>(null);

  const { setErrorModal } = useContext(ErrorModalContext);

  const dispatch = useAppDispatch();
  const photoReducer = useAppSelector((state) => state.photo);

  const getPhotoData = useCallback(async () => {
    if (!photoReducer.id_modal_photo) return;
    try {
      const { data } = await userService.getSinglePhoto(
        photoReducer.id_modal_photo
      );

      setData(data);
    } catch (error) {
      const errorHandling = new ErrorHandling(error, "Erro ao buscar dados.");
      setErrorModal(errorHandling.error);
    }
  }, [photoReducer.id_modal_photo]);

  useEffect(() => {
    getPhotoData();
  }, [getPhotoData]);

  function handleOutsideClick(event: React.MouseEvent<HTMLElement>) {
    if (event.target === event.currentTarget)
      dispatch(selectPhoto({ id: null }));
  }

  return (
    <div className="feed_modal" onClick={handleOutsideClick}>
      {!data ? <Loading /> : <PhotoContent data={data} />}
    </div>
  );
};

export default FeedModal;
