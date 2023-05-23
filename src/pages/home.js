import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { useState, useEffect } from "react";
import Card from "@/components/Card";
import jwt from "jsonwebtoken";
import { Button } from "flowbite-react";
import Divider from "@/components/Divider";
import { useRouter } from "next/router";

const HomePage = (props) => {
  let router = useRouter();
  let [nome, setNome] = useState(props.nome ? props.nome : "");
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const tokenData = jwt.decode(token);
      let nomeUsuario = tokenData && tokenData.nome ? tokenData.nome : "";
      setNome(nomeUsuario);
    } else {
      router.push("/login/");
    }
  }, []);
  const logout = (event) => {
    localStorage.removeItem('token');
    router.push("/login/");
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
          <Divider />
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

// export async function getStaticProps(context) {
//   debugger;
//   const token = localStorage.getItem('token');
//   const tokenData = jwt.decode(token);
//   let nomeUsuario = "";
//   if (tokenData) {
//     nomeUsuario = tokenData.nome;
//   }
//   return { props: { nome: nomeUsuario } };
// }