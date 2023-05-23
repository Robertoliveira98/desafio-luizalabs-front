import { Label, TextInput, Checkbox, Button, Alert, Spinner } from "flowbite-react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { useState } from "react";
import Card from "@/components/Card";
import { useRouter } from "next/router";
import apiClient from "services/api";
import Divider from "@/components/Divider";
import { validaEmail, validaSenha } from "services/utils";

const Login = (props) => {
  let [email, setEmail] = useState();
  let [senha, setSenha] = useState();
  let [mensagemAlerta, setMensagemAlerta] = useState("Ocorreu um erro!");
  let [alerta, setAlerta] = useState(false);
  let [carregando, setCarregando] = useState(false);
  let [tipoAlerta, setTipoAlerta] = useState("failure");
  let router = useRouter(); 

  const login = (event) => {
    setCarregando(true);
    if (!(validaEmail(email) && validaSenha(senha))) {

      setMensagemAlerta(validaEmail(email) ? "Senha inválida" : "E-mail inválido");
      setAlerta(true);
      setTipoAlerta("failure");
      setCarregando(false);

    } else {

      apiClient
        .post(`/usuario/login`, { senha, email })
        .then((response) => {
          setCarregando(false);
          // localStorage.setItem("token", response.data.token)
          router.push("/home/" + response.data.token);
        })
        .catch((error) => {
          setCarregando(false);
          setMensagemAlerta(error.response.data.mensagem ? error.response.data.mensagem : "Ocorreu um erro");
          setAlerta(true);
          setTipoAlerta("failure");
        });
        
    }

    event.preventDefault();
  };

  const criarConta = (event) => {
    router.push("/cadastro/");
  };

  const restaurarSenha = (event) => {
    if (email) {
      setCarregando(true);
      apiClient
        .post(`/usuario/recuperar`, { email })
        .then((response) => {
          setCarregando(false);
          setMensagemAlerta("Sucesso!! Verifique seu e-mail para redefinir sua senha.");
          setAlerta(true);
          setTipoAlerta("success");
        })
        .catch((error) => {
          setCarregando(false);
          setMensagemAlerta(error.response.data.mensagem ? error.response.data.mensagem : "Ocorreu um erro");
          setAlerta(true);
          setTipoAlerta("failure");
        });
    } else {
      setMensagemAlerta("Preencha o campo de e-mail para continuar.");
      setAlerta(true);
      setTipoAlerta("warning");
    }
  };


  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Card className="container mx-auto">
          <h5 className="text-2xl font-bold tracking-tight text-gray-700 dark:text-white">
            Acessar conta
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
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Senha" />
              </div>
              <TextInput
                id="password1"
                type="password"
                required={true}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Lembre-me</Label>
            </div>
            {alerta ? (
              <Alert className="mt-2" color={tipoAlerta}>
                <span>
                  <span className="font-medium">{mensagemAlerta}</span>
                </span>
              </Alert>
            ) : undefined}
            <Button
              className="mt-1"
              size="lg"
              gradientMonochrome="info"
              pill={true}
              onClick={(e) => login(e)}
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
          </form>
          <Divider />
          <div className="grid gap-2 grid-cols-2 justify-items-center">
            <div>
              <Button
                gradientMonochrome="failure"
                type="button"
                outline={true}
                pill={true}
                disabled={carregando}
                onClick={(e) => restaurarSenha(e)}
              >
                Esqueceu a senha?
              </Button>
            </div>
            <div>
              <Button
                gradientMonochrome="cyan"
                type="button"
                outline={true}
                pill={true}
                disabled={carregando}
                onClick={(e) => criarConta(e)}
              >
                Criar nova conta
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </>
  );
};

export default Login;
