import React from "react";
import { Link } from "react-router-dom";
import { ISinglePhotoDTO } from "../../../../services/userService/dtos/userServiceDTO";
import PhotoComments from "../PhotoComments";
import "./PhotoContent.scss";

interface IPhotoContent {
  data: ISinglePhotoDTO;
}

const PhotoContent = ({ data }: IPhotoContent) => {
  const { photo, comments } = data;
  return (
    <div className="photo_content">
      <div className="photo_content-img">
        <img src={photo.src} alt={photo.title} />
      </div>
      <div className="photo_content-details">
        <div>
          <p className="photo_content-author">
            <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
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
