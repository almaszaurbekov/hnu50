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
import { Card } from '../../molecules/Card';
import { Paragraph } from '../../atoms/Paragraph';

const Login: FC<Props> = ({language, accessToken}: Props) => {
  const router = useRouter();
  const theme = useTheme();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

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
    <Container className="pt-5">
      <Head>
        <title>Login</title>
      </Head>
      <Card
        className="p-5 d-flex align-items-center animate__animated animate__fadeInDown"
        disableBorder
        css={{
          background: "#fff",
          boxShadow: theme.blockShadowWide
        }}
      >
        <div css={{ textAlign: "center", flex: 1, padding: "0 50px" }}>
          <img className="w-100 animate__animated animate__fadeInLeft" src="/illustration-login.png" alt=""/>
        </div>
        <Card className="animate__animated animate__fadeInDown" css={{ flex: "0 0 50%", height: "100%", padding: 50 }}>
          <Card className="p-4 animate__animated animate__fadeInDown" css={{ background: "#fff",  boxShadow: theme.blockShadowWide }}>
            <Heading
              as="h1"
              css={{
                textAlign: 'center',
                fontSize: 22,
                fontWeight: 800,
                color: theme.accentBlue,
                marginBottom: 5
              }}
            >Keep connected</Heading>
            <Paragraph css={{
              color: theme.accentBlue,
              fontSize: 13,
              maxWidth: 200,
              textAlign: "center",
              margin: "auto",
              marginBottom: 20,

            }}>Login with your credential to access your account</Paragraph>

            <Input
              type="text"
              label="Email"
              placeholder="Enter your email"
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              onChange={(event) => setPassword(event.currentTarget.value)}
            />
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
            >Login</Button>
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
                    color: "rgba(255,255,255,.7)"
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
                onClick={() => router.push(`/register`)}
              >
                <span css={{ display: "inline-block", background: theme.darkBg, padding: "0px 5px", position: "relative", zIndex: 5 }}>Don't have an account?</span>
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
              onClick={() => router.push(`/register`)}
            >Register</Button>
          </div>
        </Card>

      </Card>



    </Container>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const language = ctx.locale || ctx.defaultLocale;
  return {props: {language: locales[language]}};
};

export default Login;
