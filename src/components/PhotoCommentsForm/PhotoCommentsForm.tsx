import React, { FormEvent, useContext, useState } from "react";
import { ReactComponent as Enviar } from "../../assets/enviar.svg";
import "./PhotoCommentsForm.scss";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ICommentDTO } from "../../services/userService/dtos/userServiceDTO";
import { userService } from "../../services/userService/userService";
import Textarea from "../Textarea";
import { ErrorModalContext } from "../../context/ErrorFeedbackContext";
import { ErrorHandling } from "../../errors/errorHandling/ErrorHandling";

const formSchema = yup.object().shape({
  comment: yup.string().required("Campo obrigatório."),
});

interface IPhotoCommentsForm {
  id: number;
  setComments: React.Dispatch<React.SetStateAction<ICommentDTO[]>>;
  single?: boolean;
}

const PhotoCommentsForm = ({ id, setComments, single }: IPhotoCommentsForm) => {
  const [comment, setComment] = useState("");

  const { setErrorModal } = useContext(ErrorModalContext);

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(formSchema),
  });

  const handleSubmitComment = async () => {
    try {
      const { data } = await userService.postComment(id, { comment });

      setComments((current) => [...current, data]);
      setComment("");
      setValue("comment", "");
    } catch (error) {
      const errorHandling = new ErrorHandling(
        error,
        "Erro ao salvar seu comentario."
      );
      setErrorModal(errorHandling.error);
    }
  };

  return (
    <form className={`comment_form ${single && "single_form"}`}>
      <Controller
        control={control}
        name="comment"
        render={({ field: { onChange } }) => (
          <Textarea
            id="comment"
            name="comment"
            placeholder="Comente..."
            aria-label="Comente.."
            value={comment}
            onChange={({ target }) => {
              let value = target.value;
              setComment(value);
              onChange(value);
            }}
            error={errors.comment?.message}
          />
        )}
      />

      <button
        className="comment_form-button"
        onClick={handleSubmit(handleSubmitComment)}
      >
        <Enviar />
      </button>
    </form>
  );
};

export default PhotoCommentsForm;
