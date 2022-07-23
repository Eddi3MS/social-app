import React from "react";
import { Link } from "react-router-dom";
import { ISinglePhotoDTO } from "../../../../services/userService/dtos/userServiceDTO";
import { useAppSelector } from "../../../../store/hooks";
import ImageSkeleton from "../../../ImageSkeleton";
import PhotoComments from "../PhotoComments";
import PhotoDelete from "../PhotoDelete";
import "./PhotoContent.scss";

interface IPhotoContent {
  data: ISinglePhotoDTO;
}

const PhotoContent = ({ data }: IPhotoContent) => {
  const { photo, comments } = data;

  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="photo_content">
      <div className="photo_content-img">
        <ImageSkeleton src={photo.src} alt={photo.title} />
      </div>
      <div className="photo_content-details">
        <div>
          <p className="photo_content-author">
            {user && user.username === photo.author ? (
              <PhotoDelete id={photo.id} key={1} />
            ) : (
              <Link key={2} to={`/perfil/${photo.author}`}>
                @{photo.author}
              </Link>
            )}

            <span className="photo_content-visualization">{photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className="photo_content-atributes">
            <li>{photo.peso} kg</li>
            <li>{photo.idade} anos</li>
          </ul>
        </div>
      </div>
      <PhotoComments id={photo.id} comments={comments} />
    </div>
  );
};

export default PhotoContent;
