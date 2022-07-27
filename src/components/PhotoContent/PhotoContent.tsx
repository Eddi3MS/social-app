import React from "react";
import { Link } from "react-router-dom";

import { ISinglePhotoDTO } from "../../services/userService/dtos/userServiceDTO";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectPhoto } from "../../store/photo/photoSlice";
import ImageSkeleton from "../ImageSkeleton";
import PhotoComments from "../PhotoComments";
import PhotoDelete from "../PhotoDelete";
import "./PhotoContent.scss";

interface IPhotoContent {
  data: ISinglePhotoDTO;
  single?: boolean;
}

const PhotoContent = ({ data, single }: IPhotoContent) => {
  const { photo, comments } = data;

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  const handleCleanPhotoId = () => {
    dispatch(selectPhoto({ id: null }));
  };

  return (
    <div className={`photo_content ${single && "single_photo"}`}>
      <div className="photo_content-img">
        <ImageSkeleton src={photo.src} alt={photo.title} />
      </div>
      <div className="photo_content-details">
        <div>
          <p className="photo_content-author">
            {user && user.username === photo.author ? (
              <PhotoDelete id={photo.id} key={1} />
            ) : (
              <Link
                key={2}
                to={`/profile/${photo.author}`}
                onClick={handleCleanPhotoId}
              >
                @{photo.author}
              </Link>
            )}

            <span className="photo_content-visualization">{photo.acessos}</span>
          </p>

          <h1 className="title">
            {!single ? (
              <Link to={`/photo/${photo.id}`} onClick={handleCleanPhotoId}>
                {photo.title}
              </Link>
            ) : (
              <>{photo.title}</>
            )}
          </h1>

          <ul className="photo_content-atributes">
            <li>{photo.peso} kg</li>
            <li>{photo.idade} anos</li>
          </ul>
        </div>
      </div>
      <PhotoComments id={photo.id} single={single} comments={comments} />
    </div>
  );
};

export default PhotoContent;
