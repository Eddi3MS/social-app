import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Head, Input } from "../../../../components";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userService } from "../../../../services/userService/userService";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { login } from "../../../../store/user/thunks";

const formSchema = yup.object().shape({
  username: yup.string().required("Campo obrigatório."),
  email: yup
    .string()
    .required("Campo obrigatório.")
    .email("Insira um e-mail válido"),
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

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(formSchema),
  });

  const dispatch = useAppDispatch();

  const registerAccount = async () => {
    setLoading(true);
    const form = new FormData();
    form.append("username", username);
    form.append("email", email);
    form.append("password", password);

    try {
      await userService.createUser(form);

      dispatch(
        login({
          params: JSON.stringify({
            username,
            password,
          }),
          skipVal: true,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="animeLeft">
      <Head title="Registrar" description="Social App - Register Page" />

      <h1 className="title">Cadastre-se</h1>
      <form>
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
          name="email"
          render={({ field: { onChange, onBlur } }) => (
            <Input
              label="E-mail"
              name="email"
              value={email}
              onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
                setEmail(target.value);
                onChange(target.value);
              }}
              onBlur={onBlur}
              type="email"
              error={errors.email?.message}
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
        <Button disabled={loading} onClick={handleSubmit(registerAccount)}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </form>

      <Link className="login_page_lost-account" to="/login">
        Voltar
      </Link>
    </section>
  );
};

export default RegisterForm;
