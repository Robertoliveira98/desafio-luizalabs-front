import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { useState } from "react";
import Card from "@/components/Card";
import jwt from "jsonwebtoken";
import { Button } from "flowbite-react";
import Divider from "@/components/Divider";

const HomePage = (props) => {
    let [nome, setNome] = useState(props.nome ? props.nome : "");
    const logout = (event) => {
    };
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Home" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Card className="container mx-auto">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Olá, {nome}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Seja bem vindo!
          </p>
          <Divider/>
          <Button
            gradientMonochrome="failure"
            type="button"
            pill={true} 
            onClick={(e) => logout(e)}
            >
            Sair
          </Button>
        </Card>
      </main>
    </>
  );
};

export default HomePage;

export async function getServerSideProps(context) {
  const { token } = context.query;
  const tokenData = jwt.decode(token);
  let nomeUsuario = "";
  if (tokenData) {
    nomeUsuario = tokenData.nome;
  }
  return { props: { nome: nomeUsuario } };
}