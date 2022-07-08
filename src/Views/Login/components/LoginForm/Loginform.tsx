import React, { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "../../../../components";
import { userService } from "../../../../services/userService/userService";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { login } from "../../../../store/user/thunks";
import { ErrorHandling } from "../../../../errors/errorHandling/ErrorHandling";

const formSchema = yup.object().shape({
  username: yup.string().required("Campo obrigatório."),
  password: yup.string().required("Campo obrigatório."),
});

const Loginform = () => {
  const [username, setUsername] = useState("");
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
    mode: "all",
    resolver: yupResolver(formSchema),
  });

  const handleLogin = async () => {
    let params = JSON.stringify({
      username,
      password,
    });
    try {
      await userService.loginUser(params);

      dispatch(login());
    } catch (error) {
      setError("password", {
        message: "Erro no Login! Verifique seus dados e tente novamente.",
      });
    }
  };

  useEffect(() => {
    if (userReducer.user) {
      navigate("/account");
    }
  }, [userReducer.user]);

  useEffect(() => {
    if (userReducer.error) {
      setError("username", {
        message: userReducer.error.message,
      });

      setError("password", {
        message: userReducer.error.message,
      });
    }
  }, [userReducer.error]);

  return (
    <section>
      <h1>Login</h1>
      <form>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur } }) => (
            <Input
              label="Usuário"
              name="username"
              value={username}
              onChange={({ target }: any) => {
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
              onChange={({ target }: any) => {
                setPassword(target.value);
                onChange(target.value);
              }}
              onBlur={onBlur}
              type="password"
              error={errors.password?.message}
            />
          )}
        />
        {userReducer.loading ? (
          <Button disabled key={1}>
            Carregando...
          </Button>
        ) : (
          <Button onClick={handleSubmit(handleLogin)} key={2}>
            Entrar
          </Button>
        )}
      </form>
      <Link to="/login/register">Register</Link>
      <Link to="/login/lost-account">Perdeu a senha?</Link>
    </section>
  );
};

export default Loginform;
