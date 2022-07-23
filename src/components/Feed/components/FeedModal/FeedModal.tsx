import React, { useCallback, useEffect, useState } from "react";
import { ISinglePhotoDTO } from "../../../../services/userService/dtos/userServiceDTO";
import { userService } from "../../../../services/userService/userService";
import Loading from "../../../Loading";
import PhotoContent from "../PhotoContent";
import "./FeedModal.scss";

interface IFeedModal {
  setPhotoId: React.Dispatch<React.SetStateAction<number | null>>;
  photoId: number | null;
}

const FeedModal = ({ photoId, setPhotoId }: IFeedModal) => {
  const [data, setData] = useState<ISinglePhotoDTO | null>(null);

  const getPhotoData = useCallback(async () => {
    if (!photoId) return;
    try {
      const { data } = await userService.getSinglePhoto(photoId);

      setData(data);
    } catch (error) {
      console.log(error);
    }
  }, [photoId]);

  useEffect(() => {
    getPhotoData();
  }, [getPhotoData]);

  function handleOutsideClick(event: React.MouseEvent<HTMLElement>) {
    if (event.target === event.currentTarget) setPhotoId(null);
  }

  return (
    <div className="feed_modal" onClick={handleOutsideClick}>
      {!data ? <Loading /> : <PhotoContent data={data} />}
    </div>
  );
};

export default FeedModal;
