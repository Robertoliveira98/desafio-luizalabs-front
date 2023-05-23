import { Label, TextInput, Checkbox, Button, Alert, Spinner } from "flowbite-react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { useState } from "react";
import Card from "@/components/Card";
import { useRouter } from "next/router";
import apiClient from "services/api";
import { validaEmail } from "services/utils";

const Recuperar = (props) => {
  let [email, setEmail] = useState();
  let [mensagemAlerta, setMensagemAlerta] = useState("Ocorreu um erro!");
  let [alerta, setAlerta] = useState(false);
  let [carregando, setCarregando] = useState(false);
  let [tipoAlerta, setTipoAlerta] = useState("failure");
  let [enviado, setEnviado] = useState(false);
  let router = useRouter();

  const restaurarSenha = (event) => {
    if (email && validaEmail(email)) {
      setCarregando(true);
      apiClient
        .post(`/usuario/recuperar`, { email })
        .then((response) => {
          setCarregando(false);
          setMensagemAlerta("Sucesso!! Verifique seu e-mail para redefinir sua senha.");
          setAlerta(true);
          setTipoAlerta("success");
          setEnviado(true);
        })
        .catch((error) => {
          setCarregando(false);
          setMensagemAlerta(error.response.data.mensagem ? error.response.data.mensagem : "Ocorreu um erro");
          setAlerta(true);
          setTipoAlerta("failure");
        });
    } else {
      setMensagemAlerta("Preencha o campo de e-mail corretamente para continuar.");
      setAlerta(true);
      setTipoAlerta("warning");
    }

    event.preventDefault();
  };

  const seguirLogin = (event) => {
    router.push("/login/");
  };


  return (
    <>
      <Head>
        <title>Recuperar senha</title>
        <meta name="description" content="Login" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Card className="container mx-auto">
          <h5 className="text-2xl font-bold tracking-tight text-gray-700 dark:text-white">
            Recuperação de senha
          </h5>
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="E-mail" />
              </div>
              <TextInput
                id="email1"
                type="email"
                placeholder="desafio@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
            </div>
            {alerta ? (
              <Alert className="mt-2" color={tipoAlerta}>
                <span>
                  <span className="font-medium">{mensagemAlerta}</span>
                </span>
              </Alert>
            ) : undefined}
            {!enviado ? <Button
              className="mt-1"
              size="lg"
              gradientMonochrome="info"
              pill={true}
              onClick={(e) => restaurarSenha(e)}
              disabled={carregando}
              type="submit"
            >
              {carregando ? (
                <div className="pr-3">
                  <Spinner />
                </div>
              ) : undefined}
              Enviar
            </Button>
              : <Button
                className="mt-1"
                size="lg"
                gradientMonochrome="info"
                pill={true}
                onClick={(e) => seguirLogin(e)}
                disabled={carregando}
              >
                {carregando ? (
                  <div className="pr-3">
                    <Spinner />
                  </div>
                ) : undefined}
              Seguir para o login
            </Button>}
          </form>
        </Card>
      </main>
    </>
  );
};

export default Recuperar;
