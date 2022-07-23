import React, { Fragment, useCallback, useEffect, useState } from "react";
import { IPhotoDTO } from "../../../../services/userService/dtos/userServiceDTO";
import { userService } from "../../../../services/userService/userService";
import FeedPhotosItem from "../FeedPhotosItem";
import "./FeedPhotos.scss";

interface IFeedPhotos {
  setPhotoId: React.Dispatch<React.SetStateAction<number | null>>;
}

const FeedPhotos = ({ setPhotoId }: IFeedPhotos) => {
  const [photos, setPhotos] = useState<IPhotoDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const getPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await userService.getPhotos({
        page: 1,
        total: 6,
        user: 0,
      });

      setPhotos(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPhotos();
  }, [getPhotos]);

  return (
    <section>
      {loading ? (
        <span key={1} className=" flex justify-center align-center">
          Loading...
        </span>
      ) : (
        <Fragment key={2}>
          {!photos && <span>No Content.</span>}
          {photos && (
            <ul className="photos_list animeLeft">
              {photos.map((photo) => (
                <FeedPhotosItem
                  photo={photo}
                  key={photo.id}
                  onClick={() => setPhotoId(photo.id)}
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
