import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { useState } from "react";
import apiClient from "../../services/api";
import { useRouter } from "next/router";
import Card from "@/components/Card";
import Divider from "@/components/Divider";

const Cadastro = (props) => {
  let [nome, setNome] = useState();
  let [senha, setSenha] = useState();
  let [confirmaSenha, setConfirmaSenha] = useState();
  let [email, setEmail] = useState();
  let [carregando, setCarregando] = useState(false);
  let [mensagemErro, setMensagemErro] = useState("Ocorreu um erro!");
  let [erro, setErro] = useState(false);
  let router = useRouter(); 

  const enviaCadastro = (event) => {
    setCarregando(true);

    apiClient
      .post(`/usuario/cadastro`, { nome, senha, email })
      .then((response) => {
        setCarregando(false);
        // sessionStorage.setItem("token", response.data.token)
        debugger;
        router.push("/home/" + response.data.token);
      })
      .catch((error) => {
        setErro(true);
        setCarregando(false);
        setMensagemErro(error.response.data.mensagem ? error.response.data.mensagem : "Ocorreu um erro");
      });
    event.preventDefault();
  };


  return (
    <>
      <Head>
        <title>Cadastrar</title>
        <meta name="description" content="Realizar Cadastro" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-700 dark:text-white">
            Cadastre-se
          </h5>
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Nome" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required={true}
                shadow={true}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email2" value="E-mail" />
              </div>
              <TextInput
                id="email2"
                type="email"
                placeholder="name@gmail.com"
                required={true}
                shadow={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password2" value="Senha" />
              </div>
              <TextInput
                id="password2"
                type="password"
                required={true}
                shadow={true}
                value={senha}
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
                value={confirmaSenha}
                onChange={(e) => setConfirmaSenha(e.target.value)}
              />
            </div>
            {erro ? 
            <Alert className="mt-2" color="failure">
              <span>
                <span className="font-medium">{mensagemErro}</span>
              </span> 
            </Alert> : undefined
            }
            <Divider/>
            <Button
              size="lg" 
              gradientMonochrome="info" 
              pill={true} 
              onClick={(e) => enviaCadastro(e)} 
              type="submit"
              >
              {carregando ? <div className="pr-3"><Spinner/></div> : null}
              Cadastrar conta
            </Button>
          </form>
        </Card>
      </main>
    </>
  );
};

export default Cadastro;
