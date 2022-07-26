import React, { useState } from "react";
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

  const handleClick = async () => {
    setLoading(true);
    try {
      await userService.deletePhoto(id);

      dispatch(selectPhoto({ id: null }));
      dispatch(getPhotos({ page: 1, total: 6, user: 0 }));
    } catch (error) {
      console.log(error);
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
