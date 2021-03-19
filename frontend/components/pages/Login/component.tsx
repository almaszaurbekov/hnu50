import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { Props } from './props';
import React, { FC, useState } from 'react';
import locales from '../../../core/locales';
import { useRouter } from 'next/router';
import { Container } from '../../atoms/Container';
import { Heading } from '../../atoms/Heading';
import { Button } from '../../atoms/Button';
import validator from 'validator';
import { controller, notifyError } from '../../../core';
import { AnchorButton } from '../../atoms/AnchorButton';
import { Input } from '../../atoms/Input';
import { useTheme } from '@emotion/react';

const Login: FC<Props> = ({language, accessToken}: Props) => {
  const router = useRouter();
  const theme = useTheme();

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  if (accessToken?.length) {
    router.push('/');
  }

  const handleSubmit = () => {
    if (!validator.isEmail(email)) {
      notifyError('Неправильная электронная почта');
      return null;
    }
    controller.post(`/user/auth?email=${email}&password=${password}`)
      .then(res => {
        if (res.data.token) {
          localStorage.setItem('access_token', res.data.token);
          location.reload();
        }
      })
      .catch((err) => {
        const errorData = err.response;
        switch (errorData.data.error) {
          case 'wrong_input':
            notifyError('Заполните все поля');
            break;
          case 'wrong_credentials':
            notifyError('Неправильная почта или пароль');
            break;
          default:
            notifyError('Ошибка сервера. Попробуйте позже');
            break;
        }
      });
  };


  return (
    <Container
      isForm
      css={{
        paddingTop: 100
      }}
    >
      <Head>
        <title>Вход</title>
      </Head>
      <Heading
        as="h1"
        css={{
          textAlign: 'center',
          fontSize: 22,
          marginBottom: 20
        }}
      >Вход</Heading>

      <Input
        type="text"
        label="Электронная почта"
        placeholder="Введите электронную почту"
        onChange={(event) => setEmail(event.currentTarget.value)}
      />
      <Input
        type="password"
        label="Пароль"
        placeholder="Введите пароль"
        onChange={(event) => setPassword(event.currentTarget.value)}
      />

      <div className="d-flex align-items-center mt-3">
        <Button
          css={{
            padding: "10px 45px",
            marginRight: 25,
            display: "inline-block",
            width: "auto",
            fontSize: 14,
            textTransform: "capitalize",
          }}
          onClick={handleSubmit}
        >Войти</Button>
        <div css={{ textAlign: "center" }}>
          <AnchorButton
            css={{
              textAlign: 'center',
              fontSize: 12,
              color: theme.greyText,
            }}
            onClick={() => router.push(`/register`)}
          >
            Еще нет акаунта?
          </AnchorButton>
        </div>
      </div>


    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const language = ctx.locale || ctx.defaultLocale;
  return {props: {language: locales[language]}};
};

export default Login;
