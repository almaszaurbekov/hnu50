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
import { Divider } from '../../atoms/Divider';

const Register: FC<Props> = ({ language, accessToken }: Props) => {
  const router = useRouter();
  const theme = useTheme();

  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();

  if (accessToken?.length) {
    router.push('/');
  }

  const handleSubmit = () => {
    if (!name || name.length < 2) {
      notifyError('Введите правильное имя');
      return null;
    }
    if (!lastName || lastName.length < 2) {
      notifyError('Введите правильную фамилию');
      return null;
    }
    if (!validator.isEmail(email)) {
      notifyError('Неправильная электронная почта');
      return null;
    }
    if (!validator.isStrongPassword(password)) {
      notifyError('Пароль недостаточно сильный');
      return null;
    }
    if (password != confirmPassword) {
      notifyError('Пароли не совпадают');
      return null;
    }
    controller.post(`/user/register?name=${name}&last_name=${lastName}&email=${email}&password=${password}&password_confirmation=${confirmPassword}`)
      .then(res => {
        if (res.data.token) {
          localStorage.setItem('access_token', res.data.token);
          location.reload();
        }
      })
      .catch((err) => {
        const errorData = err.response;
        switch (errorData.data.error) {
          case 'validation error':
            notifyError('Заполните все поля');
            break;
          case 'already exists':
            notifyError('Пользователь с данной почтой уже зарегистрирован');
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
        <title>Регистрация</title>
      </Head>
      <Heading
        as="h1"
        css={{
          textAlign: 'center',
          fontSize: 22,
          marginBottom: 20
        }}
      >Регистрация</Heading>

      <Input
        type="text"
        label="Ваше имя"
        placeholder="Введите ваше имя"
        onChange={(event) => setName(event.currentTarget.value)}
      />
      <Input
        type="text"
        label="Ваша фамилия"
        placeholder="Введите вашу фамилию"
        onChange={(event) => setLastName(event.currentTarget.value)}
      />
      <Input
        type="text"
        label="Электронная почта"
        placeholder="Введите электронную почту"
        onChange={(event) => setEmail(event.currentTarget.value)}
      />
      <Divider
        css={{
          margin: "20px auto",
          marginTop: 30,
          color: theme.greyText,
        }}
      />
      <Input
        type="password"
        label="Пароль"
        placeholder="Введите пароль"
        onChange={(event) => setPassword(event.currentTarget.value)}
      />
      <Input
        type="password"
        label="Подтверждение пароля"
        placeholder="Подтвердите пароль"
        onChange={(event) => setConfirmPassword(event.currentTarget.value)}
      />

      <Button
        css={{
          display: "block",
          width: "100%",
          padding: "10px 45px",
          marginRight: 25,
          fontSize: 14,
          textTransform: "capitalize",
          marginTop: 15,
        }}
        onClick={handleSubmit}
      >Зарегистрироваться</Button>
      <div css={{ textAlign: "center" }}>
        <AnchorButton
          css={{
            textAlign: 'center',
            fontSize: 12,
            marginTop: 15,
            color: theme.greyText,
          }}
          onClick={() => router.push(`/login`)}
        >
          Уже зарегистрированы?
        </AnchorButton>
      </div>


    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const language = ctx.locale || ctx.defaultLocale;
  return {props: {language: locales[language]}};
};

export default Register;
