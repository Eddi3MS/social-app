import React, { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Head, Input } from "../../../../components";
import { userService } from "../../../../services/userService/userService";
import "./LostAccount.scss";

const LostAccount = () => {
  const [userData, setUserData] = useState("");
  const [response, setResponse] = useState({
    success: "",
    error: "",
  });

  const [submited, setSubmited] = useState(false);
  const [loading, setLoading] = useState(false);

  let isInvalid = !userData && submited;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmited(true);

    if (isInvalid) {
      return;
    }
    setLoading(true);
    try {
      const { data } = await userService.passwordLost({
        login: userData,
        url: window.location.href.replace("lost-account", "reset"),
      });

      setResponse({ success: data, error: "" });
    } catch (error: any) {
      setResponse({ success: "", error: error.response.data.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (response.error) {
      setResponse({ success: "", error: "" });
    }
  }, [userData]);

  return (
    <section className="animeLeft">
      <Head
        title="Perdeu a Senha"
        description="Social App - Lost Account Page"
      />

      <h1 className="title">Perdeu a senha?</h1>
      {response.success ? (
        <p style={{ color: "#4c1" }}>{response.success}</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="lost_account-form">
            <Input
              label="Email / Usuário"
              type="text"
              name="login"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserData(e.target.value)
              }
              error={
                isInvalid
                  ? "Campo Obrigatório."
                  : response.error && response.error
              }
            />

            <Button disabled={loading}>
              {!loading ? "Enviar Email" : "Enviando..."}
            </Button>
          </form>
          <Link className="back_to_login" to="/login">
            Voltar
          </Link>
        </>
      )}
    </section>
  );
};

export default LostAccount;
