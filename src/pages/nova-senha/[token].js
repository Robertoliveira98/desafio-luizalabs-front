import { Label, TextInput, Button, Spinner, Alert } from "flowbite-react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { useState } from "react";
import jwt from "jsonwebtoken";
import Card from "@/components/Card";
import apiClient from "services/api";
import { validaSenha } from "services/utils";
import { useRouter } from "next/router"; 

const NovaSenha = (props) => {
  let [nome, setNome] = useState(props.nome ? props.nome.split(" ")[0] : "");
  let [email, setEmail] = useState(props.email ? props.email : "");
  let [senha, setSenha] = useState();
  let [confirmaSenha, setConfirmaSenha] = useState();
  let [mensagemAlerta, setMensagemAlerta] = useState("Ocorreu um erro!");
  let [alerta, setAlerta] = useState(false);
  let [carregando, setCarregando] = useState(false);
  let [tipoAlerta, setTipoAlerta] = useState("failure");
  let [sucesso, setSucesso] = useState(false);
  let router = useRouter();

  const updateSenha = (event) => {
    if (senha && senha == confirmaSenha && validaSenha(senha)) {
      setCarregando(true);
      apiClient
        .put(`/usuario/alterarSenha`, { email, senha })
        .then((response) => {
          setCarregando(false);
          setMensagemAlerta("Senha atualizada com sucesso.");
          setAlerta(true);
          setTipoAlerta("success");
          setSucesso(true);
        })
        .catch((error) => {
          debugger;
          setCarregando(false);
          setMensagemAlerta(error.response.data.mensagem ? error.response.data.mensagem : "Ocorreu um erro");
          setAlerta(true);
          setTipoAlerta("failure");
        });
    } else {
      let mensagem = "Senha inválida";
      if (!validaSenha(senha)) {
        mensagem = "Senha inválida";
      } else if (senha != confirmaSenha) {
        mensagem = "As senhas não correspondem";
      }
      setMensagemAlerta(mensagem);
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
        <title>Nova senha</title>
        <meta name="description" content="Nova senha" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Card className="container mx-auto">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Atualize sua senha, {nome}
          </h5>
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password2" value="Senha" />
              </div>
              <TextInput
                id="password2"
                type="password"
                required={true}
                shadow={true}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="repeat-password" value="Confirmar senha" />
              </div>
              <TextInput
                id="repeat-password"
                type="password"
                required={true}
                shadow={true}
                onChange={(e) => setConfirmaSenha(e.target.value)}
              />
            </div>
            {alerta ? (
              <Alert className="mt-2" color={tipoAlerta}>
                <span>
                  <span className="font-medium">{mensagemAlerta}</span>
                </span>
              </Alert>
            ) : undefined}
            {!sucesso ? <Button size="lg"
              gradientMonochrome="info"
              pill={true}
              type="submit"
              onClick={(e) => updateSenha(e)}
              disabled={carregando}
            >
              {carregando ? <div className="pr-3"><Spinner /></div> : null}
              Atualizar senha</Button>
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

export default NovaSenha;

export async function getServerSideProps(context) {
  const { token } = context.query;
  const tokenData = jwt.decode(token);
  let nomeUsuario = "";
  let emailUsuario = "";
  if (tokenData) {
    nomeUsuario = tokenData.nome;
    emailUsuario = tokenData.email;
  }
  return { props: { nome: nomeUsuario, email: emailUsuario } };
}