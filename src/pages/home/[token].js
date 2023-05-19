import { Label, TextInput, Checkbox, Button, Card } from "flowbite-react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { useState } from "react";

const HomePage = (props) => {
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
            Olá, [NOME]
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Seja bem vindo!
          </p>
        </Card>
      </main>
    </>
  );
};

export default HomePage;
