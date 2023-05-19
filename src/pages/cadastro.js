import { Label, TextInput, Checkbox, Button, Card, Alert } from "flowbite-react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { useState } from "react";

const Cadastro = (props) => {
  return (
    <>
      <Head>
        <title>Cadastrar</title>
        <meta name="description" content="Realizar Cadastro" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Card className="container mx-auto">
          <Alert color="failure" withBorderAccent={true}> 
            <span>
              <span className="font-medium">Atenção! </span> 
              E-mail já cadastrado.
            </span>
          </Alert>
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Nome" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Seu nome"
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
            <Button type="submit">Cadastrar conta</Button>
          </form>
        </Card>
      </main>
    </>
  );
};

export default Cadastro;
