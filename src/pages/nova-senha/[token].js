import { Label, TextInput, Checkbox, Button, Card } from "flowbite-react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { useState } from "react";

const NovaSenha = (props) => {
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
            <Button type="submit">Atualizar senha</Button>
          </form>
        </Card>
      </main>
    </>
  );
};

export default NovaSenha;
