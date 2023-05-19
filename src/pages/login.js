import { Label, TextInput, Checkbox, Button, Card } from "flowbite-react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import React, { useState } from "react";

const Login = (props) => {
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
          <form className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="E-mail" />
              </div>
              <TextInput
                id="email1"
                type="email"
                placeholder="name@gmail.com"
                required={true}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Senha" />
              </div>
              <TextInput id="password1" type="password" required={true} />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember">Lembre-me</Label>
            </div>
            <Button type="submit">Enviar</Button>
          </form>
          <Button type="button" outline={true} color="failure">
            Recuperar senha
          </Button>
        </Card>
      </main>
    </>
  );
};

export default Login;
