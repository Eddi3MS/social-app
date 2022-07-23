import React from "react";
import { IPhotoDTO } from "../../../../services/userService/dtos/userServiceDTO";
import ImageSkeleton from "../../../ImageSkeleton";
import "./FeedPhotosItem.scss";

interface IPhotoItem {
  photo: IPhotoDTO;
  onClick: () => void;
}

const FeedPhotoItem = ({ photo, ...rest }: IPhotoItem) => {
  return (
    <li className="photo_item" {...rest}>
      <ImageSkeleton src={photo.src} alt={photo.title} />

      <span className="photo_item__visualizacao">{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotoItem;
