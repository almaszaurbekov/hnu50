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
import { Card } from '../../molecules/Card';
import { Paragraph } from '../../atoms/Paragraph';

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
    <Container className="pt-5">
      <Head>
        <title>Регистрация</title>
      </Head>
      <Card
        className="p-5 animate__animated animate__fadeInDown"
        css={{
          boxShadow: theme.blockShadowWide
        }}
      >
        <Card
          className="p-5 animate__animated animate__fadeInDown"
          css={{
            background: "#fff",
            boxShadow: theme.blockShadowWide
          }}
        >
          <Heading
            as="h1"
            css={{
              textAlign: 'center',
              fontSize: 22,
              fontWeight: 800,
              color: theme.accentBlue,
              marginBottom: 5
            }}
          >Join us</Heading>
          <Paragraph css={{
            color: theme.accentBlue,
            fontSize: 13,
            maxWidth: 200,
            textAlign: "center",
            margin: "auto",
            marginBottom: 20,

          }}>Join us and find your ninja path</Paragraph>
          <div className="d-flex align-items-center">
            <Input
              labelClassName="col px-0 pr-2"
              type="text"
              label="Your name"
              placeholder="Enter your name"
              onChange={(event) => setName(event.currentTarget.value)}
            />
            <Input
              labelClassName="col px-0 pl-2"
              type="text"
              label="Your last name"
              placeholder="Enter your last name"
              onChange={(event) => setLastName(event.currentTarget.value)}
            />
          </div>
          <Input
            type="text"
            label="Email"
            placeholder="Enter your email"
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
          <Divider
            css={{
              margin: "20px auto",
              marginTop: 30,
              color: theme.greyText,
            }}
          />
          <div className="d-flex align-items-center">
            <Input
              labelClassName="col px-0 pr-2"
              type="password"
              label="Password"
              placeholder="Enter your password"
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
            <Input
              labelClassName="col px-0 pl-2"
              type="password"
              label="Password confirmation"
              placeholder="Repeat your password"
              onChange={(event) => setConfirmPassword(event.currentTarget.value)}
            />

          </div>
        </Card>


        <div className="mt-4 animate__animated animate__fadeInRight" css={{ maxWidth: 200, margin: "auto" }}>
          <Button
            css={{
              padding: "10px 45px",
              marginRight: 25,
              display: "block",
              width: "100%",
              fontSize: 14,
              textTransform: "capitalize",
            }}
            onClick={handleSubmit}
          >Register</Button>
          <div css={{ textAlign: "center" }}>
            <AnchorButton
              css={{
                position: "relative",
                display: "block",
                textAlign: 'center',
                width: "100%",
                fontSize: 12,
                margin: "15px 0",
                fontWeight: 500,
                color: "#fff",
                "&:hover": {
                  color: "rgba(255,255,255,.8)"
                },
                "&::after": {
                  content: '""',
                  display: "block",
                  width: "100%",
                  height: 2,
                  background: theme.accentBlueHover,
                  position: "absolute",
                  top: "50%",
                  left: 0,
                  zIndex: 1
                }
              }}
              onClick={() => router.push(`/login`)}
            >
              <span css={{ display: "inline-block", background: theme.darkBg, padding: "0px 5px", position: "relative", zIndex: 5 }}>Already have an account?</span>
            </AnchorButton>
          </div>
          <Button
            css={{
              padding: "10px 45px",
              marginRight: 25,
              display: "block",
              width: "100%",
              fontSize: 14,
              background: "#fff",
              color: theme.accentBlue,
              textTransform: "capitalize",
              "&:hover": {
                background: "rgba(255,255,255,.7)"
              }
            }}
            onClick={() => router.push(`/login`)}
          >Login</Button>
        </div>
      </Card>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const language = ctx.locale || ctx.defaultLocale;
  return {props: {language: locales[language]}};
};

export default Register;
