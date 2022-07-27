import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, Head, Input } from "../../../../components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userService } from "../../../../services/userService/userService";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { useNavigate } from "react-router-dom";
import { login } from "../../../../store/user/thunks";

const formSchema = yup.object().shape({
  password: yup
    .string()
    .required("Insira uma senha válida")
    .min(8, "Sua senha deve conter mais de 8 caracteres.")
    .max(16, "Sua senha deve conter menos de 16 caracteres.")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])/,
      "Sua senha deve ter ao menos uma letra e um número."
    ),
});

const ResetPassword = () => {
  const [user, setUser] = useState("");
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const userReducer = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get("key");
    const login = params.get("login");
    if (key) setKey(key);
    if (login) setUser(login);
  }, []);

  const handlePasswordReset = async () => {
    setLoading(true);
    try {
      await userService.passwordReset({
        login: user,
        key,
        password,
      });

      let params = JSON.stringify({
        username: user,
        password,
      });

      dispatch(login({ params, skipVal: true }));
    } catch (error: any) {
      setError("password", {
        type: "custom",
        message: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userReducer.user) {
      navigate("/account");
    }
  }, [userReducer]);
  return (
    <section className="animeLeft">
      <Head title="Resetar" description="Social App - Reset Page" />

      <h1 className="title">Resete a Senha</h1>
      <form
        onSubmit={handleSubmit(handlePasswordReset)}
        className="lost_account-form"
      >
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange } }) => (
            <Input
              label="Nova Senha"
              name="password"
              value={password}
              onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                setPassword(target.value);
                onChange(target.value);
              }}
              type="password"
              error={errors.password?.message}
            />
          )}
        />

        <Button disabled={loading}>
          {!loading ? "Resetar Senha" : "Resetando..."}
        </Button>
      </form>
    </section>
  );
};

export default ResetPassword;
