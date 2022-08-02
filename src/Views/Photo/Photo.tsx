import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Head, Loading, NoContent, PhotoContent } from "../../components";
import { ErrorModalContext } from "../../context/ErrorFeedbackContext";
import { ErrorHandling } from "../../errors/errorHandling/ErrorHandling";
import { ISinglePhotoDTO } from "../../services/userService/dtos/userServiceDTO";
import { userService } from "../../services/userService/userService";
import "./Photo.scss";

const Photo = () => {
  const [data, setData] = useState<ISinglePhotoDTO | null>(null);
  const [loading, setLoading] = useState(false);

  const { setErrorModal } = useContext(ErrorModalContext);

  const { id } = useParams();

  const getPhotoData = useCallback(async () => {
    if (!id) return;
    setLoading(true);

    try {
      const { data } = await userService.getSinglePhoto(+id);

      setData(data);
    } catch (error) {
      const errorHandling = new ErrorHandling(
        error,
        "Erro ao recuperar dados da foto."
      );
      setErrorModal(errorHandling.error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getPhotoData();
  }, [getPhotoData]);

  return (
    <section className="app_container main_container single_photo_wrapper">
      <Head
        title={data?.photo.title ?? "Social"}
        description="Social App - Single Photo Page"
      />

      {loading && <Loading />}
      {data && <PhotoContent single data={data} />}
      {!loading && !data && <NoContent />}
    </section>
  );
};

export default Photo;
