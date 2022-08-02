import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Head, Input } from "../../../../components";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { login } from "../../../../store/user/thunks";
import "./LoginForm.scss";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ErrorModalContext } from "../../../../context/ErrorFeedbackContext";

const formSchema = yup.object().shape({
  username: yup.string().required("Campo obrigatório."),
  password: yup.string().required("Campo obrigatório."),
});

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const { setErrorModal } = useContext(ErrorModalContext);

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

  const handleLogin = () => {
    let params = JSON.stringify({
      username,
      password,
    });

    dispatch(login({ params, skipVal: true }));
  };

  useEffect(() => {
    if (userReducer.user) {
      navigate("/account");
    }
  }, [userReducer.user]);

  useEffect(() => {
    if (userReducer.error) {
      setErrorModal(userReducer.error);
      setError("username", {
        message: "Login inválido.",
      });
      setError("password", {
        message: "Login inválido.",
      });
    }
  }, [userReducer.error]);

  return (
    <section className="animeLeft login_page">
      <Head title="Login" description="Social App - Login Page" />

      <h1 className="title">Login</h1>
      <form className="login_page_form">
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur } }) => (
            <Input
              label="Usuário"
              name="username"
              value={username}
              onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                setUsername(target.value);
                onChange(target.value);
              }}
              onBlur={onBlur}
              type="text"
              error={errors.username?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur } }) => (
            <Input
              label="Senha"
              name="password"
              value={password}
              onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                setPassword(target.value);
                onChange(target.value);
              }}
              onBlur={onBlur}
              type="password"
              error={errors.password?.message}
            />
          )}
        />

        <Button
          onClick={handleSubmit(handleLogin)}
          disabled={userReducer.loading}
        >
          {userReducer.loading ? " Carregando..." : "Entrar"}
        </Button>
      </form>
      <Link className="login_page_lost-account" to="/login/lost-account">
        Perdeu a Senha?
      </Link>
      <div className="login_page_register">
        <h2 className="login_page_register_subtitle">Cadastre-se</h2>
        <p>Ainda não possui senha? Cadastre-se agora!!</p>

        <Button
          onClick={() => navigate("/login/register")}
          aria-label="link to register page"
        >
          Cadastro
        </Button>
      </div>
    </section>
  );
};

export default LoginForm;
