import React from "react";
import { IPhoto } from "../FeedPhotos/FeedPhotosProps";
import "./FeedPhotosItem.scss";

interface IPhotoItem {
  photo: IPhoto;
}

const FeedPhotoItem = ({ photo }: IPhotoItem) => {
  return (
    <li className="photo_item">
      <img src={photo.src} alt={photo.title} />
      <span className="photo_item__visualizacao">{photo.acessos}</span>
    </li>
  );
};

export default FeedPhotoItem;
