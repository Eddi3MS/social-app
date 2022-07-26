import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ISinglePhotoDTO } from "../../services/userService/dtos/userServiceDTO";
import { userService } from "../../services/userService/userService";
import Loading from "../Loading";
import PhotoContent from "../PhotoContent";
import "./Photo.scss";

const Photo = () => {
  const [data, setData] = useState<ISinglePhotoDTO | null>(null);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const getPhotoData = useCallback(async () => {
    if (!id) return;
    setLoading(true);

    try {
      const { data } = await userService.getSinglePhoto(+id);

      setData(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getPhotoData();
  }, [getPhotoData]);

  return (
    <>
      {loading && <Loading />}
      {!loading && data ? (
        <section className="app_container main_container">
          <PhotoContent single data={data} />
        </section>
      ) : (
        <p>No content.</p>
      )}
    </>
  );
};

export default Photo;
