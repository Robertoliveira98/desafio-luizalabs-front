import { Label, TextInput, Button } from "flowbite-react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { useState } from "react";
import jwt from "jsonwebtoken";
import Card from "@/components/Card";

const NovaSenha = (props) => {
  let [nome, setNome] = useState(props.nome ? props.nome.split(" ")[0] : "");
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
              />
            </div>
            <Button size="lg"
              gradientMonochrome="info"
              pill={true}
              type="submit"
            >Atualizar senha</Button>
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
  if (tokenData) {
    nomeUsuario = tokenData.nome;
  }
  return { props: { nome: nomeUsuario } };
}