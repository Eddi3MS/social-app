import React, { ChangeEvent, useContext, useState } from "react";
import { Button, Input, InputFile } from "../../../../components";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userService } from "../../../../services/userService/userService";
import "./PhotoPost.scss";
import { useNavigate } from "react-router-dom";
import { ErrorModalContext } from "../../../../context/ErrorFeedbackContext";
import { ErrorHandling } from "../../../../errors/errorHandling/ErrorHandling";

const formSchema = yup.object().shape({
  name: yup.string().required("Campo obrigatório."),
  age: yup
    .string()
    .required("Campo obrigatório.")
    .max(2, "Máximo 2 dígitos.")
    .matches(/^\d+$/, "Apenas números."),
  weight: yup
    .string()
    .required("Campo obrigatório.")
    .max(3, "Máximo 3 dígitos.")
    .matches(/^\d+$/, "Apenas números."),
  file: yup.mixed().required("Adicione uma imagem."),
});

interface IData {
  name: string;
  age: string;
  weight: string;
}

interface IImage {
  image: File | null;
  preview: string;
}

const initial = {
  name: "",
  age: "",
  weight: "",
};

const initialImage = {
  image: null,
  preview: "",
};

const PhotoPost = () => {
  const [data, setData] = useState<IData>(initial);
  const [image, setImage] = useState<IImage>(initialImage);

  const [loading, setLoading] = useState(false);
  const { setErrorModal } = useContext(ErrorModalContext);

  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(formSchema),
  });

  const handlePost = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("img", image.image!);
    formData.append("nome", data.name);
    formData.append("peso", data.weight);
    formData.append("idade", data.age);

    try {
      await userService.postPhoto(formData);

      navigate("/account");
    } catch (error) {
      const errorHandling = new ErrorHandling(error, "Erro ao postar a foto.");
      setErrorModal(errorHandling.error);
    } finally {
      setLoading(false);
      setData(initial);
      setImage(initialImage);
      reset({ name: "", age: "", weight: "", file: null });
    }
  };

  const handleImageChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target && target.files && target.files[0]) {
      setImage({
        image: target.files[0],
        preview: URL.createObjectURL(target.files[0]),
      });
    } else {
      setImage({ image: null, preview: "" });
    }
  };

  return (
    <section className="animeLeft photo_post">
      <form>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur } }) => (
            <Input
              label="Nome"
              name="name"
              value={data.name}
              onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                setData((current) => ({
                  ...current,
                  name: target.value,
                }));
                onChange(target.value);
              }}
              onBlur={onBlur}
              type="text"
              error={errors.name?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="age"
          render={({ field: { onChange, onBlur } }) => (
            <Input
              label="Idade"
              name="age"
              value={data.age}
              onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                setData((current) => ({
                  ...current,
                  age: target.value,
                }));
                onChange(target.value);
              }}
              onBlur={onBlur}
              type="text"
              error={errors.age?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="weight"
          render={({ field: { onChange, onBlur } }) => (
            <Input
              label="Peso"
              name="weight"
              value={data.weight}
              onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                setData((current) => ({
                  ...current,
                  weight: target.value,
                }));
                onChange(target.value);
              }}
              onBlur={onBlur}
              type="text"
              error={errors.weight?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="file"
          render={({ field: { onChange } }) => (
            <InputFile
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                handleImageChange(e);
                onChange(e.target.files?.[0]);
              }}
              error={errors.file?.message}
              selected={image.image}
            />
          )}
        />

        <Button disabled={loading} onClick={handleSubmit(handlePost)}>
          {loading ? "Postando.." : "Postar"}
        </Button>
      </form>
      <div>
        {image.preview && (
          <div
            className="image_preview"
            style={{ backgroundImage: `url('${image.preview}')` }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default PhotoPost;
