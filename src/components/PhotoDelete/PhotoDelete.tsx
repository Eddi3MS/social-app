import React, { useContext, useState } from "react";
import { ErrorModalContext } from "../../context/ErrorFeedbackContext";
import { ErrorHandling } from "../../errors/errorHandling/ErrorHandling";
import { userService } from "../../services/userService/userService";
import { useAppDispatch } from "../../store/hooks";
import { selectPhoto } from "../../store/photo/photoSlice";
import { getPhotos } from "../../store/photo/thunks";
import "./PhotoDelete.scss";

interface IPhotoDelete {
  id: number;
}

const PhotoDelete = ({ id }: IPhotoDelete) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const { setErrorModal } = useContext(ErrorModalContext);

  const handleClick = async () => {
    setLoading(true);
    try {
      await userService.deletePhoto(id);

      dispatch(selectPhoto({ id: null }));
      dispatch(getPhotos({ page: 1, total: 6, user: 0 }));
    } catch (error) {
      const errorHandling = new ErrorHandling(error, "Erro ao deletar foto.");
      setErrorModal(errorHandling.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} className="delete_button" disabled={loading}>
      {loading ? "Deletando.." : "Deletar"}
    </button>
  );
};

export default PhotoDelete;
