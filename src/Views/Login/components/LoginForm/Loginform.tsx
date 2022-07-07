import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "../../../../components";
import { userService } from "../../../../services/userService/userService";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const formSchema = yup.object().shape({
  username: yup.string().required("Campo obrigatório."),
  password: yup.string().required("Campo obrigatório."),
});

const Loginform = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
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
      const response = await userService.loginUser(params);

      const res = await userService.getUser();

      console.log(response);
      console.log("user", res);
    } catch (error) {}
  };

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

        <Button onClick={handleSubmit(handleLogin)}>Entrar</Button>
      </form>
      <Link to="/login/register">Register</Link>
      <Link to="/login/lost-account">Perdeu a senha?</Link>
    </section>
  );
};

export default Loginform;
