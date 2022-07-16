import React, { Fragment, useCallback, useEffect, useState } from "react";
import { userService } from "../../../../services/userService/userService";
import FeedPhotosItem from "../FeedPhotosItem";
import { IPhoto } from "./FeedPhotosProps";
import "./FeedPhotos.scss";

const FeedPhotos = () => {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const getPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await userService.getPhotos({ page: 1, total: 6, user: 0 });

      setPhotos(resp.data);
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
                <FeedPhotosItem photo={photo} key={photo.id} />
              ))}
            </ul>
          )}
        </Fragment>
      )}
    </section>
  );
};

export default FeedPhotos;
